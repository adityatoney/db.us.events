import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { locationRouting } from "./location-routing.module";
import { LocationComponent } from "./location.component";

@NgModule({
    imports: [
        NativeScriptModule,
        locationRouting,
        SharedModule
    ],
    declarations: [
        LocationComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LocationModule { }
