import { Injectable, OnInit } from "@angular/core";

import * as appModule from "application";
import * as appSettingsModule from "application-settings";
import * as platformModule from "platform";
import * as typesModule from "utils/types";

import { IFavouriteSession, ISession } from "../shared/interfaces";

@Injectable()
export class FavoritesService implements OnInit {

    public favourites: Array<IFavouriteSession> = [];

    public ngOnInit() { }

    public addToFavourites(session: ISession) { }

    public removeFromFavourites(session: ISession) { }

    public updateFavourites() { }

}
