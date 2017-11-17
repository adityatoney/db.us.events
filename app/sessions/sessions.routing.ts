import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SessionDetailsComponent } from "./session-details/session-details.component";
import { SessionsComponent } from "./sessions.component";

const sessionsRoutes: Routes = [
  { path: "sessions/:id", component: SessionsComponent },
  { path: "session-details/:id", component: SessionDetailsComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(sessionsRoutes)],
  exports: [NativeScriptRouterModule]
})
export class SessionsRoutingModule { }
