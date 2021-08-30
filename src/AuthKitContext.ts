import { IAuthKit } from '@authkitcom/core';
import * as React from 'react';
import { Optional } from './Lang';

export interface IAuthKitContextValue {
  authKit: Optional<IAuthKit>;
}

let authLogicContext: React.Context<IAuthKitContextValue>;

export function getAuthKitContext(): React.Context<IAuthKitContextValue> {
  if (!authLogicContext) {
    authLogicContext = React.createContext<IAuthKitContextValue>({
      authKit: undefined,
    });
  }
  return authLogicContext;
}
