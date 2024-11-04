import { Component, Input } from "@angular/core";

@Component({
    selector: 'button[star-toggle]',
    standalone: true,
    template: `
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path [attr.fill]="active ? '#FFB23D' : 'transparent'" d="M1.16398 9.1776C0.845199 8.88374 1.01836 8.35251 1.44953 8.30155L7.55901 7.5792C7.73474 7.55843 7.88738 7.44843 7.96149 7.28825L10.5384 1.71938C10.7203 1.32636 11.2808 1.32628 11.4626 1.7193L14.0395 7.28813C14.1136 7.44831 14.2653 7.55861 14.441 7.57938L20.5508 8.30155C20.982 8.35251 21.1547 8.8839 20.8359 9.17776L16.3195 13.3419C16.1896 13.4616 16.1317 13.6399 16.1662 13.8129L17.3649 19.828C17.4495 20.2525 16.9962 20.5815 16.6174 20.3701L11.249 17.3738C11.0946 17.2877 10.907 17.2881 10.7526 17.3742L5.3836 20.3693C5.00472 20.5807 4.55066 20.2525 4.63528 19.828L5.83411 13.8133C5.8686 13.6403 5.8109 13.4616 5.68098 13.3418L1.16398 9.1776Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `,
    styles: `
        :host {
            background-color: transparent;
            padding: 0;
            border: none;
        }
        svg {
            filter: drop-shadow(0px 4px 4px #00000040);
            display: block;
        }
    `
})
export class StarToggleComponent {
    @Input() active = false
}