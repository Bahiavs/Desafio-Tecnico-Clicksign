import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import CreateProjectService from '../../services/create-project.service';
import ImageVO from '../../value-objecs/image';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'project-creation',
    standalone: true,
    imports: [ReactiveFormsModule, AsyncPipe],
    templateUrl: './project-creation.component.html',
})
export class ProjectCreationComponent {
    private readonly _createProject = inject(CreateProjectService)
    private readonly _router = inject(Router)
    readonly nameControl = new FormControl('')
    readonly costumerControl = new FormControl('')
    readonly startDateControl = new FormControl<string | null>(null)
    readonly endDateControl = new FormControl<string | null>(null)
    readonly coverImgControl = new FormControl<File | null>(null, this._fileTypeValidator)
    img = new ImageVO(new File([''], ''))

    returnToListingPage() { this._router.navigate(['/']) }

    createProject() {
        try {
            this._createProject.execute({
                name: this.nameControl.value!,
                costumer: this.costumerControl.value!,
                startDate: new Date(this.startDateControl.value!),
                endDate: new Date(this.endDateControl.value!),
                coverImg: this.coverImgControl.value!,
            })
            alert('Criado com sucesso!')
        } catch (error) {
            alert(error)
        }
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
