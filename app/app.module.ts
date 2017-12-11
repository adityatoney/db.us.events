// angular imports
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

//n ativescript imports
import { NativeScriptRouterModule } from "nativescript-angular/router";

// app imports
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SessionsService } from "./services/sessions.service";
import { FavoritesService } from "./services/favorites.service";
import { SessionsModule } from "./sessions/sessions.module";
import { EventInfoModule } from "./event-info/event-info.module";
import { LocationModule } from "./location/location.module";
import { FloorPlansModule } from "./floor-plans/floor-plans.module";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptRouterModule,
        AppRoutingModule,
        SessionsModule,
        EventInfoModule,
        LocationModule,
        FloorPlansModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        SessionsService,
        FavoritesService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
