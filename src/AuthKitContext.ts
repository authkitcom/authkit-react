import {IAuthentication, IAuthKit} from '@authkitcom/core'
import * as React from 'react';
import { Optional } from './Lang';

export interface IAuthKitContextValue {
  authKit: Optional<IAuthKit>,
  authentication: Optional<IAuthentication>
}

let authKitContext: React.Context<IAuthKitContextValue>

export function getAuthKitContext(): React.Context<IAuthKitContextValue> {
  if (!authKitContext) {
    authKitContext = React.createContext<IAuthKitContextValue>({
      authKit: undefined,
      authentication: undefined
    })
  }
  return authKitContext
}
