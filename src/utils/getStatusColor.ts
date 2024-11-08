export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Alive':
      return 'bg-green-500';
    case 'Dead':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};
