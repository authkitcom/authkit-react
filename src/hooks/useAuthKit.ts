import * as React from "react";
import { getAuthKitContext } from '../AuthKitContext';

export const useAuthKit = () => React.useContext(getAuthKitContext());
