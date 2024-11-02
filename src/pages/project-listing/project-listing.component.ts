import { Component, inject } from '@angular/core';
import GetProjectsService from "../../services/get-projects.service";
import { AsyncPipe, JsonPipe } from "@angular/common";

@Component({
    selector: 'project-listing',
    standalone: true,
    imports: [AsyncPipe, JsonPipe],
    templateUrl: './project-listing.component.html',
})
export class ProjectListingComponent {
    readonly projects$ = inject(GetProjectsService).projects$
}
