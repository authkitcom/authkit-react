import * as React from 'react';
import useAuthKit from './hooks/useAuthkit';

const AuthKitRoute = ({ children }: { children: React.ReactChild }) => {
  const { isAuthenticated } = useAuthKit({ required: true });

  return <div>{isAuthenticated() && children}</div>;
};

export default AuthKitRoute;
