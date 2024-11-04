export default class MemoryDB {
    private _storage: any[] = [
        { id: 'a4012065-4f2f-4a64-bba6-0deeec252896', name: 'Projeto 07', costumer: 'Clicksign', startDate: new Date(2000, 0), endDate: new Date(2001, 0), coverImg: null, isStarred: false },
        { id: '0c542257-9a95-4ad4-a8fd-4ff73edaa437', name: 'Projeto 01', costumer: 'Clicksign', startDate: new Date(2002, 0), endDate: new Date(2003, 0), coverImg: null, isStarred: true },
        { id: '90f98340-8bae-4e91-9d9e-2ced7b74e52d', name: 'Projeto 02', costumer: 'Clicksign', startDate: new Date(2006, 0), endDate: new Date(2007, 0), coverImg: null, isStarred: true },
        { id: 'a818bfae-57ee-4f3a-a0dc-f3d95491b048', name: 'Projeto 03', costumer: 'Clicksign', startDate: new Date(2006, 0), endDate: new Date(2008, 0), coverImg: null, isStarred: false },
        { id: 'a9cc9cf1-b299-4e57-a9da-7eaf8a3baad3', name: 'Projeto 04', costumer: 'Clicksign', startDate: new Date(2022, 0), endDate: new Date(2024, 0), coverImg: null, isStarred: true },
        { id: '0b713d3b-aa30-4781-bd69-7de60bc2d0bd', name: 'Projeto 05', costumer: 'Clicksign', startDate: new Date(2024, 0), endDate: new Date(2026, 0), coverImg: null, isStarred: false },
        { id: '828534f1-f96c-43a0-9fcc-3a9929227069', name: 'Projeto 06', costumer: 'Clicksign', startDate: new Date(2025, 0), endDate: new Date(2027, 0), coverImg: null, isStarred: false },
        { id: 'dd3e1110-a99f-42ba-b1d7-40f7d4534cae', name: 'Projeto 08', costumer: 'Clicksign', startDate: new Date(2026, 0), endDate: new Date(2028, 0), coverImg: null, isStarred: true },
        { id: '211797c0-7237-478f-8cdf-4c8fb7104e62', name: 'Projeto 09', costumer: 'Clicksign', startDate: new Date(2023, 0), endDate: new Date(2025, 0), coverImg: null, isStarred: false },
    ]

    get(id: string): any {
        return this._storage.find(item => item.id === id)
    }

    getAll(): any[] {
        return this._storage
    }

    update(id: string, data: any) {
        this._storage = this._storage.map(item => {
            if (item.id !== id) return item
            return { id, ...data }
        })
    }
    
    insert(data: any) {
        this._storage.push(data)
    }
    
    delete(id: string) {
        this._storage = this._storage.filter(item => item.id !== id)
    }
}