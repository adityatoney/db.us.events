// angular
import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject } from "rxjs/Rx";

// nativescript
import * as httpModule from "http";

// app
import { SearchFilterState } from "../sessions/shared/search.filter.model";
import { SessionModel } from "../sessions/shared/session.model";
import { ISession } from "../shared/interfaces";
import * as fakeDataServiceModule from "./fake-data.service";

@Injectable()
export class SessionsService {

    public sessionsLoaded = false;
    public items: BehaviorSubject<Array<SessionModel>> = new BehaviorSubject([]);
    private _useHttpService: boolean = false;
    private _allSessions: Array<SessionModel> = [];
    private _searchFilterState: SearchFilterState;

    constructor(private _zone: NgZone) { }

    public loadSessions<T>(): Promise<T> {
        return new Promise((resolve, reject) => {
            if (this.sessionsLoaded) {
                Promise.resolve(this._allSessions);
            }
            else {
                if (this._useHttpService) {
                    return this.loadSessionsViaHttp<Array<ISession>>()
                        .then((newSessions: Array<ISession>) => {
                            this._allSessions = newSessions.map((s) => new SessionModel(s));
                            this.sessionsLoaded = true;
                            Promise.resolve(this._allSessions);
                        });
                }
                else {
                    this.loadSessionsViaFaker<Array<ISession>>()
                        .then((newSessions: Array<ISession>) => {
                            this._allSessions = newSessions.map((s) => new SessionModel(s));
                            this.sessionsLoaded = true;
                            Promise.resolve(this._allSessions);
                        });
                }
            }
        });
    }

    public getSessionById(sessionId: string) {
        return new Promise((resolve, reject) => {
            let filtered = this._allSessions.filter((s) => s.id === sessionId);
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
        this.publishUpdates();

        return Promise.resolve(true);
    }

    private loadSessionsViaHttp<T>(): Promise<T> {
        const reqParams = {
            url: "https://<your-service-url>/Events/v1/sessions",
            method: "GET",
            headers: { "API-VERSION": "1.0.0" }
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
            return s.startDt.getDate() === date
                && s.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) >= 0;
        });

        if (viewIndex === 0) {
            filteredSessions = filteredSessions.filter((i) => i.favorite || i.isBreak);
        }

        // Make sure all updates are published inside NgZone so that change detection is triggered if needed
        this._zone.run(() => {
            // must emit a *new* value (immutability!)
            this.items.next([...filteredSessions]);
        });
    }
}
