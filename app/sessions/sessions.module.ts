import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { SessionFavoriteComponent } from "./session-favorite/session-favorite.component";
import { SessionModalComponent } from "./session-modal/session-modal.component";
import { SessionDetailsComponent } from "./session-details/session-details.component";
import { SessionListComponent } from "./session-list/session-list.component";
import { SessionsComponent } from "./sessions.component";
import { SessionsRoutingModule } from "./sessions.routing";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    SharedModule,
    SessionsRoutingModule
  ],
  declarations: [
    SessionsComponent,
    SessionDetailsComponent,
    SessionListComponent,
    SessionFavoriteComponent,
    SessionModalComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SessionsModule { }
