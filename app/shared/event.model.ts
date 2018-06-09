import { IMainEventSessions, IEvent, ISession } from "../shared/interfaces";
import { SessionModel } from "../sessions/shared/session.model";

import { BehaviorSubject } from "rxjs/BehaviorSubject";


export class EventModel implements IEvent {
    public triggerShow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private _event: IEvent;
    private _startDt: Date;
    private _endDt: Date;
    
    constructor(public source: IEvent) {
        if (source) {
            this._event = source;
        }
    }
    
    //Todo - Depending on data format that is received from API, we might have to parse some fields below
    get eventId(): string {
        return this._event.eventId;
    }
    get eventName(): string {
        return this._event.eventName;
    }
    get eventImageUrl(): string {
        return this._event.eventImageUrl;
    }
    get eventStreetAddress(): string {
        return this._event.eventStreetAddress;
    }
    get eventCity(): string {
        return this._event.eventCity;
    }
    get eventState(): string {
        return this._event.eventState;
    }
    get eventCountry(): string {
        return this._event.eventCountry;
    }
    get eventZipCode(): string {
        return this._event.eventZipCode;
    }
    get eventStartDate(): string {
        return this._event.eventStartDate;
    }
    get eventEndDate(): string {
        return this._event.eventEndDate;
    }
    get description(): string {
        return this._event.description;
    }
    get schedule(): Array<IMainEventSessions> {
        if(this._event.schedule.length > 0){
            return this._event.schedule;
        }
        
        return [];
    }
    get accomodation(): string {
        if(this._event.accomodation){
            return this._event.accomodation;
        }
    }
    get transportation(): string {
        if(this._event.transportation){
            return this._event.transportation;
        }
    }
    get contactInformation(): string {
        if(this._event.contactInformation){
            return this._event.contactInformation;
        }
    }
    
    get eventSessions(): Array<SessionModel> {
        if(this._event.eventSessions.length > 0){
            return this._event.eventSessions;
        }
        
        return [];
    }
}