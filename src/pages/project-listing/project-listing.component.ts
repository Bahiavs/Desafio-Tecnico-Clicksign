import { Component, inject } from '@angular/core';
import GetProjectsService from "../../services/get-projects.service";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { DeleteDialogConfirmationDialogComponent } from '../../components/delete-project-confirmation-dialog/delete-project-confirmation-dialog.component';
import ToggleProjectStarService from '../../services/toggle-project-star.service';

@Component({
    selector: 'project-listing',
    standalone: true,
    imports: [AsyncPipe, JsonPipe, ReactiveFormsModule],
    templateUrl: './project-listing.component.html',
})
export class ProjectListingComponent {
    private readonly _getProjectsService = inject(GetProjectsService)
    private readonly _toggleProjectStarService = inject(ToggleProjectStarService)
    private readonly _dialog = inject(Dialog)
    private readonly _router = inject(Router)
    readonly projects$ = this._getProjectsService.execute()
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

    onEditproject(id: string) { this._router.navigate(['/editing', id]) }

    deleteProject(id: string, name: string) {
        const data = { id, name }
        const dialog = this._dialog.open(DeleteDialogConfirmationDialogComponent, { data })
        dialog.closed.subscribe(deletionHappened => {
            if (!deletionHappened) return
            this._getProjectsService.execute()
        })
    }
    
    toggleProjectStar(id: string) {
        this._toggleProjectStarService.execute(id)
        this._getProjectsService.execute()
    }

    openProjectCreationPage() { this._router.navigate(['/creation']) }
}