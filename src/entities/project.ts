export default class Project {
    constructor(readonly id: string,
        private _name: string,
        private _costumer: string,
        private _startDate: Date,
        private _endDate: Date,
        private _coverUrl: File,
        private _isStarred: boolean,
    ) { }

    getName() { return this._name }

    getCostumer() { return this._costumer }

    getStartDate() { return this._startDate }

    getEndDate() { return this._endDate }

    getCoverUrl() { return this._coverUrl }

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

    updateCoverUrl(coverUrl: File) {
        this._coverUrl = coverUrl
    }
    
    updateIsStarred(isStarred: boolean) {
        this._isStarred = isStarred
    }
}