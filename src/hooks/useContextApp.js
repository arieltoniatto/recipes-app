import { useContext } from 'react';
import appContext from '../context/appContext';

const useContextApp = () => useContext(appContext);

export default useContextApp;
