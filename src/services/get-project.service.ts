import { inject, Injectable } from "@angular/core";
import ProjectRepository from "../repositories/project.repository";
import ImageVO from "../value-objecs/image";

@Injectable({ providedIn: 'root' })
export default class GetProjectService {
    private readonly _projectRepository = inject(ProjectRepository)

    execute(id: string): Output {
        const project = this._projectRepository.get(id)
        if (!project) throw new Error('Projeto não encontrado')
        return {
            id: project.id,
            name: project.getName(),
            costumer: project.getCostumer(),
            startDate: project.getStartDate(),
            endDate: project.getEndDate(),
            coverImg: project.getCoverImg(),
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
    coverImg: ImageVO | null
    isStarred: boolean
}