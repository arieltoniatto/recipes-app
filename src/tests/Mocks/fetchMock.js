const mockFetch = (mockParam = '') => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
       json: () => Promise.resolve(mockParam),
      }));
  };
  
  beforeEach(mockFetch);
      afterEach(() => jest.clearAllMocks());