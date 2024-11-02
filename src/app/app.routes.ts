import { Routes } from '@angular/router';
import { ProjectListingComponent } from "../pages/project-listing/project-listing.component";

export const routes: Routes = [
    { path: '', redirectTo: 'listing', pathMatch: 'full' },
    { path: 'listing', component: ProjectListingComponent },
];
