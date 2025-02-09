import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import { useSelector } from 'react-redux';
import PrivateLayoutRouter from './PrivateLayoutRoute';

const AppRouter = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const storageAccess = JSON.parse(sessionStorage.getItem('access-token'));
  const fullAuth = isAuthenticated || storageAccess;
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<PrivateLayoutRouter isAuthed={fullAuth} />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Navigate to='dashboard' />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
