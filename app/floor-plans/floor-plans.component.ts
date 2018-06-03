import { SessionsService } from './../services/sessions.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { NativeScriptRouterModule, RouterExtensions } from "nativescript-angular/router";
import { IEvent } from "../shared/interfaces";
import { SessionModel } from "../sessions/shared/session.model";

@Component({
    selector: "floor-plans",
    moduleId: module.id,
    templateUrl: "./floor-plans.component.html",
    styleUrls: ["floor-plans.component.scss"]
})


export class FloorPlansComponent implements OnInit {
    sharedData: boolean;
    public uniqueFloorURLs: Array<string> = []; //Dummy variable to hold all unique url's
    public uniqueFloor: Array<Object> = []; // Filtered and sorted unique floorplan url sessions  
    
    constructor(
        private routerExtensions: RouterExtensions,
        private _sessionsService: SessionsService
    ){
    }
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.getUniqueFloorplans();
    }

    // Extract all unique floorplan URLs from all sessions then sort the unique floorplan objects (SessionModel) to display 
    // URL in ascending order
    public getUniqueFloorplans (){
        for(let j = 0; j < this._sessionsService._allSessions.length; j++){
            if(this.uniqueFloorURLs.indexOf(this._sessionsService._allSessions[j].floorPlanImageUrl) < 0){
                this.uniqueFloorURLs.push(this._sessionsService._allSessions[j].floorPlanImageUrl);
                this.uniqueFloor.push(this._sessionsService._allSessions[j]);
                console.log("All Unique URLSss :: ID - ", this._sessionsService._allSessions[j].sessionId, this._sessionsService._allSessions[j].floorName,
                 this._sessionsService._allSessions[j].floorPlanImageUrl);
            } 
        }
        this.uniqueFloor.sort((a: SessionModel, b: SessionModel) => { //Sorts the unique array of SessionModel's by floor name (ascending order)
            let comparison = 0;
            const floorA = a.floorName.toUpperCase();
            const floorB = b.floorName.toUpperCase();
            if(floorA > floorB){
                comparison = 1;
            }else if (floorA < floorB){
                comparison = -1
            }
            return comparison;
        });
    }
    
    get sideDrawerTransition(): DrawerTransitionBase { 
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    
    onBackTap(): void{
        this.routerExtensions.back();
    }
    
    public homeTap() {
        let link = ['/sessions/1'];
        this.routerExtensions.navigate(link);
    }
}
