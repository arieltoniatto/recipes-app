import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultVAlue = null) => {
  const [value, setValue] = useState(() => {
    try {
      const salved = localStorage.getItem(key);
      if (salved !== null) {
        return JSON.parse(salved);
      }
      return defaultVAlue;
    } catch {
      return defaultVAlue;
    }
  });

  useEffect(() => {
    const rewValue = JSON.stringify(value);
    localStorage.setItem(key, rewValue);
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;

// setValue([...value, novoObj])

// const [qualquercoisa, setqualquercoisa] = useLocalStorage('DoneRecipes', []);
// const [qualqeiur, setasidjasdi] = useLocalStorage('Inprogress', {});
