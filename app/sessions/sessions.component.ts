// angular
import { Location } from "@angular/common";
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Params, Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs/Rx";

// nativescript
import { NativeScriptRouterModule, RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, ScaleUpTransition, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import * as platform from "platform";
import { Animation, AnimationDefinition } from "ui/animation";
import { Button } from "ui/button";
import * as frameModule from "ui/frame";
import { GestureEventData } from "ui/gestures";
import { Label } from "ui/label";
import { StackLayout } from "ui/layouts/stack-layout";
import { ItemEventData } from "ui/list-view";
import { Page } from "ui/page";
import { SegmentedBarItem } from "ui/segmented-bar";
import { TabView, SelectedIndexChangedEventData } from "ui/tab-view";

// app
import { hideSearchKeyboard, sessionDays } from "../shared";
import { ISession, ISessionDay } from "../shared/interfaces";
import { SessionModel } from "./shared/session.model";

declare var UIVisualEffectView,
    UIViewAutoresizingFlexibleWidth,
    UIViewAutoresizingFlexibleHeight,
    UIBlurEffectStyleLight;
let _blurEffectView = null;

@Component({
    moduleId: module.id,
    selector: "Sessions",
    templateUrl: "./sessions.component.html"
})
export class SessionsComponent implements OnInit {

    public isLoading = true;
    public isSessionsPage = true;
    public selectedViewIndex: number;
    public actionBarTitle: string = "All sessions";
    public dayHeader: string = "";
    public selectedIndex: number;
    public selectedSession: SessionModel = null;
    @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;
    
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private _page: Page,
        private _router: Router
    ) {
        _page.backgroundSpanUnderStatusBar = true;
        this.selectedIndex = 0;
        this.selectedViewIndex = 1;
        this.dayHeader = sessionDays[0].desc;
    }

    public ngOnInit() {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this._router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
            }
        });
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    public onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    public get sessionCardVisible(): boolean {
        return this.selectedSession != null;
    }

    get confDayOptions(): Array<SegmentedBarItem> {
        const items = [];
        sessionDays.forEach((cd) => {
            let segmentedBarItem = new SegmentedBarItem();
            segmentedBarItem.title = cd.title;
            items.push(segmentedBarItem);
        });
        return items;
    }

    public selectedIndexChange(args) {
        const value = args.value;
        if (this.selectedIndex !== value) {
            this.selectedIndex = value;
            this.dayHeader = sessionDays[value].desc;
        }
    }
    
    public onIndexChanged(args) {
        let tabView = <TabView>args.object;
        console.log("Selected index changed! New inxed: " + tabView.selectedIndex);
    }

    public startBackgroundAnimation(background) {
        let def: AnimationDefinition = {
            scale: { x: 1.0, y: 1.0 },
            duration: 10000,
            target: background
        };

        let ani: Animation = new Animation([def]);

        ani.play();
    }

    public showActivityIndicator() {
        this.isLoading = true;
    }

    public selectView(viewIndex: number, pageTitle: string) {
        this.selectedViewIndex = viewIndex;
        this.actionBarTitle = pageTitle;
        this.isSessionsPage = this.selectedViewIndex < 2;
    }

    public sessionSelected(session: SessionModel) {
        this.selectedSession = session;
    }

    public hideSessionCard() {
        this.selectedSession = null;
    }

    // TODO: [aditya] Blur out the background
    public selectedSessionCardLoaded(sessionCardWrapper) { }

}
