import { NgClass } from "@angular/common";
import { Component, HostBinding, Input } from "@angular/core";

@Component({
    selector: 'slide-toggle',
    standalone: true,
    imports: [NgClass],
    template: `<div [ngClass]="{'active': active}"></div>`,
    styles: `
        :host {
            cursor: pointer;
            display: flex;
            background-color: #717171;
            border-radius: 10rem;
            width: 3rem;

            &.active {
                background-color: #ffb23d;
            }
        }
        div {
            border-radius: 10rem;
            width: 12px;
            height: 12px;
            background-color: white;
            margin: 6px;

            &.active {
                margin-left: auto;
            }
        }
    `
})
export class SlideToggleComponent {
    @Input() active = false

    @HostBinding('class.active') get activeClass() {
        return this.active;
    }
}