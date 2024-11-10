export const getCharacterIds = (urls: string[]): string[] => {
  return urls.map((url) => url.split('/').pop() || '');
};
