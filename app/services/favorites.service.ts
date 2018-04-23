import { Injectable } from "@angular/core";

import * as appModule from "application";
import * as appSettingsModule from "application-settings";
import * as platformModule from "platform";
import * as typesModule from "utils/types";

import { IFavouriteSession, ISession } from "../shared/interfaces";
import { Data } from "../providers/data/data";

@Injectable()
export class FavoritesService {

    public favourites: Array<IFavouriteSession> = [];

    public constructor(private data: Data) { 
        try {
            var eventId = this.data.storage["eventId"];
            this.favourites = <Array<IFavouriteSession>>JSON.parse(appSettingsModule.getString('FAVOURITES_' + eventId, '[]'));
        }
        catch (error) {
            this.favourites = new Array<IFavouriteSession>();
            this.updateFavourites();
        }
    }
    
    public getFavouriteIndex(sessionId: number): number {
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
        var eventId = this.data.storage["eventId"];
        appSettingsModule.setString('FAVOURITES_' + eventId, updatedFavList);
    }
}
