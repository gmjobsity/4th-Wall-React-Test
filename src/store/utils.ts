import { useSelector } from 'react-redux';

export const useGetFromStore = (name: string) =>
  useSelector((state: Record<string, any>) => state[name]);
