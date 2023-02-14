import * as React from "react";
import { getAuthKitContext } from './AuthKitContext';
import {createAuthKitForDOM, IAuthentication, IAuthKit, IAuthorizeParams, ICreateParams} from "@authkitcom/core";
import {useCallback} from "react";

export interface IErrorProps {
  error: Error;
}

/**
 * redirectUri will default to window.location.origin if not provided
 */
export interface IAuthKitReactCreateParams extends ICreateParams {
  redirectUri?: string;
}

export interface IAuthKitProviderProps {
  authorizeOnMount?: boolean;
  children: React.ReactNode | React.ReactNode[] | null;
  errorNode?: (props: IErrorProps) => JSX.Element;
  loadingNode?: React.ReactNode | null;
  createParams: IAuthKitReactCreateParams;
  scope: string[];
}

interface IAuthKitState {
  error?: Error;
  authentication?: IAuthentication;
}

export const AuthKitProvider = ({
                                  authorizeOnMount,
                                  createParams,
                                  children,
                                  errorNode,
                                  loadingNode,
                                  scope}: IAuthKitProviderProps) => {

  const authKit = React.useRef<IAuthKit | null>(null);
  if(authKit.current === null) {
    authKit.current = createAuthKitForDOM(createParams);
  }

  const [state, setState] = React.useState<IAuthKitState>({});

  const redirectUri = createParams.redirectUri ?? window.location.origin;

  const defaultAuthorizeParams: IAuthorizeParams = {
    scope,
    redirectUri,
    mode: "redirect",
  };


  const authorize = useCallback(async (params?: IAuthorizeParams): Promise<void> => {
    try {
      const resp = await authKit.current?.authorize(params ?? defaultAuthorizeParams)
      if(resp) {
        setState((curState) => ({
          ...curState,
          authentication: resp,
        }));
      }
    } catch(e) {
      setState({
        error: e,
      })
    }
  }, [authKit.current, defaultAuthorizeParams]);

  const loadSecure = useCallback(async () => {
    try {
      const authorizeParams = defaultAuthorizeParams;
      if(!authorizeOnMount) {
        authorizeParams.mode = "silent";
      }
      await authorize(authorizeParams);
    } catch (e) {
      setState({
        error: e,
      });
    }
  }, [authorize]);

  React.useEffect(() => {
    if(authKit.current) {
      (async () => {
        await loadSecure();
      })();
    }
  }, [authKit]);

  if (state.error) {
    if (errorNode) {
      return errorNode({error: state.error});
    } else {
      return <p>Error: {state.error.message}</p>;
    }
  } else if (authKit.current && (state.authentication?.getTokens() || !authorizeOnMount)) {
    const AuthKitContext = getAuthKitContext();
    return <AuthKitContext.Provider value={{ authorize, authentication: state.authentication }}>{children}</AuthKitContext.Provider>;
  } else {
    if (loadingNode) {
      return <div>{loadingNode}</div>;
    } else {
      return <p>Loading...</p>;
    }
  }
};
