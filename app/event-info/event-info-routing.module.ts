import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EventInfoComponent } from "./event-info.component";

const eventInfoRoutes: Routes = [
    { path: "event-info", component: EventInfoComponent }
];

export const eventInfoRouting: ModuleWithProviders = RouterModule.forChild(eventInfoRoutes);
