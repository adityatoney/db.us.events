import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Router, NavigationExtras} from "@angular/router";
import { ItemEventData } from "ui/list-view";

import { EventModel } from './../shared/event.model';
import { EventService } from './../services/event.service';
import { Data } from "../providers/data/data";
import { IEvent } from "../shared/interfaces";


class Event {
    constructor(public name: string) { }
}

let eventList = ["South East TEST Gurupurnima 2018"];

@Component({
    selector: "event-list",
    moduleId: module.id,
    templateUrl: "./event-list.component.html",
    styleUrls: ["event-list.component.scss"]
})
export class EventListComponent implements OnInit {
    public allevents: Array<Event>;
    public events: Array<EventModel> = []; //Used for front-end html

    constructor(
        private routerExtensions: RouterExtensions, 
        public _eventServices: EventService,
        private data: Data){
        this.allevents = []; 
        if (this._eventServices.events.length > 0 ) {
            this.events = this._eventServices.events.map((s) => new EventModel(s));
        }
        //Dummy, card view seems to depend on this for initial loadup
        for (let i = 0; i < eventList.length; i++) {
            this.allevents.push(new Event(eventList[i]));
        }
    }
    @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    public ngOnInit(): void { //Called after constructor
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this._eventServices.items.subscribe((observer) => {
            let delay = 0;
            observer.forEach((value: EventModel, i: number, array: Array<EventModel>) => {
                delay = delay + 500;
                setTimeout(() => {
                    value.triggerShow.next(true);
                }, delay);
            });
            // An update has happened but it hasn't been inside the Angular Zone.
            // This will notify Angular to detect those changes
            //this._changeDetectorRef.detectChanges();
        });
    
        // console.log("TESTING before:: ", this._eventServices);  
        let p = this._eventServices.loadEvents<Array<IEvent>>()
            .then((newEvents: Array<IEvent>) => {
                this.refresh();
        });
            
        this.events = this._eventServices.events.map((s) => new EventModel(s));
        // console.log("TESTING after:: ", this.events.length);          
        if (this.events.length > 0)
        {
            // console.log("Events :: ", this.events[0].eventState, this.events[0].eventCountry);
            // console.log("EventService Events :: ", this._eventServices.events[0].eventState, this.events[0].eventCountry);
        }
    }

    //Todo: Have a set timer, that refreshes the cache for both event-list and session-list to check for changes 
    //made to the data received from API (stat-data.ts for now). When timer ticks (5mins mark), reload the loadEvents
    //with a resetCache parameter passed in as true (override the ignoreCache with this)

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    public onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    
    public selectEvent(args: ItemEventData, event: EventModel) {
        this.data.storage = {
            "eventId": event.eventId
        }
        
        let link = ['/sessions/1'];
        this.routerExtensions.navigate(link);
    }
    private refresh() {
        this._eventServices.update();
    }
}