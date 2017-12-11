import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { floorPlansRouting } from "./floor-plans-routing.module";
import { FloorPlansComponent } from "./floor-plans.component";

@NgModule({
    imports: [
        NativeScriptModule,
        floorPlansRouting,
        SharedModule
    ],
    declarations: [
        FloorPlansComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FloorPlansModule { }
