import { Injectable } from "@angular/core";
import Project from "../entities/project";
import MemoryDB from "../databases/memory.database";

@Injectable({ providedIn: 'root' })
export default class ProjectRepository {
    private readonly _db = new MemoryDB()

    get(id: string): Project {
        const projectData = this._db.get(id)
        const project = new Project(projectData.id, projectData.name, projectData.costumer, projectData.startDate, projectData.endDate, projectData.coverImg, projectData.isStarred)
        return project
    }

    getAll(): Project[] {
        return this._db.getAll().map(projectData => {
            return new Project(projectData.id, projectData.name, projectData.costumer, projectData.startDate, projectData.endDate, projectData.coverImg, projectData.isStarred)
        })
    }

    update(project: Project) {
        this._db.update(project.id, { name: project.getName(), costumer: project.getCostumer(), startDate: project.getStartDate(), endDate: project.getEndDate(), coverImg: project.getCoverImg(), isStarred: project.getIsStarred() })
    }

    create(project: Project) {
        this._db.insert({ id: project.id, name: project.getName(), costumer: project.getCostumer(), startDate: project.getStartDate(), endDate: project.getEndDate(), coverImg: project.getCoverImg(), isStarred: project.getIsStarred() })
    }

    delete(id: string) {
        this._db.delete(id)
    }
}
