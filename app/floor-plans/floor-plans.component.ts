import { SessionsService } from './../services/sessions.service';
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
    message: boolean;
    
    constructor(
        private routerExtensions: RouterExtensions,
        private data: SessionsService
    ){
        
    }
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.data.currentMessage.subscribe(message => this.message = message);
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
