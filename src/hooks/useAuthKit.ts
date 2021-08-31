import { IAuthKit } from '@authkitcom/core';
import * as React from 'react';
import { getAuthKitContext, IAuthKitContextValue } from '../AuthKitContext';

interface IAuthKitHook {
  required?: boolean;
}

export const useAuthKit = (props?: IAuthKitHook): { authKit: IAuthKit; isAuthenticated: boolean } => {
  const { authKit } = React.useContext<IAuthKitContextValue>(getAuthKitContext());
  const [isAuthenticated, setIsAuthenticated] = React.useState(authKit?.getTokens() ? true : false);

  React.useEffect(() => {
    (async () => {
      if (authKit) {
        if (props?.required && !isAuthenticated) {
          try {
            await authKit.authorize();
            setIsAuthenticated(true);
          } catch (e) {
            throw new Error(e);
          }
        }
      } else {
        throw new Error('Make sure the AuthKit hook is only used in children of the AuthKit provider.');
      }
    })();
  }, [isAuthenticated]);

  return { authKit: authKit!, isAuthenticated };
};
