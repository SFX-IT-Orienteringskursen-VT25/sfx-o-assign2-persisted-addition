export class StorageService {
    constructor(storage = localStorage) {
        this.storage = storage;
    }

    getItem(key) {
        return JSON.parse(this.storage.getItem(key)) || [];
    }

    setItem(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    }

    removeItem(key) {
        this.storage.removeItem(key);
    }
}
