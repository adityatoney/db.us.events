// angular
import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as appSettingsModule from "application-settings";

// nativescript
import * as httpModule from "http";

// app
import { IEvent } from "../shared/interfaces";
import { EventModel } from './../shared/event.model';
import { SessionTypes } from "../shared/static-data";
import { FavoritesService } from "./favorites.service";
import * as fakeDataServiceModule from "./fake-data.service";

@Injectable()
export class EventService {

	public eventsLoaded = false;
	public ignoreCache = false; //Todo: Only refresh cache if any changes are made, or refresh upon a certain timer
	public items: BehaviorSubject<Array<EventModel>> = new BehaviorSubject([]);
	private _useHttpService: boolean = true;
	public _allEvents: Array<EventModel> = [];
	private _lastUpdatedEventsTimestamp: Date = new Date();

	constructor(
		private _zone: NgZone
	) {
		this.loadCachedEvents();
	}
	
	// Check if the data on the service has updated. If not, load from the cache if possible.
	private loadCachedEvents() {
		this.checkLastUpdatedTimestamp<Date>()
			.then((timestamp: Date) => {
				this._lastUpdatedEventsTimestamp = timestamp;

				let cachedTimestamp = null;
				let cachedTimestampStr = appSettingsModule.getString('LastUpdatedEventsTimestamp', '');
				if(cachedTimestampStr !== '')
				{
					// Can't seem to parse directly into Date from an empty string.
					cachedTimestamp = <Date>JSON.parse(cachedTimestampStr);
				}
				
				console.log("_lastUpdatedEventsTimestamp: " + this._lastUpdatedEventsTimestamp + " cachedTimestamp: " + cachedTimestamp);
				if(cachedTimestamp == null || this._lastUpdatedEventsTimestamp > cachedTimestamp) {
					console.log("Event service data seems to have updated. Ignoring cache.");
					this.eventsLoaded = false;
					
					// Note: don't save the timestamp to cache here as the app may crash before retrieving the data from the service.
					// Hence, we save the data once we've retrieved it from the service.
					return;
				}
				
				try {
					console.log("Reading events data from the cache..");
					let cachedEvents = <Array<EventModel>>JSON.parse(appSettingsModule.getString('ALLEVENTS', '[]'));
					if (cachedEvents.length > 0 && !this.ignoreCache) {
						this._allEvents = cachedEvents.map((s) => new EventModel(s));
						console.log("Cached events found: " + this._allEvents.length);
						this.eventsLoaded = true;
						this.update();
					}
				}
				catch (error) {
					console.log('Error while retrieveing events from the local cache: ' + error);
				}
			});
	}
	
	public loadEvents<T>(): Promise<T> {
		//Todo: Fix ignoreCache = true, not sending back Promise.resolve
		return new Promise((resolve, reject) => {
			if (this.eventsLoaded && !this.ignoreCache) {
				Promise.resolve(this._allEvents);
			}
			else {
				if (this._useHttpService) {
					return this.loadEventsViaHttp<Array<IEvent>>()
						.then((newEvents: Array<IEvent>) => {
							console.log("Load Events from the service: " + JSON.stringify(newEvents));
							return this.updateEvents<Array<IEvent>>(newEvents);
						});
				}
				else {
					return this.loadEventsViaFaker<Array<IEvent>>()
						.then((newEvents: Array<IEvent>) => {
							return this.updateEvents<Array<IEvent>>(newEvents);
						});
				}
			}
		});
	}
	
	private updateEvents<T>(newEvents: Array<IEvent>): Promise<T>{
		return new Promise<T>((resolve, reject) => {
			this.updateCache(newEvents);
			this._allEvents = newEvents.map((s) => new EventModel(s));
			this.eventsLoaded = true;
			this.update();
			Promise.resolve(this._allEvents);
		});
	}
	
	private loadEventsViaHttp<T>(): Promise<T> {
		const reqParams = { 
			// url: "https://testusevents.dadabhagwan.org/webapi/api/events/list",
			url: "https://usevents.dadabhagwan.org/webapi/api/events/list",
			method: "GET"
		};

		return httpModule.getJSON<T>(reqParams);
	}
	
	private checkLastUpdatedTimestamp<T>(): Promise<T> {
		const reqParams = {
			// url: "https://testusevents.dadabhagwan.org/webapi/api/events/lastupdatedtimestamp",
			url: "http://usevents.dadabhagwan.org/webapi/api/events/119/lastupdatedtimestamp",
			method: "GET"
		};

		return httpModule.getJSON<T>(reqParams);
	}
	
	public updateCache(sessions: Array<IEvent>) {
		var sessionsJsonStr = JSON.stringify(sessions);
		appSettingsModule.setString('ALLEVENTS', sessionsJsonStr);
		
		// Save the last updated timestamp to cache.
		var timestampStr = JSON.stringify(this._lastUpdatedEventsTimestamp);
		appSettingsModule.setString('LastUpdatedEventsTimestamp', timestampStr);
	}
    
	private loadEventsViaFaker<T>(): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			let scheudle = fakeDataServiceModule.generateSchedule();
			let events = <any>fakeDataServiceModule.generateEvents(scheudle);
			resolve(events);
		});
	}
	
	//Not used 
	public update() {		
		// Make sure all updates are published inside NgZone so that change detection is triggered if needed
		this._zone.run(() => {
			// must emit a *new* value (immutability!)
			this.items.next([...this._allEvents]);
		});
	}
}