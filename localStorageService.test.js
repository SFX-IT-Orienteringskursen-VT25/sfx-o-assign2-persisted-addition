const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  };
it ('should set item in local storage', () => {
    localStorageMock.setItem('2', 'python');
    expect(localStorageMock.setItem).toHaveBeenLastCalledWith('2','python');});
it ('should get item from local storage', () => {
    localStorageMock.getItem('2');
    expect(localStorageMock.getItem).toHaveBeenLastCalledWith('2');});
it ('should clear local storage', () => {   
    localStorageMock.clear();
    expect(localStorageMock.clear).toHaveBeenCalled();});
it('should return java', () => {
    localStorageMock.getItem('1');
    expect(localStorageMock.getItem).toHaveBeenLastCalledWith('1');});


  global.localStorage = localStorageMock;