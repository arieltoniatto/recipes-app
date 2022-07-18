export const mockFetch = (mockParam = '') => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
       json: () => Promise.resolve(mockParam)
      }));
  };

  export const mockCategories = (param) => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(param),
    }))
  }

  