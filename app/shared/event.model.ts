import { IMainEventSessions, IEvent } from "../shared/interfaces";

import { BehaviorSubject } from "rxjs/Rx";


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
    get id(): string {
        return this._event.id;
    }
    get name(): string {
        return this._event.name;
    }
    get imageURL(): string {
        return this._event.imageURL;
    }
    get address(): string {
        return this._event.address;
    }
    get city(): string {
        return this._event.city;
    }
    get state(): string {
        return this._event.state;
    }
    get country(): string {
        return this._event.country;
    }
    get zipcode(): string {
        return this._event.zipcode;
    }
    get startDate(): string {
        return this._event.startDate;
    }
    get endDate(): string {
        return this._event.endDate;
    }
    get description(): string {
        return this._event.description;
    }
    get schedule(): Array<IMainEventSessions> {
        if(this._event.schedule.length > 0){
            return this._event.schedule;
        }
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
    get contantInfo(): string {
        if(this._event.contantInfo){
            return this._event.contantInfo;
        }
    }
    
}