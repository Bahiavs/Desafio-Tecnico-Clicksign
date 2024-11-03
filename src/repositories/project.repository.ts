import { Injectable, inject } from "@angular/core";
import Project from "../entities/project";

@Injectable({ providedIn: 'root' })
export default class ProjectRepository {
    private readonly _db = inject(MemoryDB)

    get(id: string): Project {
        const projectData = this._db.get(id)
        const project = new Project(projectData.id, projectData.name, projectData.costumer, projectData.startDate, projectData.endDate, projectData.coverUrl, projectData.isStarred)
        return project
    }

    getAll(): Project[] {
        return this._db.getAll().map(projectData => {
            return new Project(projectData.id, projectData.name, projectData.costumer, projectData.startDate, projectData.endDate, projectData.coverUrl, projectData.isStarred)
        })
    }

    update(project: Project) {
        this._db.update(project.id, { name: project.getName(), costumer: project.getCostumer(), startDate: project.getStartDate(), endDate: project.getEndDate(), coverUrl: project.getCoverUrl() })
    }
}

@Injectable({ providedIn: 'root' })
class MemoryDB {
    private _storage: any[] = [
        { id: '0', name: 'Projeto 07', costumer: 'Clicksign', startDate: new Date(2000, 0), endDate: new Date(2001, 0), coverUrl: new File([''], 'file.png'), isStarred: false },
        { id: '1', name: 'Projeto 01', costumer: 'Clicksign', startDate: new Date(2002, 0), endDate: new Date(2003, 0), coverUrl: new File([''], 'file.png'), isStarred: true },
        { id: '2', name: 'Projeto 02', costumer: 'Clicksign', startDate: new Date(2006, 0), endDate: new Date(2007, 0), coverUrl: new File([''], 'file.png'), isStarred: true },
        { id: '3', name: 'Projeto 03', costumer: 'Clicksign', startDate: new Date(2006, 0), endDate: new Date(2008, 0), coverUrl: new File([''], 'file.png'), isStarred: false },
        { id: '4', name: 'Projeto 04', costumer: 'Clicksign', startDate: new Date(2022, 0), endDate: new Date(2024, 0), coverUrl: new File([''], 'file.png'), isStarred: true },
        { id: '5', name: 'Projeto 05', costumer: 'Clicksign', startDate: new Date(2024, 0), endDate: new Date(2026, 0), coverUrl: new File([''], 'file.png'), isStarred: false },
        { id: '6', name: 'Projeto 06', costumer: 'Clicksign', startDate: new Date(2025, 0), endDate: new Date(2027, 0), coverUrl: new File([''], 'file.png'), isStarred: false },
        { id: '7', name: 'Projeto 08', costumer: 'Clicksign', startDate: new Date(2026, 0), endDate: new Date(2028, 0), coverUrl: new File([''], 'file.png'), isStarred: true },
        { id: '8', name: 'Projeto 09', costumer: 'Clicksign', startDate: new Date(2023, 0), endDate: new Date(2025, 0), coverUrl: new File([''], 'file.png'), isStarred: false },
    ]

    get(id: string): any {
        return this._storage.find(item => item.id)
    }

    getAll(): any[] {
        return this._storage
    }

    update(id: string, data: any) {
        this._storage = this._storage.map(item => {
            if (item.id !== id) return item
            return { id, ...data }
        })
    }
}