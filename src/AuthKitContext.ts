import {IAuthentication, IAuthorizeParams} from '@authkitcom/core'
import * as React from 'react';

//TODO - loading states would be nice
export interface IAuthKitContextValue {
  //authKit: Optional<IAuthKit>,
  authorize?: (params?: IAuthorizeParams) => Promise<void>;
  authentication?:IAuthentication;
}

let authKitContext: React.Context<IAuthKitContextValue>

export function getAuthKitContext(): React.Context<IAuthKitContextValue> {
  if (!authKitContext) {
    authKitContext = React.createContext<IAuthKitContextValue>({
      authorize: undefined,
      authentication: undefined
    })
  }
  return authKitContext
}
