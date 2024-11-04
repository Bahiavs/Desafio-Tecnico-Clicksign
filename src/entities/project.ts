import { Observable } from "rxjs"
import ImageVO from "../value-objecs/image"

export default class Project {
    private constructor(readonly id: string,
        private _name: string,
        private _costumer: string,
        private _startDate: Date,
        private _endDate: Date,
        private _coverImg: ImageVO,
        private _isStarred: boolean,
    ) { }

    static create(name: string, costumer: string, startDate: Date, endDate: Date, coverImg: File): Project {
        const id = crypto.randomUUID()
        const isStarred = false
        const img = new ImageVO(coverImg)
        return new Project(id, name, costumer, startDate, endDate, img, isStarred)
    }
    
    static restore(id: string, name: string, costumer: string, startDate: Date, endDate: Date, coverImg: File, isStarred: boolean): Project {
        const img = new ImageVO(coverImg)
        return new Project(id, name, costumer, startDate, endDate, img, isStarred)
    }

    getName() { return this._name }

    getCostumer() { return this._costumer }

    getStartDate() { return this._startDate }

    getEndDate() { return this._endDate }

    getCoverImg() { return this._coverImg }

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
        this._coverImg = new ImageVO(coverImg)
    }

    toggleStar() {
        this._isStarred = !this._isStarred
    }
}