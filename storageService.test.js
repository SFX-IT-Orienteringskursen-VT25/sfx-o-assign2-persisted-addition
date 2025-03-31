import { StorageService } from './StorageService.js';

const mockStorage = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        removeItem: (key) => {
            delete store[key];
        },
    };
})();

describe('StorageService', () => {
    let storageService;

    beforeEach(() => {
        storageService = new StorageService(mockStorage);
    });

    afterEach(() => {
        mockStorage.removeItem('testKey');
    });

    it('should get an item from the storage', () => {
        mockStorage.setItem('testKey', JSON.stringify([1, 2, 3]));
    
        const result = storageService.getItem('testKey');
        
        expect(result).toEqual([1, 2, 3]);
      });

      it('should set an item in storage', () => {
        storageService.setItem('testKey', [1, 2, 3]);
    
        const result = mockStorage.getItem('testKey');
    
        expect(result).toBe(JSON.stringify([1, 2, 3]));
      });

      it('should remove an item from local storage', () => {
        mockStorage.setItem('testKey', JSON.stringify([1, 2, 3]));
    
        storageService.removeItem('testKey');
    
        const result = mockStorage.getItem('testKey');

        expect(result).toBeNull();
      });
});
