// angular
import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as appSettingsModule from "application-settings";

// nativescript
import * as httpModule from "http";

// app
import { SearchFilterState } from "../sessions/shared/search.filter.model";
import { SessionModel } from "../sessions/shared/session.model";
import { ISession } from "../shared/interfaces";
import { SessionTypes, sessionDays } from "../shared/static-data";
import { FavoritesService } from "./favorites.service";
import * as fakeDataServiceModule from "./fake-data.service";
import { Data } from "../providers/data/data";

@Injectable()
export class SessionsService {

	public sessionsLoaded = false;
	public ignoreCache = false; //Todo: Only refresh cache if any changes are made, or refresh upon a certain timer
	public items: BehaviorSubject<Array<SessionModel>> = new BehaviorSubject([]);
	private _useHttpService: boolean = true;
	public _allSessions: Array<SessionModel> = [];
	private _searchFilterState: SearchFilterState;
	private _lastUpdatedSessionTimestamp: Date = new Date();
	
	private messageSource = new BehaviorSubject<boolean>(false);
	currentMessage = this.messageSource.asObservable();
	
	constructor(
		private _zone: NgZone,
		private _favoritesService: FavoritesService,
		private data: Data
	) { 
		this.loadCachedSessions();
	}
	
	// Check if the data on the service has updated. If not, load from the cache if possible.
	private loadCachedSessions() {
		this.checkLastUpdatedTimestamp<Date>()
			.then((timestamp: Date) => {
				var eventId = this.data.storage["eventId"];
				this._lastUpdatedSessionTimestamp = timestamp;

				let cachedTimestamp = null;
				let cachedTimestampStr = appSettingsModule.getString('LastUpdatedSessionTimestamp_' + eventId, '');
				if(cachedTimestampStr !== '')
				{
					// Can't seem to parse directly into Date from an empty string.
					cachedTimestamp = <Date>JSON.parse(cachedTimestampStr);
				}
				
				console.log("_lastUpdatedSessionTimestamp: " + this._lastUpdatedSessionTimestamp + " cachedTimestamp: " + cachedTimestamp);
				if(cachedTimestamp == null || this._lastUpdatedSessionTimestamp > cachedTimestamp) {
					console.log("Session data seems to have updated. Ignoring cache.");
					this.sessionsLoaded = false;
					
					// Note: don't save the timestamp to cache here as the app may crash before retrieving the data from the service.
					// Hence, we save the data once we've retrieved it from the service.
					return;
				}
				
				try {
					console.log("Reading sessions data from the cache..");
					console.log("Checking for cached session for EventId: " + eventId);
					let cahcedSessions = <Array<SessionModel>>JSON.parse(appSettingsModule.getString('SESSIONS_' + eventId, '[]'));
					if (cahcedSessions.length > 0 && !this.ignoreCache) {
						this._allSessions = cahcedSessions.map((s) => new SessionModel(s));
						console.log("Cached sessions found: " + this._allSessions.length);
						this.applyCachedFavorites();
						this.sessionsLoaded = true;
						this.updateSessionDays();
					}
				}
				catch (error) {
					console.log('Error while retrieveing sessions from the local cache: ' + error);
				}
			});
	}
	
	public changeMessage(message: boolean){
		this.messageSource.next(message);
		// console.log("updated messageSource :::", this.messageSource, this.currentMessage);
	}
	
	public loadSessions<T>(): Promise<T> {
		return new Promise((resolve, reject) => {
			if (this.sessionsLoaded && !this.ignoreCache) {
				Promise.resolve(this._allSessions);
			}
			else {
				if (this._useHttpService) {
				return this.loadSessionsViaHttp<Array<ISession>>()
					.then((newSessions: Array<ISession>) => {
						return this.updateSessions<Array<ISession>>(newSessions);
					});
				}
				else {
				return this.loadSessionsViaFaker<Array<ISession>>()
					.then((newSessions: Array<ISession>) => {
						return this.updateSessions<Array<ISession>>(newSessions);
					});
				}
			}
		});
	}
	
	private updateSessions<T>(newSessions: Array<ISession>): Promise<T>{
		return new Promise<T>((resolve, reject) => {
			this.updateCache(newSessions);
			this._allSessions = newSessions.map((s) => new SessionModel(s));
			this.applyCachedFavorites();
			this.sessionsLoaded = true;
			this.updateSessionDays();
			Promise.resolve(this._allSessions);
		});
	}
	
