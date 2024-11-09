import { Navigate, Route, Routes } from 'react-router-dom';

import { Locations } from '../components/Locations';
import { SingleLocation } from '../components/SingleLocation';

export const LocationsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Locations />} />
      <Route path="/:id" element={<SingleLocation />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
