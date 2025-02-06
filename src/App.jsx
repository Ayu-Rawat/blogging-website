import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-[#c9d1d9]">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-4 border-[#58a6ff] border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col justify-between min-h-screen">
          <Header />
          <main className="flex-grow p-6">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;