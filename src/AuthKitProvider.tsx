import * as React from "react";
import { getAuthKitContext } from './AuthKitContext';
import {Optional} from "./Lang";
import {createAuthKitForDOM, IAuthentication, IAuthKit, ICreateParams} from "@authkitcom/core";

export interface IErrorProps {
  error: Error;
}

export interface IAuthKitProviderProps {
  authorize?: boolean;
  children: React.ReactNode | React.ReactNode[] | null;
  errorNode?: (props: IErrorProps) => JSX.Element;
  loadingNode?: React.ReactNode | null;
  createParams: ICreateParams;
  scope: string[];
}

interface IAuthKitState {
  error?: Error;
  authentication?: IAuthentication;
  authKit?: IAuthKit;
}

export const AuthKitProvider = (props: IAuthKitProviderProps) => {
  const [state, setState] = React.useState<IAuthKitState>({});
  const { createParams, children, scope } = props;

  const loadSecure = async () => {
    const authKit = createAuthKitForDOM(createParams);
    try {
      let authentication: Optional<IAuthentication>;
      if (props.authorize) {
        authentication = await authKit.authorize({
          scope: scope,
          redirectUri: window.location.origin
        });
      }
      setState({
        authKit,
        authentication
      });
    } catch (e) {
      setState({
        error: e,
      });
    }
  };

  React.useEffect(() => {
    (async () => {
      await loadSecure();
    })();
  }, []);

  if (state.error) {
    if (props.errorNode) {
      return <props.errorNode error={state.error} />;
    } else {
      return <p>Error: {state.error.message}</p>;
    }
  } else if (state.authKit && (state.authentication?.getTokens() || !props.authorize)) {
    const AuthKitContext = getAuthKitContext();
    return <AuthKitContext.Provider value={{ authKit: state.authKit, authentication: state.authentication }}>{children}</AuthKitContext.Provider>;
  } else {
    if (props.loadingNode) {
      return <div>{props.loadingNode}</div>;
    } else {
      return <p>Loading...</p>;
    }
  }
};
