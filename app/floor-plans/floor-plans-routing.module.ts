import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FloorPlansComponent } from "./floor-plans.component";

const floorPlansRoutes: Routes = [
    { path: "floor-plans", component: FloorPlansComponent }
];

export const floorPlansRouting: ModuleWithProviders = RouterModule.forChild(floorPlansRoutes);
