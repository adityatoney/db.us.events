// angular
import { Component, Input } from "@angular/core";

// nativescript
import { Label } from "ui/label";
import * as enums from "ui/enums";

// app
import { SessionModel } from "../shared/session.model";
import { SessionsService } from "../../services/sessions.service";

@Component({
    moduleId: module.id,
    selector: "session-favorite",
    templateUrl: "session-favorite.component.html",
    styleUrls: ["session-favorite.component.scss"]
})
export class SessionFavoriteComponent {
    @Input() public item: SessionModel;

    // Used to avoid spamming the toggle button while the animation is playing.
    public isToggling = false;

    constructor(private _sessionsService: SessionsService) {}

    public toggleFavorite(session: SessionModel, lbl: Label) {
        if (this.isToggling) {
            return;
        }
        this.isToggling = true;
        this._sessionsService.toggleFavorite(session)
            .then(() => {
                // done toggling fovaorite
                this.toggleFavVisual(session, lbl)
                    .then(() => {
                        this.isToggling = false;
                    });
            });
    }

    private toggleFavVisual(session: SessionModel, lbl: Label) {
        return new Promise((resolve, reject) => {
                this.animateFavorite(lbl)
                    .then(() => {
                        resolve();
                    });
        });
    }

    private animateFavorite(lbl: Label) {
        return new Promise((resolve, reject) => {
            lbl.animate({
                duration: 500,
                scale: { x: 1.5, y: 1.5 },
                curve: enums.AnimationCurve.easeIn
            }).then(() => {
                lbl.animate({
                    duration: 500,
                    scale: { x: 1.0, y: 1.0 },
                    curve: enums.AnimationCurve.easeOut
                }).then(() => {
                    resolve();
                });
            });
        });
    }

    private setBackgroundPosition(lbl: Label, positionStr: string) {
        lbl.style.backgroundPosition = positionStr;
    }
}
