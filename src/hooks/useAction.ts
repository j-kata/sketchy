import { useContext } from 'react';
import { ActionContext } from '../contexts/ActionContext';

export function useAction() {
  const context = useContext(ActionContext);

  if (!context) {
    throw new Error('Must be used within a ActionProvider');
  }

  return context;
}
