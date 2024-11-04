import { Observable } from "rxjs"

export default class ImageVO {
    readonly getImgUrl$: Observable<string | ArrayBuffer | null | undefined>
    constructor(readonly file: File) {
        this.getImgUrl$ = new Observable(observer => {
            const reader = new FileReader()
            reader.onload = () => observer.next(reader.result)
            reader.onerror = () => observer.error(new Error('Error reading file'))
            reader.readAsDataURL(this.file)
        })
    }
}