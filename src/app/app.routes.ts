import { Routes } from '@angular/router';
import { ProjectListingComponent } from "../pages/project-listing/project-listing.component";
import { ProjectEditingComponent } from '../pages/project-editing/project-editing.component';
import { ProjectCreationComponent } from '../pages/project-creation/project-creation.component';

export const routes: Routes = [
    { path: '', redirectTo: 'listing', pathMatch: 'full' },
    { path: 'listing', component: ProjectListingComponent },
    { path: 'editing/:id', component: ProjectEditingComponent },
    { path: 'creation', component: ProjectCreationComponent },
];
