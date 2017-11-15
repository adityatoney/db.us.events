import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FeaturedComponent } from "./featured.component";

const featuredRoutes: Routes = [
    { path: "featured", component: FeaturedComponent }
];

export const featuredRouting: ModuleWithProviders = RouterModule.forChild(featuredRoutes);
