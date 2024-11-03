import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import GetProjectService from '../../services/get-project.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import EditProjectService from '../../services/edit-project.service';
import { Subscription } from 'rxjs';
import CreateProjectService from '../../services/create-project.service';

@Component({
    selector: 'project-creation',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './project-creation.component.html',
})
export class ProjectCreationComponent implements OnInit {
    private readonly _createProject = inject(CreateProjectService)
    private readonly _router = inject(Router)
    private readonly _activatedRoute = inject(ActivatedRoute)
    private readonly _getProject = inject(GetProjectService)
    private readonly _subscriptions = new Subscription()
    private _projectID: string | undefined = undefined
    readonly nameControl = new FormControl('')
    readonly costumerControl = new FormControl('')
    readonly startDateControl = new FormControl<Date>(new Date())
    readonly endDateControl = new FormControl<Date>(new Date())
    readonly coverImgControl = new FormControl<File | null>(null)

    ngOnInit() {
        const subscription = this._activatedRoute.paramMap.subscribe(params => {
            this._projectID = params.get('id')!
            const project = this._getProject.execute(this._projectID)
            this.nameControl.setValue(project.name)
            this.costumerControl.setValue(project.costumer)
            this.startDateControl.setValue(project.startDate)
            this.endDateControl.setValue(project.endDate)
        });
        this._subscriptions.add(subscription)
    }

    ngOnDestroy() {
        this._subscriptions.unsubscribe()
    }

    returnToListingPage() { this._router.navigate(['/']) }

    createProject() {
        this._createProject.execute({
            name: this.nameControl.value!,
            costumer: this.costumerControl.value!,
            startDate: this.startDateControl.value!,
            endDate: this.endDateControl.value!,
            coverUrl: this.coverImgControl.value!,
        })
    }
}
