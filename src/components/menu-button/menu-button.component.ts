import { Component } from "@angular/core";

@Component({
    selector: 'button[menu-button]',
    standalone: true,
    template: `
        <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2.39279C13 2.94331 13.4477 3.3896 14 3.3896C14.5523 3.3896 15 2.94331 15 2.39279C15 1.84226 14.5523 1.39597 14 1.39597C13.4477 1.39597 13 1.84226 13 2.39279Z" fill="#695CCD"/>
            <path d="M7 2.39279C7 2.94331 7.44772 3.3896 8 3.3896C8.55228 3.3896 9 2.94331 9 2.39279C9 1.84226 8.55228 1.39597 8 1.39597C7.44772 1.39597 7 1.84226 7 2.39279Z" fill="#695CCD"/>
            <path d="M1 2.39279C1 2.94331 1.44772 3.3896 2 3.3896C2.55228 3.3896 3 2.94331 3 2.39279C3 1.84226 2.55228 1.39597 2 1.39597C1.44772 1.39597 1 1.84226 1 2.39279Z" fill="#695CCD"/>
            <path d="M13 2.39279C13 2.94331 13.4477 3.3896 14 3.3896C14.5523 3.3896 15 2.94331 15 2.39279C15 1.84226 14.5523 1.39597 14 1.39597C13.4477 1.39597 13 1.84226 13 2.39279Z" stroke="#695CCD" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 2.39279C7 2.94331 7.44772 3.3896 8 3.3896C8.55228 3.3896 9 2.94331 9 2.39279C9 1.84226 8.55228 1.39597 8 1.39597C7.44772 1.39597 7 1.84226 7 2.39279Z" stroke="#695CCD" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 2.39279C1 2.94331 1.44772 3.3896 2 3.3896C2.55228 3.3896 3 2.94331 3 2.39279C3 1.84226 2.55228 1.39597 2 1.39597C1.44772 1.39597 1 1.84226 1 2.39279Z" stroke="#695CCD" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `,
    styles: `
        :host {
            background-color: white;
            width: 2rem;
            height: 2rem;
            padding: 0;
            border: none;
            border-radius: 50%;
            position: relative;
            box-shadow: 0px 4px 4px 0px #00000040;
        }
        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    `
})
export class MenuButtonComponent {
}