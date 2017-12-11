// angular
import { Component, Input, Output, EventEmitter } from "@angular/core";

// nativescript
import { StackLayout } from "ui/layouts/stack-layout";
import * as platform from "platform";

// app
import { SessionModel } from "../shared/session.model";

@Component({
    moduleId: module.id,
    selector: "session-modal",
    templateUrl: "session-modal.component.html",
    styleUrls: ["session-modal.component.scss"]
})
export class SessionModalComponent {

    @Input() public session: SessionModel;
    @Output() public notifyCardClosed: EventEmitter<void> = new EventEmitter<void>();

    public cardSwipe() {
        // TODO: [aditya] close card
    }

    public cardClose() {
        this.notifyCardClosed.emit();
    }

    public cardLoaded(sessionCard: StackLayout) {
        if (platform.isIOS) {
            let nativeIosView = sessionCard.ios;
            nativeIosView.layer.masksToBounds = false;
            nativeIosView.layer.shadowRadius = 10;
            nativeIosView.layer.shadowOpacity = 0.5;
        }
    }
}
