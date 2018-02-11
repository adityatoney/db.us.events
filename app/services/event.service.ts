// angular
import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject } from "rxjs/Rx";
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
	public ignoreCache = true;
	public items: BehaviorSubject<Array<EventModel>> = new BehaviorSubject([]);
	private _useHttpService: boolean = false;
	private _allEvents: Array<EventModel> = [];

	constructor(
		private _zone: NgZone,
	) { 
		try {
			let cahcedEvents = <Array<EventModel>>JSON.parse(appSettingsModule.getString('ALLSESSIONS', '[]'));
			if (cahcedEvents.length > 0 ) {
				this._allEvents = cahcedEvents.map((s) => new EventModel(s));
				this.eventsLoaded = true;
			}
		}
		catch (error) {
			console.log('Error while retrieveing events from the local cache: ' + error);
		}
	}
	
	public loadEvents<T>(): Promise<T> {
		console.log("inside load events");
		return new Promise((resolve, reject) => {
			if (this.eventsLoaded && !this.ignoreCache) {
				Promise.resolve(this._allEvents);
			}
			else {
				if (this._useHttpService) {
					return this.loadEventsViaHttp<Array<IEvent>>()
						.then((newEvents: Array<IEvent>) => {
								return this.updateEvents<Array<IEvent>>(newEvents);
						});
				}
				else {
					console.log("Loading event services!!");
					return this.loadEventsViaFaker<Array<IEvent>>()
						.then((newEvents: Array<IEvent>) => {
								return this.updateEvents<Array<IEvent>>(newEvents);
						});
				}
			}
		});
	}
	
	private updateEvents<T>(newEvents: Array<IEvent>): Promise<T>{
		console.log("Loading event services!!");
		return new Promise<T>((resolve, reject) => {
			this._allEvents = newEvents.map((s) => new EventModel(s));
			this.eventsLoaded = true;
			Promise.resolve(this._allEvents);
		});
	}
	private loadEventsViaHttp<T>(): Promise<T> {
		const reqParams = {
			url: "https://<your-service-url>/Events/v1/events",
			method: "GET",
			headers: { "API-VERSION": "1.0.0" }
		};

		return httpModule.getJSON<T>(reqParams);
	}
	
	private loadEventsViaFaker<T>(): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			let speakers = <any>fakeDataServiceModule.generateSchedule();
			let events = <any>fakeDataServiceModule.generateEvents(speakers);
			resolve(events);
		});
	}
}