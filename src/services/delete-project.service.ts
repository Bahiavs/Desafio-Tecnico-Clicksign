import { inject, Injectable } from "@angular/core";
import ProjectRepository from "../repositories/project.repository";

@Injectable({ providedIn: 'root' })
export default class DeleteProjectService {
    private readonly _projectRepository = inject(ProjectRepository)
    
    execute(id: string) {
        this._projectRepository.delete(id)
    }
}