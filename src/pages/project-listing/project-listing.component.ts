import { Component, inject, OnInit } from '@angular/core';
import GetProjectsService from "../../services/get-projects.service";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
    selector: 'project-listing',
    standalone: true,
    imports: [AsyncPipe, JsonPipe, ReactiveFormsModule],
    templateUrl: './project-listing.component.html',
})
export class ProjectListingComponent implements OnInit {
    readonly projects$ = inject(GetProjectsService).projects$
    readonly filteredTextControl = new FormControl('')
    readonly filteredProjects$ = combineLatest([
        this.projects$, 
        this.filteredTextControl.valueChanges.pipe(startWith(this.filteredTextControl.value))
    ]).pipe(
        map(([projects, filterText]) => projects.filter(project => project.name.includes(filterText!)))
    )

    ngOnInit() {
    }
}
