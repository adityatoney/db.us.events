import { SessionsService } from './../services/sessions.service';
import { FloorPlanNavService } from './../services/floorplan-nav.service';
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
    public uniqueFloor: Array<Object> = []; //Used to iterate over the floorplan and extract the unique url and floor name
    
    constructor(
        private routerExtensions: RouterExtensions,
        private _floorplanNavService: FloorPlanNavService,
        private _sessionsService: SessionsService
    ){
        this.sharedData = this._floorplanNavService.getData();
    }
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.sharedData = this._floorplanNavService.getData();
        this._sessionsService.items.subscribe((observer) => {
            let delay = 0;
            observer.forEach((value: SessionModel, i: number, array: Array<SessionModel>) => {
                delay = delay + 500;
                setTimeout(() => {
                    value.triggerShow.next(true);
                }, delay);
            });
        });
        for(let i = 0; i < this._sessionsService.items.value.length; i++){ //Extract unique floorplan URLs
            if(this.uniqueFloorURLs.indexOf(this._sessionsService.items.value[i].floorPlanImageUrl) === -1){
                this.uniqueFloorURLs.push(this._sessionsService.items.value[i].floorPlanImageUrl);
                this.uniqueFloor.push(this._sessionsService.items.value[i]);
                console.log(this._sessionsService.items.value[i].floorPlanImageUrl);
            }
        }
    }

    public load() {
        let p = this._sessionsService.loadSessions<IEvent>()
            .then((newSessions: IEvent) => {
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
