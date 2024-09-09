import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';  // <--- Important!

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
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-col content-between bg-gray-900'>
      <div className='w-full block'>
        <Header />
        <main className='mb-auto flex-grow'>
          {/* <Outlet /> will render the child components */}
          <Outlet />  
        </main>
        <Footer />
      </div>
    </div>
  ) : (null);
}

export default App;
