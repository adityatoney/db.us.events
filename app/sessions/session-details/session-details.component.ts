// angular
import { Component, ViewChild, ChangeDetectorRef, Inject, OnInit, AfterViewInit, ElementRef } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd, Params } from "@angular/router";
import { Location } from "@angular/common";

// nativescript
// import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { NativeScriptRouterModule, RouterExtensions } from "nativescript-angular/router";
import { GestureEventData, SwipeGestureEventData, SwipeDirection } from "ui/gestures";
import { Page } from "ui/page";
import { Button } from "ui/button";
import { Label } from "ui/label";
import { View } from "ui/core/view";
import { Layout } from "ui/layouts/layout";
import { TextView } from "ui/text-view";
import { BottomNavigation, BottomNavigationTab, OnTabSelectedEventData } from 'nativescript-bottom-navigation';

// app
import { SessionsService } from "../../services/sessions.service";
import { SessionModel } from "../shared/session.model";

@Component({
  moduleId: module.id,
  selector: "session-details",
  templateUrl: "session-details.component.html",
  styleUrls: ["session-details.component.scss"]
})
export class SessionDetailsComponent implements OnInit {

  public session: SessionModel;
  @ViewChild("btnDesc") public btnDesc: ElementRef;
  @ViewChild("lblDesc") public lblDesc: ElementRef;

  private descHeight = 20;
  private tabIndex = 0;

  //Tab-View (Bottom-Navigation) Reference: https://market.nativescript.org/plugins/nativescript-bottom-navigation
  public tabs: BottomNavigationTab[] = [
    new BottomNavigationTab('Session Detail', 'ic_view_list_black'),
    new BottomNavigationTab('Floor Plan', 'ic_map'),
    new BottomNavigationTab('Sessions', 'ic_calendar')
  ];

  constructor(
    private _page: Page,
    private _sessionsService: SessionsService,
    private route: ActivatedRoute,
    private location: Location,
    private routerExtensions: RouterExtensions
  ) {
    this._page.actionBarHidden = true;
    this._page.backgroundSpanUnderStatusBar = true;
    this.tabIndex = 0;
  }

  public ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id: number = params.id;

      this._sessionsService.getSessionById(id)
        .then((session: SessionModel) => {
          this.session = session;
        });
    });
  }

  public backSwipe(args: SwipeGestureEventData) {
    if (args.direction === SwipeDirection.right) {
      this.routerExtensions.backToPreviousPage();
    }
  }

  public backTap() {
    this.routerExtensions.back();
  }

  public onTapFloorPlan() {
    let link = ['/floor-plans'];
    this.routerExtensions.navigate(link);
  }

  public toggleFavorite() {
    this._sessionsService.toggleFavorite(this.session)
      .then(() => {
        console.log("done toggling fav from details");
      });
  }

  public descWrapperLoaded(lblDescWrapper: Layout, txtDesc: TextView, lblDesc: Label) {
    let lblHeight = lblDesc.getMeasuredHeight();
    this.descHeight = lblHeight;

    lblDesc.visibility = "collapse";
    lblDescWrapper.height = 100;

    if (txtDesc.ios) {
      txtDesc.ios.scrollEnabled = true;
    }
    if (txtDesc.android) {
      // txtDesc.android.//android equivalent of scrollEnabled
    }

  }

  public toogleDescription(wrapper: Layout) {
    let btn = <Button>this.btnDesc.nativeElement;
    let lbl = <Label>this.lblDesc.nativeElement;
    if (btn.text === "LESS") {
      btn.text = "MORE";
      lbl.text = this.session.sessionContent.substr(0, 160) + "...";

      changeHeight(wrapper, toTheFifth, 1000, 100, this.descHeight);
    }
    else {
      btn.text = "LESS";
      lbl.text = this.session.sessionContent;
      // scroll.scrollToVerticalOffset(0, false);
      changeHeight(wrapper, toTheFifth, 1000, this.descHeight, 100);
    }
  }

  public onBottomNavigationTabSelected(args: OnTabSelectedEventData): void {
    this.tabIndex = args.newIndex;
    if (this.tabIndex == 2) {
      this.routerExtensions.back();
    }
  }
}

function changeHeight(view: View, deltaCalc: (p) => {}, duration?: number, from?: number, to?: number) {
  let _from = from || 1;
  let _to = to || 500;

  animate({
    duration: duration || 1000, // 1 second by default
    delay: 5,
    delta: deltaCalc,
    step: function (delta: number) {
      view.height = (to - from) * delta + from;
    }
  });
}

function animate(opts) {
  let start = new Date();

  let id = setInterval(function () {
    let timePassed = <any>(new Date()) - <any>start;
    let progress = timePassed / opts.duration;
    if (progress > 1) {
      progress = 1;
    }

    let delta = opts.delta(progress);
    opts.step(delta);

    if (progress === 1) {
      clearInterval(id);
    }
  }, opts.delay || 10);

}

function toTheFifth(progress) {
  return Math.pow(progress, 5);
}
