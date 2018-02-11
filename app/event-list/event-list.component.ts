import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";

import { EventModel } from './../shared/event.model';
import { EventService } from './../services/event.service';
import { IEvent } from "../shared/interfaces";


class Event {
    constructor(public name: string) { }
}

let eventList = ["South East Gurupurnima 2018"];
    
@Component({
    selector: "event-list",
    moduleId: module.id,
    templateUrl: "./event-list.component.html",
    styleUrls: ["event-list.component.scss"]
})
export class EventListComponent implements OnInit {
    public allevents: Array<Event>;
    public event: EventModel;
    public _eventServices: EventService;
     
    constructor(private routerExtensions: RouterExtensions){
        this.allevents = [];
        
        for (let i = 0; i < eventList.length; i++) {
            this.allevents.push(new Event(eventList[i]));
        }
    }

    @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    public ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        // console.log("TESTING before:: "); 
        // let p = this._eventServices.loadEvents<Array<IEvent>>().
        //     then((newSessions: Array<IEvent>) => {
        //         console.log("DO NOTHING");
        //     });
        // console.log("TESTING :: ", p);
    }
    
    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    public onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    
    public selectEvent() {
        let link = ['/sessions/1'];
        this.routerExtensions.navigate(link);
    }
}