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
    private _projectID: string | null = null
    readonly nameControl = new FormControl('')
    readonly costumerControl = new FormControl('')
    readonly startDateControl = new FormControl<string | null>(null)
    readonly endDateControl = new FormControl<string | null>(null)
    readonly coverImgControl = new FormControl<File | null>(null, this._fileTypeValidator)
    img: null | ImageVO = null

    ngOnInit() {
        const subscription = this._activatedRoute.paramMap.subscribe(params => {
            try {
                this._projectID = params.get('id')
                if (!this._projectID) throw new Error('ID não encontrado')
                const project = this._getProject.execute(this._projectID)
                this.nameControl.setValue(project.name)
                this.costumerControl.setValue(project.costumer)
                this.startDateControl.setValue(project.startDate.toISOString().slice(0, 10))
                this.endDateControl.setValue(project.endDate.toISOString().slice(0, 10))
                this.img = project.coverImg
            } catch (error) {
                alert(error)
                this.returnToListingPage()
            }
        });
        this._subscriptions.add(subscription)
    }

    ngOnDestroy() {
        this._subscriptions.unsubscribe()
    }

    returnToListingPage() { this._router.navigate(['/']) }

    editProject() {
        try {
            if (!this.nameControl.value) throw new Error('Nome do projeto inválido')
            if (!this.costumerControl.value) throw new Error('Cliente inválido')
            if (!this.startDateControl.value) throw new Error('Data de início inválida')
            if (!this.endDateControl.value) throw new Error('Data final inválida')
            this._editProject.execute({
                id: this._projectID!,
                name: this.nameControl.value,
                costumer: this.costumerControl.value,
                startDate: new Date(this.startDateControl.value),
                endDate: new Date(this.endDateControl.value),
                coverImg: this.coverImgControl.value,
            })
            alert('Salvo com sucesso!')
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

    removeCoverImg() {
        this.coverImgControl.setValue(null)
        this.img = null
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
