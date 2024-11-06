import { AsyncPipe, NgClass } from "@angular/common";
import { Component, EventEmitter, HostBinding, Output } from "@angular/core";
import ImageVO from "../../value-objecs/image";

@Component({
    selector: 'upload-input',
    standalone: true,
    imports: [NgClass, AsyncPipe],
    templateUrl: './upload-input.html',
    styleUrl: './upload-input.scss',
})
export class UploadInputComponent {
    @HostBinding('class.filled') img: ImageVO | null = null
    @Output() image$ = new EventEmitter<File | null>()

    removeCoverImg() {
        this.img = null
        this.image$.emit(null)
    }
    
    setFile(event: Event) {
        const input = event.target as HTMLInputElement
        if (!input.files) return
        if (input.files.length === 0) return
        const file = input.files[0]
        this.img = new ImageVO(file)
        this.image$.emit(this.img.file)
    }
}