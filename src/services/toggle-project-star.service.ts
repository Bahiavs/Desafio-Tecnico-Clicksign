import { inject, Injectable } from "@angular/core";
import ProjectRepository from "../repositories/project.repository";

@Injectable({ providedIn: 'root' })
export default class ToggleProjectStarService {
    private readonly _projectRepository = inject(ProjectRepository)
    
    execute(id: string) {
        const project = this._projectRepository.get(id)
        if (!project) throw new Error('Projeto não encontrado')
        project.toggleStar()
        this._projectRepository.update(project)
    }
}