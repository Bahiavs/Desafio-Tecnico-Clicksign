export default class MemoryDB {
    private _storage: any[] = [
        { id: crypto.randomUUID(), name: 'Projeto 07', costumer: 'Clicksign', startDate: new Date(2000, 0), endDate: new Date(2001, 0), coverUrl: new File([''], 'file.png'), isStarred: false },
        { id: crypto.randomUUID(), name: 'Projeto 01', costumer: 'Clicksign', startDate: new Date(2002, 0), endDate: new Date(2003, 0), coverUrl: new File([''], 'file.png'), isStarred: true },
        { id: crypto.randomUUID(), name: 'Projeto 02', costumer: 'Clicksign', startDate: new Date(2006, 0), endDate: new Date(2007, 0), coverUrl: new File([''], 'file.png'), isStarred: true },
        { id: crypto.randomUUID(), name: 'Projeto 03', costumer: 'Clicksign', startDate: new Date(2006, 0), endDate: new Date(2008, 0), coverUrl: new File([''], 'file.png'), isStarred: false },
        { id: crypto.randomUUID(), name: 'Projeto 04', costumer: 'Clicksign', startDate: new Date(2022, 0), endDate: new Date(2024, 0), coverUrl: new File([''], 'file.png'), isStarred: true },
        { id: crypto.randomUUID(), name: 'Projeto 05', costumer: 'Clicksign', startDate: new Date(2024, 0), endDate: new Date(2026, 0), coverUrl: new File([''], 'file.png'), isStarred: false },
        { id: crypto.randomUUID(), name: 'Projeto 06', costumer: 'Clicksign', startDate: new Date(2025, 0), endDate: new Date(2027, 0), coverUrl: new File([''], 'file.png'), isStarred: false },
        { id: crypto.randomUUID(), name: 'Projeto 08', costumer: 'Clicksign', startDate: new Date(2026, 0), endDate: new Date(2028, 0), coverUrl: new File([''], 'file.png'), isStarred: true },
        { id: crypto.randomUUID(), name: 'Projeto 09', costumer: 'Clicksign', startDate: new Date(2023, 0), endDate: new Date(2025, 0), coverUrl: new File([''], 'file.png'), isStarred: false },
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