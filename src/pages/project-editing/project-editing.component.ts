import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import GetProjectService from '../../services/get-project.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import EditProjectService from '../../services/edit-project.service';
import { Subscription } from 'rxjs';
import ImageVO from '../../value-objecs/image';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'project-editing',
    standalone: true,
    imports: [ReactiveFormsModule, AsyncPipe],
    templateUrl: './project-editing.component.html',
})
export class ProjectEditingComponent implements OnInit {
    private readonly _editProject = inject(EditProjectService)
    private readonly _router = inject(Router)
    private readonly _activatedRoute = inject(ActivatedRoute)
    private readonly _getProject = inject(GetProjectService)
    private readonly _subscriptions = new Subscription()
    private _projectID: string | undefined = undefined
    readonly nameControl = new FormControl('')
    readonly costumerControl = new FormControl('')
    readonly startDateControl = new FormControl<Date>(new Date())
    readonly endDateControl = new FormControl<Date>(new Date())
    readonly coverImgControl = new FormControl<File | null>(null, this._fileTypeValidator)
    img: null | ImageVO = null

    ngOnInit() {
        const subscription = this._activatedRoute.paramMap.subscribe(params => {
            this._projectID = params.get('id')!
            const project = this._getProject.execute(this._projectID)
            this.nameControl.setValue(project.name)
            this.costumerControl.setValue(project.costumer)
            this.startDateControl.setValue(project.startDate)
            this.endDateControl.setValue(project.endDate)
            this.img = project.coverImg
        });
        this._subscriptions.add(subscription)
    }

    ngOnDestroy() {
        this._subscriptions.unsubscribe()
    }

    returnToListingPage() { this._router.navigate(['/']) }

    editProject() {
        this._editProject.execute({
            id: this._projectID!,
            name: this.nameControl.value!,
            costumer: this.costumerControl.value!,
            startDate: this.startDateControl.value!,
            endDate: this.endDateControl.value!,
            coverImg: this.coverImgControl.value!,
        })
    }

    setFile(event: Event) {
        const input = event.target as HTMLInputElement
        if (!input.files) return
        if (input.files.length === 0) return
        const file = input.files[0]
        this.coverImgControl.setValue(file)
        this.img = new ImageVO(file)
    }

    private _fileTypeValidator(control: any): { [key: string]: boolean } | null {
        if (!control.value) return null
        if (!control.value.length) return null
        const file: File = control.value[0]
        const validTypes = ['image/jpeg', 'image/png']
        if (validTypes.indexOf(file.type) !== -1) return null
        return { invalidFileType: true }
    }
}
