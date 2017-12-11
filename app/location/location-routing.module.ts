import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LocationComponent } from "./location.component";

const locationRoutes: Routes = [
    { path: "location", component: LocationComponent }
];

export const locationRouting: ModuleWithProviders = RouterModule.forChild(locationRoutes);
