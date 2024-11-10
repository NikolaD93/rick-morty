import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from '../components/Login';
import { Register } from '../components/Register';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
