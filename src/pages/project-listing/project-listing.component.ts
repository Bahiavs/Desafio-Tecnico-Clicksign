import { Component, inject } from '@angular/core';
import GetProjectsService from "../../services/get-projects.service";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
    selector: 'project-listing',
    standalone: true,
    imports: [AsyncPipe, JsonPipe, ReactiveFormsModule],
    templateUrl: './project-listing.component.html',
})
export class ProjectListingComponent {
    readonly projects$ = inject(GetProjectsService).projects$
    readonly filterTextControl = new FormControl('')
    readonly filterStarredControl = new FormControl(false)
    readonly filteredProjects$ = combineLatest([
        this.projects$,
        this.filterTextControl.valueChanges.pipe(startWith(this.filterTextControl.value)),
        this.filterStarredControl.valueChanges.pipe(startWith(this.filterStarredControl.value)),
    ]).pipe(
        map(([projects, filterText, isFilteringStarred]) => projects.filter(project => {
            if (isFilteringStarred && !project.isStarred) return false
            if (!project.name.includes(filterText!)) return false
            return true
        }))
    )
}
