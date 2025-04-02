import { useContext } from 'react';
import { FiguresContext } from '../contexts/FiguresContext';

export function useFigures() {
  const context = useContext(FiguresContext);
  if (!context) {
    throw new Error('Must be used within a FiguresProvider');
  }
  return context;
}
