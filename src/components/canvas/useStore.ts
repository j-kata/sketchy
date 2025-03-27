import { useContext } from 'react';
import { StorageContext } from './StorageContext';

export function useStore() {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('Must be used within a StorageProvider');
  }
  return context;
}
