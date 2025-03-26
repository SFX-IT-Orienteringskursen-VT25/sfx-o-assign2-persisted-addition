const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  };
it ('should set item in local storage', () => {
    localStorageMock.setItem('key', 'value');
    expect(localStorageMock.setItem).toHaveBeenLastCalledWith('key', 'value');});
it ('should get item from local storage', () => {
    localStorageMock.getItem('key');
    expect(localStorageMock.getItem).toHaveBeenLastCalledWith('key');});
it ('should clear local storage', () => {   
    localStorageMock.clear();
    expect(localStorageMock.clear).toHaveBeenCalled();});


  global.localStorage = localStorageMock;