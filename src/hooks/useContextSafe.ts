import { Context, useContext } from 'react';

export function useContextSafe<T>(contextType: Context<T>) {
  const context = useContext(contextType);
  if (!context) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
