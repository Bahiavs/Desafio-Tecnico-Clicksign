import { inject, Injectable } from "@angular/core";
import GetProjectsService from "./get-projects.service";

@Injectable({ providedIn: 'root' })
export default class GetProjectService {
    private readonly _getProjectsService = inject(GetProjectsService)

    execute(id: number): GetProjectDTO {
        const project = this._getProjectsService.execute().find(project => project.id === id)
        if (!project) throw 'Id not found'
        return project
    }
}

interface GetProjectDTO {
    id: number;
    name: string
    costumer: string
    startDate: Date
    endDate: Date
    coverUrl: string
    isStarred: boolean
}
