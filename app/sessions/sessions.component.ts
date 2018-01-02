// angular
import { Location } from "@angular/common";
import { AfterViewInit, Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from "@angular/core";
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
import { SearchBar } from 'ui/search-bar';
import { SegmentedBarItem } from "ui/segmented-bar";
import { GestureEventData, SwipeGestureEventData, SwipeDirection } from "ui/gestures";
import { TabView, SelectedIndexChangedEventData } from "ui/tab-view";

// app
import { SessionsService } from "../services/sessions.service";
import { hideSearchKeyboard, sessionDays } from "../shared";
import { ISession, ISessionDay } from "../shared/interfaces";
import { SessionModel } from "./shared/session.model";
import { SearchFilterState } from "./shared/search.filter.model";
import { Visibility } from "tns-core-modules/ui/enums/enums";

declare var UISearchBarStyle: any;
declare var UIImage: any;
declare var UIVisualEffectView,
    UIViewAutoresizingFlexibleWidth,
    UIViewAutoresizingFlexibleHeight,
    UIBlurEffectStyleLight;
let _blurEffectView = null;

@Component({
    moduleId: module.id,
    selector: "sessions",
    templateUrl: "./sessions.component.html",
    styleUrls: ["sessions.component.scss"]
})
export class SessionsComponent implements OnInit {

    public isLoading = true;
    public isSessionsPage = true;
    public showSearchBar = false;
    public selectedViewIndex: number;
    public actionBarTitle: string = "All sessions";
    public selectedPageTitle: string = "";
    public selectedIndex: number;
    public selectedSession: SessionModel = null;
    @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;
    @ViewChild("searchBar") public searchBar: ElementRef;
    
    private _sideDrawerTransition: DrawerTransitionBase;
    private _search = "";

    constructor(
        private _sessionsService: SessionsService,
        private _zone: NgZone,
        private _page: Page,
        private _router: Router,
        private route: ActivatedRoute
    ) {
        _page.backgroundSpanUnderStatusBar = true;
        this.selectedViewIndex = 1;
        this.setSelectedIndex(0, false);
        _page.actionBarHidden = true;
    }

    public ngOnInit() {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this._router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
            }
        });
        
        this.route.params.forEach((params: Params) => {
            if (this.selectedPageTitle !== "") {
                this.drawerComponent.sideDrawer.closeDrawer();
            }
            
            this.selectedViewIndex = +params["id"];
            if (this.selectedViewIndex === 1) {
                this.selectedPageTitle = "Agenda";
            } else {
                this.selectedPageTitle = "My Sessions";
            }
        });
    }
    
    public load() {
        this.hideHorizontalScrollBar();
        if (platform.isIOS) {
            // iOS renders two thin lines above and below the SearchBar. These lines comes with the default styling applied via UISearchBarStyle.
            // The below code will change the default search bar style to render it correctly.
            this.searchBar.nativeElement.ios.searchBarStyle = UISearchBarStyle.Prominent;
            this.searchBar.nativeElement.ios.backgroundImage = UIImage.new();
        }
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
    
    private setSelectedIndex(index : number, refresh: boolean) {
        this.selectedIndex = index;
        this.resetIsSelected();
        sessionDays[index].isSelected = true;
        
        if (this._search !== "") {
            this._search = "";
        } else {
            this.refresh();
        }
    }
    
    public selectedIndexChange(args) {
        let index: number = 0;
        index = sessionDays.findIndex(x => x.title == args.title);
        if (this.selectedIndex !== index) {
            this.setSelectedIndex(index, true);
        }
    }
    
    public onSwipe(args: SwipeGestureEventData) {
        let index: number = this.selectedIndex;
        if (args.direction === SwipeDirection.left) {
            if (index === (sessionDays.length - 1)) {
                // We are already at the end. Skip.
            } else {
                this.setSelectedIndex(++index, true);
            }
        }
        else if (args.direction === SwipeDirection.right) {
            if (index === 0) {
                // We are already at the begining. Skip.
            } else {
                this.setSelectedIndex(--index, true);
            }
        }
    }
    
    public get search(): string {
        return this._search;
    }
    public set search(value: string) {
        if (this._search !== value) {
            this._search = value;
            this.refresh();
        }
    }
    
    public onSearchBarTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        if (this._search !== searchBar.text) {
            this._search = searchBar.text;
            this.refresh();
        }
    }
    
    public onSearchBarClear(args) {
        this._search = "";
        this.refresh();
    }
    
    public hideSearchBar() {
        this._search = "";
        this.refresh();
        this.showSearchBar = false;
        this.hideSearchKeyboard();
    }
    
    public searcIconTapped() {
        this.showSearchBar = true;
        var searchBar = this._page.getViewById("searchBar");
        this.searchBar.nativeElement.focus();
    }
    
    private refresh() {
        let searchFilterState: SearchFilterState = new SearchFilterState(
            sessionDays[this.selectedIndex].date.getDate(),
            this.search,
            this.selectedViewIndex,
            "");
        this._sessionsService.update(searchFilterState);
    }
    
    private hideSearchKeyboard() {
        hideSearchKeyboard(this.searchBar.nativeElement);
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
        if (this.selectedViewIndex < 2) {
            this.refresh();
        }
        this.hideSearchKeyboard();
    }

    public sessionSelected(session: SessionModel) {
        this.selectedSession = session;
        this.hideSearchKeyboard();
    }

    public hideSessionCard() {
        this.selectedSession = null;
    }

    // TODO: [aditya] Blur out the background
    public selectedSessionCardLoaded(sessionCardWrapper) { }

}