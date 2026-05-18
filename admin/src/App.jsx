import React, { useState, useEffect } from 'react';
import { supabase } from '@/firebase';
import Dashboard from '@/pages/Dashboard';
import LoginPage from '@/pages/LoginPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-warmCream">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto mb-4"></div>
          <p className="text-navy font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <Dashboard user={user} /> : <LoginPage />;
}

export default App;
