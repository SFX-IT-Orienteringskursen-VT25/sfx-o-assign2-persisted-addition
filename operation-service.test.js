import Operation from "./operation-service";

describe("Operation service", () => {
    let operation;

    beforeEach(() => {
        operation = new Operation();
        global.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
        };
    });

    it('should calculate sum', () => {
        expect(operation.calculateSum([1, 2, 3])).toEqual(6);
    });

    it('should store numbers to storage', () => {
        operation.setLocalStorage([1, 2, 3])
        expect(localStorage.setItem).toHaveBeenCalledWith("numbers", JSON.stringify([1, 2, 3]));
    });

    it('should return numbers from storage', () => {
        localStorage.getItem.mockReturnValue(JSON.stringify([1, 2, 3]));

        expect(operation.getLocalStorage()).toEqual([1, 2, 3]);
        expect(localStorage.getItem).toHaveBeenCalledWith('numbers');
    });
})