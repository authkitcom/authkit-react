import * as React from 'react';
import { getAuthKitContext, IAuthKitContextValue } from '../AuthKitContext';

interface IAuthKitHook {
  required: boolean;
}

const useAuthKit = ({ required }: IAuthKitHook) => {
  const { authKit } = React.useContext<IAuthKitContextValue>(getAuthKitContext());

  const isAuthenticated = (): boolean => (authKit?.getUserinfo()?.sub ? true : false);

  React.useEffect(() => {
    if (authKit) {
      if (required && !isAuthenticated) {
        authKit.redirect();
      }
    } else {
      throw new Error('Make sure the AuthKit hook is only used in children of the AuthKit provider.');
    }
  }, []);

  return { ...authKit!, isAuthenticated };
};

export default useAuthKit;
