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
    readonly coverImgControl = new FormControl<File | null>(null, this._fileTypeValidator)
    imageUrl: string | ArrayBuffer | null | undefined = null

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

    setFile(event: Event) {
        const input = event.target as HTMLInputElement
        if (!input.files) return
        if (input.files.length === 0) return
        const file = input.files[0]
        this.coverImgControl.setValue(file)
        this._previewImage(file)
    }

    private _previewImage(file: File) {
        const reader = new FileReader()
        reader.onload = (e) => this.imageUrl = e.target?.result
        reader.readAsDataURL(file)
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
