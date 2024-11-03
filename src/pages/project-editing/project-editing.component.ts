import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import GetProjectService from '../../services/get-project.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'project-editing',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './project-editing.component.html',
})
export class ProjectEditingComponent implements OnInit {
    private readonly _router = inject(Router)
    private readonly _activatedRoute = inject(ActivatedRoute)
    private readonly _getProject = inject(GetProjectService)
    readonly nameControl = new FormControl('')
    readonly costumerControl = new FormControl('')
    readonly startDateControl = new FormControl<Date>(new Date())
    readonly endDateControl = new FormControl<Date>(new Date())
    readonly coverImgControl = new FormControl<File | null>(null)

    ngOnInit() {
        this._activatedRoute.paramMap.subscribe(params => {
            const id = params.get('id')!
            const project = this._getProject.execute(id)
            this.nameControl.setValue(project.name)
            this.costumerControl.setValue(project.costumer)
            this.startDateControl.setValue(project.startDate)
            this.endDateControl.setValue(project.endDate)
        });
    }

    returnToListingPage() { this._router.navigate(['/']) }
}
