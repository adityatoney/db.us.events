import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { generalInformationRouting } from "./general-information-routing.module";
import { GeneralInformationComponent } from "./general-information.component";

@NgModule({
    imports: [
        NativeScriptModule,
        generalInformationRouting,
        SharedModule
    ],
    declarations: [
        GeneralInformationComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GeneralInformationModule { }
