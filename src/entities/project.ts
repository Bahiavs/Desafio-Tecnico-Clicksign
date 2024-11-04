import { Observable } from "rxjs"

export default class Project {
    constructor(readonly id: string,
        private _name: string,
        private _costumer: string,
        private _startDate: Date,
        private _endDate: Date,
        private _coverImg: File,
        private _isStarred: boolean,
    ) { }

    static create(name: string, costumer: string, startDate: Date, endDate: Date, coverImg: File): Project {
        const id = crypto.randomUUID()
        const isStarred = false
        return new Project(id, name, costumer, startDate, endDate, coverImg, isStarred)
    }

    getName() { return this._name }

    getCostumer() { return this._costumer }

    getStartDate() { return this._startDate }

    getEndDate() { return this._endDate }

    getCoverImg() { return this._coverImg }

    getCoverImgUrl$(): Observable<string | ArrayBuffer | null | undefined> {
        return new Observable(observer => {
            const reader = new FileReader()
            reader.onload = () => observer.next(reader.result)
            reader.onerror = () => observer.error(new Error('Error reading file'))
            reader.readAsDataURL(this._coverImg)
        })
    }

    getIsStarred() { return this._isStarred }

    updateName(name: string) {
        this._name = name
    }

    updateCostumer(costumer: string) {
        this._costumer = costumer
    }

    updateStartDate(startDate: Date) {
        this._startDate = startDate
    }

    updateEndDate(endDate: Date) {
        this._endDate = endDate
    }

    updateCoverImg(coverImg: File) {
        this._coverImg = coverImg
    }

    toggleStar() {
        this._isStarred = !this._isStarred
    }
}