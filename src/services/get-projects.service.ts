import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import ProjectRepository from "../repositories/project.repository";

@Injectable({ providedIn: 'root' })
export default class GetProjectsService {
    private readonly _projectRepository = inject(ProjectRepository)

    execute(): Output[] {
        const projects = this._projectRepository.getAll()
        return projects.map(project => ({
            id: project.id,
            name: project.getName(),
            costumer: project.getCostumer(),
            startDate: project.getStartDate(),
            endDate: project.getEndDate(),
            coverUrl: project.getCoverUrl(),
            isStarred: project.getIsStarred()
        }))
    }
}

interface Output {
    id: string;
    name: string
    costumer: string
    startDate: Date
    endDate: Date
    coverUrl: File
    isStarred: boolean
}