import { Component, OnInit, ViewChild,  ElementRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ScrollEventData } from "ui/scroll-view";
import { Page } from "ui/page";
import { Image } from "ui/image";
import { FlexboxLayout } from "ui/layouts/flexbox-layout";

@Component({
    selector: "general-information",
    moduleId: module.id,
    // styleUrls: ["general-information.component.scss"],
    templateUrl: "./general-information.component.html"
})
export class GeneralInformationComponent implements OnInit {
    
    public title: string;
    public startDate: string;
    public desc: string;
    public endDate: string;
    public address: string;
    public imageSrc: string;
    public scheduleTitle: string;
    public schedule: string;
    public image: Image;
    public flex: FlexboxLayout;

    @ViewChild("img") img: ElementRef;
    @ViewChild("content") content: ElementRef;

    constructor(public page: Page) {
        this.page.backgroundSpanUnderStatusBar = true;
    }
    
    onScroll(args: ScrollEventData) {
        if (args.scrollY <= this.flex.getMeasuredHeight()) {
            this.image.animate({
                translate: { x: 0, y: args.scrollY * 0.3 }
            });
        }
    }

    @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    public ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.imageSrc = "~/images/jacksonville.jpg";
        this.title = "South West Gurupurnima 2018";
        this.startDate = "Start Date: July 22, 2018";
        this.endDate = "End Date: July 28, 2018";
        this.address = "Address: Jacksonville (TBD) ";
        // this.desc = "Our theme for Gurupurnima 2018 is global unity, and in this spirit, our tagline is YOUnity starts with YOU! As individuals, we can all play a role in making this event a success! " ;
        this.scheduleTitle = "Main Events";
        this.schedule = "Sunday July 22, 2018: Check-In\nMonday July 23, 2018: Gurupurnima starts\nFriday July 27, 2018: Gurupujan\nSaturday July 28, 2018: Gnanvidhi\nSunday July 29, 2018: Check-out after breakfast";
        this.image = this.img.nativeElement;
        this.flex = this.content.nativeElement;
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    public onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}

