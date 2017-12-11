import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { eventInfoRouting } from "./event-info-routing.module";
import { EventInfoComponent } from "./event-info.component";

@NgModule({
    imports: [
        NativeScriptModule,
        eventInfoRouting,
        SharedModule
    ],
    declarations: [
        EventInfoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EventInfoModule { }
