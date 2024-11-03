import { Component, inject } from '@angular/core';
import GetProjectsService from "../../services/get-projects.service";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { Router } from '@angular/router';

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
    readonly assortmentControl = new FormControl<'alphabetical' | 'mostRecentStarted' | 'closerToCompletionDate'>('alphabetical')
    readonly filteredProjects$ = combineLatest([
        this.projects$,
        this.filterTextControl.valueChanges.pipe(startWith(this.filterTextControl.value)),
        this.filterStarredControl.valueChanges.pipe(startWith(this.filterStarredControl.value)),
        this.assortmentControl.valueChanges.pipe(startWith(this.assortmentControl.value)),
    ]).pipe(
        map(([projects, filterText, isFilteringStarred, assortment]) => {
            let filteredProjects = projects.filter(project => {
                if (isFilteringStarred && !project.isStarred) return false
                if (!project.name.includes(filterText!)) return false
                return true
            })
            switch (assortment) {
                case 'alphabetical':
                    filteredProjects = filteredProjects.sort((a, b) => a.name.localeCompare(b.name))
                    break
                case 'mostRecentStarted':
                    filteredProjects = filteredProjects.sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
                    break
                case 'closerToCompletionDate':
                    filteredProjects = filteredProjects.sort((a, b) => b.endDate.getTime() - a.endDate.getTime())
                    break
            }
            return filteredProjects
        })
    )
    private readonly _router = inject(Router)

    onEditproject(id: string) { this._router.navigate(['/editing', id]) }
}