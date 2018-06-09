import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { IRoomInfo, ISession, ISpeaker } from "../../shared/interfaces";

export class SessionModel implements ISession {

    public triggerShow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private _session: ISession;
    private _favorite: boolean = false;
    private _startDt: Date;
    private _endDt: Date;

    get sessionId(): number {
        return this._session.sessionId;
    }

    get sessionTitle(): string {
        return this._session.sessionTitle;
    }

    get sessionStartTime(): string {
        return this._session.sessionStartTime;
    }

    get sessionEndTime(): string {
        return this._session.sessionEndTime;
    }

    get startDt(): Date {
        return this._startDt;
    }

    get endDt(): Date {
        return this._endDt;
    }
    
    get isBreak(): boolean {
        return this._session.isBreak;
    }
    
    get roomId(): number {
        return this._session.roomId;
    }
    
    get roomName(): string {
        return this._session.roomName;
    }
    
    get floorId(): number {
        return this._session.floorId;
    }
    
    get floorName(): string {
        return this._session.floorName;
    }
    
    get floorPlanImageUrl(): string {
        return this._session.floorPlanImageUrl;
    }
    
    get speakerId(): number {
        return this._session.speakerId;
    }

    get speakerName(): string {
        return this._session.speakerName;
    }
    
    get eventSessionTypeId(): number {
        return this._session.eventSessionTypeId;
    }
    
    get eventSessionTypeName(): string {
        return this._session.eventSessionTypeName;
    }
    
    get sessionPhotoUrl(): string {
        return this._session.sessionPhotoUrl;
    }
    
    get sessionContent(): string {
        return this._session.sessionContent;
    }
    
    get favorite(): boolean {
        return this._favorite;
    }
    set favorite(value: boolean) {
        if (this._favorite !== value && !this._session.isBreak) {
            this._favorite = value;
        }
    }

    get range(): string {
        let startMinutes = this.startDt.getMinutes() + "";
        let endMinutes = this.endDt.getMinutes() + "";
        let startAM = this.startDt.getHours() < 12 ? "am" : "pm";
        let endAM = this.endDt.getHours() < 12 ? "am" : "pm";

        let startHours = (this.startDt.getHours() <= 12 ? this.startDt.getHours() : this.startDt.getHours() - 12) + "";
        let endHours = (this.endDt.getHours() <= 12 ? this.endDt.getHours() : this.endDt.getHours() - 12) + "";

        return (startHours.length === 1 ? "0" + startHours : startHours) + ":" + (startMinutes.length === 1 ? "0" + startMinutes : startMinutes) + startAM +
            " - " + (endHours.length === 1 ? "0" + endHours : endHours) + ":" + (endMinutes.length === 1 ? "0" + endMinutes : endMinutes) + endAM;
    }

    constructor(public source: ISession) {
        if (source) {
            this._session = source;
            this._startDt = new Date(source.sessionStartTime);
            this._endDt = new Date(source.sessionEndTime);
        }
    }

    public toggleFavorite() {
        this.favorite = !this.favorite;
    }

    private fixDate(date: Date): Date {
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }
}
