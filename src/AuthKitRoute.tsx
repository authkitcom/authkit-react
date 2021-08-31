import * as React from 'react';
import { useAuthKit } from './hooks/useAuthKit';

export const AuthKitRoute = ({ children }: { children: React.ReactChild }) => {
  const { authKit, isAuthenticated } = useAuthKit({ required: true });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!isAuthenticated) {
      (async () => {
        try {
          const res = await authKit.authorize();
          if (res) {
            setLoading(false);
          }
        } catch (e) {
          setLoading(false);
          throw new Error(e);
        }
      })();
    } else {
      setLoading(false);
    }
  }, []);

  return <React.Fragment>{isAuthenticated && !loading && children}</React.Fragment>;
};
