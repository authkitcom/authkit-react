import * as React from 'react';
import { useAuthKit } from './hooks/useAuthKit';

export const AuthKitRoute = ({ children }: { children: React.ReactChild }) => {
  const { isAuthenticated } = useAuthKit({ required: true });

  return <React.Fragment>{isAuthenticated() && children}</React.Fragment>;
};
