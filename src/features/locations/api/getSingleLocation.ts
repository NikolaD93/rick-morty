import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { VITE_BACKEND_API } from '@/config';
import { Location } from '@/types/location';

export const useLocation = (locationId: number): UseQueryResult<Location> => {
  const fethcLocation = () =>
    axios.get<Location>(`${VITE_BACKEND_API}/location/${locationId}`).then((res) => res.data);

  return useQuery<Location>({
    queryKey: ['location', locationId],
    queryFn: fethcLocation,
    enabled: !!locationId,
  });
};
