// angular imports
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

//n ativescript imports
import { NativeScriptRouterModule } from "nativescript-angular/router";

// app imports
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SessionsService } from "./services/sessions.service";
import { SessionsModule } from "./sessions/sessions.module";
import { HomeModule } from "./home/home.module";
import { FeaturedModule } from "./featured/featured.module";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptRouterModule,
        AppRoutingModule,
        SessionsModule,
        HomeModule,
        FeaturedModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        SessionsService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
