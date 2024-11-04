import ImageVO from "../value-objecs/image"

export default class Project {
    private constructor(readonly id: string,
        private _name: string,
        private _costumer: string,
        private _startDate: Date,
        private _endDate: Date,
        private _coverImg: ImageVO | null,
        private _isStarred: boolean,
    ) {
        const isNameValid = () => {
            if (_name.length === 0) return false
            return true
        }
        const isCostumerValid = () => {
            if (_costumer.length === 0) return false
            return true
        }
        const areDatesValid = () => {
            if (_endDate.getTime() - _startDate.getTime() <= 0) return false
            return true
        }

        if (!isNameValid()) throw new Error('Invalid name')
        if (!isCostumerValid()) throw new Error('Invalid costumer')
        if (!areDatesValid()) throw new Error('Invalid dates')
    }

    static create(name: string, costumer: string, startDate: Date, endDate: Date, coverImg: File | null = null): Project {
        const id = crypto.randomUUID()
        const isStarred = false
        const img = coverImg ? new ImageVO(coverImg) : null
        return new Project(id, name, costumer, startDate, endDate, img, isStarred)
    }

    static restore(id: string, name: string, costumer: string, startDate: Date, endDate: Date, coverImg: File | null, isStarred: boolean): Project {
        const img = coverImg ? new ImageVO(coverImg) : null
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

    updateCoverImg(coverImg: File | null) {
        this._coverImg = coverImg ? new ImageVO(coverImg) : null
    }

    toggleStar() {
        this._isStarred = !this._isStarred
    }
}