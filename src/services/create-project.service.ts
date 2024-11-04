import { inject, Injectable } from "@angular/core";
import ProjectRepository from "../repositories/project.repository";
import Project from "../entities/project";

@Injectable({ providedIn: 'root' })
export default class CreateProjectService {
    private readonly _projectRepository = inject(ProjectRepository)

    execute(input: Input) {
        const project = Project.create(input.name, input.costumer, input.startDate, input.endDate, input.coverImg)
        this._projectRepository.create(project)
    }
}

interface Input {
    name: string
    costumer: string
    startDate: Date
    endDate: Date
    coverImg: File | null
}