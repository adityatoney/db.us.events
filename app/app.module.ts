// angular imports
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

//n ativescript imports
import { NativeScriptRouterModule } from "nativescript-angular/router";

// app imports
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SessionsService } from "./services/sessions.service";
import { EventService } from "./services/event.service";
import { FavoritesService } from "./services/favorites.service";
import { SessionsModule } from "./sessions/sessions.module";
import { EventListModule } from "./event-list/event-list.module";
import { LocationModule } from "./location/location.module";
import { GeneralInformationModule } from "./general-information/general-information.module";
import { FloorPlansModule } from "./floor-plans/floor-plans.module";
import * as platform from "platform";
declare var GMSServices: any;

if(platform.isIOS) {
    GMSServices.provideAPIKey("AIzaSyBAfPOpn0GEORT5PhQqIVN7b7cl8fRBYHQ");
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptRouterModule,
        AppRoutingModule,
        SessionsModule,
        EventListModule,
        LocationModule,
        GeneralInformationModule,
        FloorPlansModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        SessionsService,
        EventService,
        FavoritesService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
