import { NumberService } from "./NumberService";    
describe('NumberService', () => {

    let numberService;
    let localStorageMock;

    beforeEach(() => {
        localStorageMock = {
            store: {},
            getItem: jest.fn((key) =>{
                return localStorageMock.store[key] || null;

            }),
            setItem: jest.fn((key, value) => {
                localStorageMock.store[key] = value;
            }),
            clear: jest.fn(() => {
                localStorageMock.store = {};
            }),
        };
        numberService = new NumberService(localStorageMock);
    });

it('should load numbers and sum from localStorage', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([1, 2, 3]));    
    numberService = new NumberService(localStorageMock); // Re-initialize with mock
    expect(numberService.getNumbers()).toEqual([1, 2, 3]);  
    expect(numberService.getSum()).toBe(6);

});
it('should add a number and update sum', () => {
    numberService.addNumber(5);
    expect(numberService.getNumbers()).toEqual([5]);
    expect(numberService.getSum()).toBe(5);
});
it('should not add a non-integer number', () => {
    numberService.addNumber(5.5);
    expect(numberService.getNumbers()).toEqual([]);
    expect(numberService.getSum()).toBe(0);
});
it('should not add a non-number', () => {
    numberService.addNumber('string');
    expect(numberService.getNumbers()).toEqual([]);
    expect(numberService.getSum()).toBe(0);

});
it('sum should be positive', () => {
    numberService.addNumber(5);
    numberService.addNumber(-3);
    expect(numberService.getSum()).toBe(2);

});
it('should persist updated list when number is added', () => {
    numberService.addNumber(4);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('numbers', JSON.stringify([4]));
});

});