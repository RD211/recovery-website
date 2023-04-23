import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const session = await supabase.auth.getSession();
      console.log(session);
      if (session.data.session) {
        setAuthenticated(true);
        setLoading(false);
      } else {
        setLoading(false);
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return { authenticated, loading };
};
