import { useState } from 'react';

function useLocalStorage(keys) {
  const [objLocal, setObjLocal] = useState({});

  const newObjLocal = keys.reducer((acc, key) => {
    const keyValue = localStorage
      .getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];

    acc = {
      ...acc,
      [key]: keyValue,
    };
  }, {});
}

export default useLocalStorage;
