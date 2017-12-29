import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "event-list",
    moduleId: module.id,
    templateUrl: "./event-list.component.html",
    styleUrls: ["event-list.component.scss"]
})
export class EventListComponent implements OnInit {
    constructor(
        private routerExtensions: RouterExtensions
    ){
        
    }

    @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    public ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
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
