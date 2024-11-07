export default class MemoryDB {
    private _storage: any[] = []

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