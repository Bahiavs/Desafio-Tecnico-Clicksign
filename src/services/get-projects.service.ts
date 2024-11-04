import { inject, Injectable } from "@angular/core";
import ProjectRepository from "../repositories/project.repository";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export default class GetProjectsService {
    private readonly _projectRepository = inject(ProjectRepository)
    private readonly _projects$ = new BehaviorSubject<Output[]>([])

    execute(): Observable<Output[]>  {
        const projects = this._projectRepository.getAll()
        const output: Output[] =  projects.map(project => ({
            id: project.id,
            name: project.getName(),
            costumer: project.getCostumer(),
            startDate: project.getStartDate(),
            endDate: project.getEndDate(),
            coverImg: project.getCoverImg(),
            isStarred: project.getIsStarred()
        }))
        this._projects$.next(output)
        return this._projects$.asObservable()
    }
}

interface Output {
    id: string;
    name: string
    costumer: string
    startDate: Date
    endDate: Date
    coverImg: File
    isStarred: boolean
}