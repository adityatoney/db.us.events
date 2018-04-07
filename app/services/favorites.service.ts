import { Injectable } from "@angular/core";

import * as appModule from "application";
import * as appSettingsModule from "application-settings";
import * as platformModule from "platform";
import * as typesModule from "utils/types";

import { IFavouriteSession, ISession } from "../shared/interfaces";

@Injectable()
export class FavoritesService {

    public favourites: Array<IFavouriteSession> = [];

    public constructor() { 
        try {
            this.favourites = <Array<IFavouriteSession>>JSON.parse(appSettingsModule.getString('FAVOURITES', '[]'));
        }
        catch (error) {
            console.log('Error while retrieveing favourites from the local cache: ' + error);
            this.favourites = new Array<IFavouriteSession>();
            this.updateFavourites();
        }
    }
    
    public getFavouriteIndex(sessionId: string): number {
        for (var i = 0; i < this.favourites.length; i++) {
            if (this.favourites[i].sessionId === sessionId) {
                return i;
            }
        }
        return -1;
    }

    public addToFavourites(session: ISession) { 
        if (this.getFavouriteIndex(session.sessionId) >= 0) {
            return;
        }
        
        this.favourites.push({sessionId: session.sessionId});
        this.updateFavourites();
    }

    public removeFromFavourites(session: ISession) { 
        var index = this.getFavouriteIndex(session.sessionId);
        if (index >= 0) {
            this.favourites.splice(index, 1);
            this.updateFavourites();
        }
    }

    public updateFavourites() { 
        var updatedFavList = JSON.stringify(this.favourites);
        console.log('Updating favourites: ' + updatedFavList);
        appSettingsModule.setString('FAVOURITES', updatedFavList);
    }
}
