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
import { Label } from "ui/label";
import { StackLayout } from "ui/layouts/stack-layout";
import { ItemEventData } from "ui/list-view";
import { Page } from "ui/page";
import { SegmentedBarItem } from "ui/segmented-bar";
import { GestureEventData, SwipeGestureEventData, SwipeDirection } from "ui/gestures";
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
    selector: "sessions",
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
        this.setSelectedIndex(0);
        this.selectedViewIndex = 1;
        this.dayHeader = sessionDays[0].desc;
        _page.actionBarHidden = true;
    }

    public ngOnInit() {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this._router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
            }
        });
    }
    
    public load() {
        this.hideHorizontalScrollBar();
    }
    
    public hideHorizontalScrollBar() {
        let scrollview = this._page.getViewById("scrollView");
        setTimeout(() => {
            if(platform.isAndroid){
                scrollview.android.setHorizontalScrollBarEnabled(false);
            }
            else if (platform.isIOS) {
                scrollview.ios.showsHorizontalScrollIndicator = false; 
            }
        }, 10);
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

    get confDayOptions(): Array<ISessionDay> {
        return sessionDays;
    }
    
    private resetIsSelected() {
        sessionDays.forEach((day) => {
            day.isSelected = false;
        });
    }
    
    private setSelectedIndex(index : number) {
        this.selectedIndex = index;
        this.resetIsSelected();
        sessionDays[index].isSelected = true;
    }
    
    public selectedIndexChange(args) {
        let index: number = 0;
        index = sessionDays.findIndex(x => x.title == args.title);
        if (this.selectedIndex !== index) {
            this.setSelectedIndex(index);
        }
    }
    
    public onSwipe(args: SwipeGestureEventData) {
        let index: number = this.selectedIndex;
        if (args.direction === SwipeDirection.left) {
            if (index === (sessionDays.length - 1)) {
                // We are already at the end. Skip.
            } else {
                this.setSelectedIndex(++index);
            }
        }
        else if (args.direction === SwipeDirection.right) {
            if (index === 0) {
                // We are already at the begining. Skip.
            } else {
                this.setSelectedIndex(--index);
            }
        }
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