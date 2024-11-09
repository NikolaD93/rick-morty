import { Navigate, Route, Routes } from 'react-router-dom';

import { Episodes } from '../components/Episodes';
import { SingleEpisode } from '../components/SingleEpisode';

export const EpisodesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Episodes />} />
      <Route path="/:id" element={<SingleEpisode />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
