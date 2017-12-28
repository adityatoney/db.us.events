import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { eventListRouting } from "./event-list-routing.module";
import { EventListComponent } from "./event-list.component";

@NgModule({
    imports: [
        NativeScriptModule,
        eventListRouting,
        SharedModule
    ],
    declarations: [
        EventListComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EventListModule { }
