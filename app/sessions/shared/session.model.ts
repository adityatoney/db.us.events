import { BehaviorSubject } from "rxjs/Rx";

import { IRoomInfo, ISession, ISpeaker } from "../../shared/interfaces";

export class SessionModel implements ISession {

    public triggerShow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private _session: ISession;
    private _favorite: boolean = false;
    private _startDt: Date;
    private _endDt: Date;

    get id(): string {
        return this._session.id;
    }

    get title(): string {
        return this._session.title;
    }

    get room(): string {
        if (this._session.room) {
            return this._session.room;
        }
        if (this._session.roomInfo) {
            return this._session.roomInfo.name;
        }

        return null;
    }

    get roomInfo(): IRoomInfo {
        return this._session.roomInfo;
    }

    get start(): string {
        return this._session.start;
    }

    get end(): string {
        return this._session.end;
    }

    get startDt(): Date {
        return this._startDt;
    }

    get endDt(): Date {
        return this._endDt;
    }

    get speakers(): Array<ISpeaker> {
        return this._session.speakers;
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

    get isBreak(): boolean {
        return this._session.isBreak;
    }

    get description(): string {
        return this._session.description;
    }

    get descriptionShort(): string {
        if (this.description.length > 160) {
            return this.description.substr(0, 160) + "...";
        }
        else {
            return this.description;
        }
    }
    
    get type(): string {
        return this._session.type;
    }

    constructor(public source: ISession) {
        if (source) {
            this._session = source;
            this._startDt = this.fixDate(new Date(source.start));
            this._endDt = this.fixDate(new Date(source.end));
        }
    }

    public toggleFavorite() {
        this.favorite = !this.favorite;
    }

    private fixDate(date: Date): Date {
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }

}
