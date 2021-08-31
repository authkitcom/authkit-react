import { useContext } from 'react';
import { getAuthKitContext } from '../AuthKitContext';

export const useAuthKit = () => useContext(getAuthKitContext());
