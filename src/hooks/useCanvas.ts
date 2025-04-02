import { useContext } from 'react';
import { CanvasContext } from '../contexts/CanvasContext';

export function useCanvas() {
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error('Must be used within a CanvasProvider');
  }
  return context;
}
