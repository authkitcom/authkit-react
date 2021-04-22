import { Tokens } from '@authkitcom/core'
import * as React from 'react';
import { getAuthKitContext, IAuthKitContextValue } from './AuthKitContext';
import { Optional } from './Lang';

export function getTokens(): Optional<Tokens> {
  const ctx = React.useContext<IAuthKitContextValue>(getAuthKitContext());
  return ctx.authKit!.getTokens()
}