	public updateCache(sessions: Array<ISession>) {
		var sessionsJsonStr = JSON.stringify(sessions);
		var eventId = this.data.storage["eventId"];
		appSettingsModule.setString('SESSIONS_' + eventId, sessionsJsonStr);
		
		// Save the last updated timestamp to cache.
		var timestampStr = JSON.stringify(this._lastUpdatedSessionTimestamp);
		appSettingsModule.setString('LastUpdatedSessionTimestamp_' + eventId, timestampStr);
	}
	
	public applyCachedFavorites() {
		for (let fav of this._favoritesService.favourites) {
			var sessionObj = this._allSessions.find(x => x.sessionId == fav.sessionId);
			if(sessionObj != null) {
				sessionObj.favorite = true;
			}
		}
	};
	
	public updateSessionDays() {
		let uniqueDates = this._allSessions.map(item => item.startDt.getDate()).filter((value, index, self) => self.indexOf(value) === index);
		let month = this._allSessions[0].startDt.getMonth() + 1;	// The getMonth() method returns the month (from 0 to 11).
		let year = this._allSessions[0].startDt.getFullYear();
		
		// console.log("uniqueDates: " + uniqueDates + " month: " + month + " year: " + year);
		uniqueDates.forEach(element => {
			let newDate = new Date(year, month, element);
			sessionDays.push({
				isSelected: false, 
				title: element.toString(), 
				desc: "", 
				date: newDate
			});
		});
		
		sessionDays[0].isSelected = true;
		let searchFilterState: SearchFilterState = new SearchFilterState( sessionDays[0].date.getDate(), "", 1, "");
		this.update(searchFilterState);
	}
	
	public getSessionById(sessionId: number) {
		return new Promise((resolve, reject) => {
			let filtered = this._allSessions.filter((s) => s.sessionId == sessionId);
			if (filtered.length > 0) {
				resolve(filtered[0]);
			}
		
			reject("could not find session with id:" + sessionId);
		});
	}
	
	public update(searchFilterState: SearchFilterState) {
		this._searchFilterState = searchFilterState;
		this.publishUpdates();
	}
	
	public toggleFavorite(session: SessionModel) {
		session.toggleFavorite();
		if (session.favorite) {
			this._favoritesService.addToFavourites(session);
		}
		else {
			this._favoritesService.removeFromFavourites(session);
		}
		this.publishUpdates();
	
		return Promise.resolve(true);
	}
	
	private loadSessionsViaHttp<T>(): Promise<T> {
		var eventId = this.data.storage["eventId"];
		console.log("EVENT ID:::", eventId);
		const reqParams = {
		// url: "https://testusevents.dadabhagwan.org/webapi/api/events/" + eventId + "/sessions",
		url: "https://usevents.dadabhagwan.org/webapi/api/events/119/sessions",
		method: "GET"
		};
	
		return httpModule.getJSON<T>(reqParams);
	}
	
	private checkLastUpdatedTimestamp<T>(): Promise<T> {
		var eventId = this.data.storage["eventId"];
		const reqParams = {
			// url: "https://testusevents.dadabhagwan.org/webapi/api/events/" + eventId + "/lastupdatedtimestamp",
			url: "https://usevents.dadabhagwan.org/webapi/api/events/119/lastupdatedtimestamp",
			method: "GET"
		};

		return httpModule.getJSON<T>(reqParams);
	}
	
	private loadSessionsViaFaker<T>(): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			let speakers = fakeDataServiceModule.generateSpeakers();
			let roomInfos = fakeDataServiceModule.generateRoomInfos();
			let sessions = <any>fakeDataServiceModule.generateSessions(speakers, roomInfos);
			resolve(sessions);
		});
	}
	
	private publishUpdates() {
		let date = this._searchFilterState.date;
		let search = this._searchFilterState.search;
		let viewIndex = this._searchFilterState.viewIndex;
		
		let filteredSessions = this._allSessions.filter((s) => {
			if (SessionTypes.indexOf(search.toUpperCase()) >= 0) {
				return s.startDt.getDate() === date
					&& s.eventSessionTypeName !== null
					&& s.eventSessionTypeName.toLowerCase().indexOf(search.toLowerCase()) >= 0;
			}
			else {
				return s.startDt.getDate() === date
					&& s.sessionTitle.toLowerCase().indexOf(search.toLowerCase()) >= 0;
			}
		});
	
		if (viewIndex === 0) {
			filteredSessions = filteredSessions.filter((i) => i.favorite || i.isBreak);
		}
		
		// Sort the dates by time
		filteredSessions.sort(function(a,b){
			return new Date(a.sessionStartTime).valueOf() - new Date(b.sessionStartTime).valueOf();
		});
		
		// Make sure all updates are published inside NgZone so that change detection is triggered if needed
		this._zone.run(() => {
			// must emit a *new* value (immutability!)
			this.items.next([...filteredSessions]);
		});
	}
}
