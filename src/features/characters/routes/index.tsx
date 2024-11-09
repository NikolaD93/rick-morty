import { Navigate, Route, Routes } from 'react-router-dom';

import { Characters } from '@/features/characters/components/Characters';

import { SingleCharacter } from '../components/SingleCharacter';

export const CharactersRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Characters />} />
      <Route path="/:id" element={<SingleCharacter />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
