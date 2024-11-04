import { inject, Injectable } from "@angular/core";
import ProjectRepository from "../repositories/project.repository";

@Injectable({ providedIn: 'root' })
export default class GetProjectService {
    private readonly _projectRepository = inject(ProjectRepository)

    execute(id: string): Output {
        const project = this._projectRepository.get(id)
        return {
            id: project.id,
            name: project.getName(),
            costumer: project.getCostumer(),
            startDate: project.getStartDate(),
            endDate: project.getEndDate(),
            coverUrl: project.getCoverUrl(),
            isStarred: project.getIsStarred(),
        }
    }
}

interface Output {
    id: string
    name: string
    costumer: string
    startDate: Date
    endDate: Date
    coverUrl: File
    isStarred: boolean
}