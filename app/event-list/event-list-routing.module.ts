import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EventListComponent } from "./event-list.component";

const eventListRoutes: Routes = [
    { path: "event-list", component: EventListComponent, pathMatch: "full" }
];

export const eventListRouting: ModuleWithProviders = RouterModule.forChild(eventListRoutes);
