import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import CreateProjectService from '../../services/create-project.service';

@Component({
    selector: 'project-creation',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './project-creation.component.html',
})
export class ProjectCreationComponent {
    private readonly _createProject = inject(CreateProjectService)
    private readonly _router = inject(Router)
    readonly nameControl = new FormControl('')
    readonly costumerControl = new FormControl('')
    readonly startDateControl = new FormControl<Date>(new Date())
    readonly endDateControl = new FormControl<Date>(new Date())
    readonly coverImgControl = new FormControl<File | null>(null)

    returnToListingPage() { this._router.navigate(['/']) }

    createProject() {
        this._createProject.execute({
            name: this.nameControl.value!,
            costumer: this.costumerControl.value!,
            startDate: this.startDateControl.value!,
            endDate: this.endDateControl.value!,
            coverImg: this.coverImgControl.value!,
        })
    }

    setFile(event: any) {
        this.coverImgControl.setValue(event.target.files[0])
    }
}
