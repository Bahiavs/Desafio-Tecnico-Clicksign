import { inject, Injectable } from "@angular/core";
import ProjectRepository from "../repositories/project.repository";

@Injectable({ providedIn: 'root' })
export default class EditProjectService {
    private readonly _projectRepository = inject(ProjectRepository)

    execute(input: Input) {
        const project = this._projectRepository.get(input.id)
        project.updateName(input.name)
        project.updateCostumer(input.costumer)
        project.updateStartDate(input.startDate)
        project.updateEndDate(input.endDate)
        project.updateCoverImg(input.coverImg)
        this._projectRepository.update(project)
    }
}

interface Input {
    id: string
    name: string
    costumer: string
    startDate: Date
    endDate: Date
    coverImg: File
}