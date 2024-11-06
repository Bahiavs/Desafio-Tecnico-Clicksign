import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import CreateProjectService from '../../services/create-project.service';
import ImageVO from '../../value-objecs/image';
import { AsyncPipe, NgClass } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { UploadInputComponent } from "../../components/upload-input/upload-input";
import { combineLatest, map, startWith } from 'rxjs';

@Component({
    selector: 'project-creation',
    standalone: true,
    imports: [ReactiveFormsModule, AsyncPipe, HeaderComponent, NgClass, UploadInputComponent],
    templateUrl: './project-creation.component.html',
    styleUrl: 'project-creation.component.scss'
})
export class ProjectCreationComponent {
    private readonly _createProject = inject(CreateProjectService)
    private readonly _router = inject(Router)
    readonly nameControl = new FormControl('', Validators.required)
    readonly costumerControl = new FormControl('', Validators.required)
    readonly startDateControl = new FormControl<string | null>(null, Validators.required)
    readonly endDateControl = new FormControl<string | null>(null, Validators.required)
    readonly coverImgControl = new FormControl<File | null>(null, this._fileTypeValidator)
    img: ImageVO | null = null

    returnToListingPage() { this._router.navigate(['/']) }

    createProject() {
        try {
            if (!this.nameControl.value) throw new Error('Nome do projeto inválido')
            if (!this.costumerControl.value) throw new Error('Cliente inválido')
            if (!this.startDateControl.value) throw new Error('Data de início inválida')
            if (!this.endDateControl.value) throw new Error('Data final inválida')
            this._createProject.execute({
                name: this.nameControl.value,
                costumer: this.costumerControl.value,
                startDate: new Date(this.startDateControl.value),
                endDate: new Date(this.endDateControl.value),
                coverImg: this.coverImgControl.value,
            })
            alert('Criado com sucesso!')
        } catch (error) {
            alert(error)
        }
    }

    onChangeCoverImg(img: File | null) {
        this.coverImgControl.setValue(img)
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
