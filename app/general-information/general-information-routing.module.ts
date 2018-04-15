import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GeneralInformationComponent } from "./general-information.component";

const generalInformationRoutes: Routes = [
    { path: "general-information", component: GeneralInformationComponent, pathMatch: "full" }
];

export const generalInformationRouting: ModuleWithProviders = RouterModule.forChild(generalInformationRoutes);
