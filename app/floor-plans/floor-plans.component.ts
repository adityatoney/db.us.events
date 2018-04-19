import { SessionsService } from './../services/sessions.service';
import { FloorPlanNavService } from './../services/floorplan-nav.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { NativeScriptRouterModule, RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "floor-plans",
    moduleId: module.id,
    templateUrl: "./floor-plans.component.html",
    styleUrls: ["floor-plans.component.scss"]
})


export class FloorPlansComponent implements OnInit {
    sharedData: boolean;
    constructor(
        private routerExtensions: RouterExtensions,
        private _floorplanNavService: FloorPlanNavService
    ){
        this.sharedData = this._floorplanNavService.getData();
    }
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.sharedData = this._floorplanNavService.getData();
    }

    get sideDrawerTransition(): DrawerTransitionBase { 
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    public homeTap() {
        let link = ['/sessions/1'];
        this.routerExtensions.navigate(link);
    }
}
