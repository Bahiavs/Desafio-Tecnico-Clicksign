import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { Component, inject } from "@angular/core";
import DeleteProjectService from "../../services/delete-project.service";

@Component({
    selector: 'delete-project-confirmation-dialog',
    templateUrl: './delete-project-confirmation-dialog.component.html',
    styleUrl: './delete-project-confirmation-dialog.component.scss',
    standalone: true,
})
export class DeleteDialogConfirmationDialogComponent {
    private readonly _dialogRef = inject(DialogRef<boolean>);
    private readonly _deleteProject = inject(DeleteProjectService)
    readonly data = inject<DeleteProjectDialogInput>(DIALOG_DATA);

    closeDialog() { this._dialogRef.close(false) }

    deleteProjectService() {
        this._deleteProject.execute(this.data.id)
        this._dialogRef.close(true)
    }
}

interface DeleteProjectDialogInput {
    id: string,
    name: string
}
