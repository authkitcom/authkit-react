import { createAuthKit, IAuthKit, ICreateParams } from '@authkitcom/core';
import * as React from 'react';
import { getAuthKitContext } from './AuthKitContext';

export interface IErrorProps {
  error: Error;
}

export interface IAuthKitProviderProps {
  children: React.ReactNode | React.ReactNode[] | null;
  errorNode?: (props: IErrorProps) => JSX.Element;
  loadingNode?: React.ReactNode | null;
  createParams: ICreateParams;
  required?: boolean;
}

interface IAuthKitState {
  error?: Error;
  authKit?: IAuthKit;
}

export const AuthKitProvider = (props: IAuthKitProviderProps) => {
  const [state, setState] = React.useState<IAuthKitState>({});
  const { createParams, children } = props;

  const loadSecure = async () => {
    // TODO We can combine these back into one if we want
    if (state.authKit && props.required) {
      try {
        await state.authKit.authorize();
      } catch (e) {
        setState({
          error: e,
        });
      }
    }
  };

  const initAuthkit = () => {
    const authKit = createAuthKit(createParams);

    setState({
      authKit,
    });
  };

  React.useEffect(() => {
    initAuthkit();
  }, []);

  React.useEffect(() => {
    if (state.authKit) {
      (async () => await loadSecure())();
    }
  }, [state]);

  if (state.error) {
    if (props.errorNode) {
      return <props.errorNode error={state.error} />;
    } else {
      return <p>Error: {state.error.message}</p>;
    }
  } else if (state.authKit && (state.authKit!.getTokens() || !props.required)) {
    const AuthKitContext = getAuthKitContext();
    return <AuthKitContext.Provider value={{ authKit: state.authKit }}>{children}</AuthKitContext.Provider>;
  } else {
    if (props.loadingNode) {
      return <div>{props.loadingNode}</div>;
    } else {
      return <p>Loading...</p>;
    }
  }
};
