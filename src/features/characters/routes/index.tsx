import { Navigate, Route, Routes } from 'react-router-dom';

import { Characters } from '@/features/characters/components/Characters';

export const CharactersRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Characters />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
