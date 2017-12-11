// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs/Rx";

// nativescript
import { NativeScriptRouterModule, RouterExtensions } from "nativescript-angular/router";
import { ItemEventData } from "ui/list-view";

// app
import { FavoritesService } from "../../services/favorites.service";
import { SessionsService } from "../../services/sessions.service";
import { hideSearchKeyboard, sessionDays, slideInAnimations } from "../../shared";
import { ISession, ISessionDay } from "../../shared/interfaces";
import { SearchFilterState } from "../shared/search.filter.model";
import { SessionModel } from "../shared/session.model";

@Component({
    moduleId: module.id,
    selector: "session-list",
    templateUrl: "session-list.component.html",
    styleUrls: ["session-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: slideInAnimations
})
export class SessionListComponent implements OnInit {

    @Output() public notifySessionSelected: EventEmitter<SessionModel> = new EventEmitter<SessionModel>();
    @Input() public sessionCardVisible: boolean;

    private _selectedIndex: number = 0;
    private _selectedViewIndex: number;

    constructor(
        private _zone: NgZone,
        private _sessionsService: SessionsService,
        private _routerExtensions: RouterExtensions,
        private _changeDetectorRef: ChangeDetectorRef) {
        this._selectedIndex = 0;
    }

    public ngOnInit() {
        this._sessionsService.items.subscribe((observer) => {
            let delay = 0;
            observer.forEach((value: SessionModel, i: number, array: Array<SessionModel>) => {
                delay = delay + 500;
                setTimeout(() => {
                    value.triggerShow.next(true);
                }, delay);
            });
            // An update has happened but it hasn't been inside the Angular Zone.
            // This will notify Angular to detect those changes
            this._changeDetectorRef.detectChanges();
        });
    }
    
    public get selectedViewIndex() {
        return this._selectedViewIndex;
    }
    @Input() public set selectedViewIndex(value: number) {
        this._selectedViewIndex = value;
        if (this._selectedViewIndex < 2) {
            this.refresh();
        }
    }

    public get selectedIndex(): number {
        return this._selectedIndex;
    }
    @Input() public set selectedIndex(value: number) {
        if (this._selectedIndex !== value) {
            this._selectedIndex = value;
            this.refresh();
        }
    }

    public get animationState() {
        return this.selectedViewIndex === 2 ? "off" : "on";
    }

    public load() {
        let p = this._sessionsService.loadSessions<Array<ISession>>()
            .then((newSessions: Array<ISession>) => {
                this.refresh();
            });
    }

    public selectSession(args: ItemEventData, session: SessionModel) {
        if (this.sessionCardVisible) {
            return;
        }

        if (!session.isBreak) {
            let link = ['/session-details', session.id];
            this._routerExtensions.navigate(link);
        }
    }

    public showSessionCard(session: SessionModel) {
        this.notifySessionSelected.emit(session);
    }

    private refresh() {
        let searchFilterState: SearchFilterState = new SearchFilterState(
            sessionDays[this.selectedIndex].date.getDate(),
            "",
            this.selectedViewIndex,
            "");
        this._sessionsService.update(searchFilterState);
    }
}
