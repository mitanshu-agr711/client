import { useContext } from 'react';
import { FileManagerContext } from './AppContext';

export function useFileManager() {
  const context = useContext(FileManagerContext);
  if (!context) {
    throw new Error('useFileManager must be used within a FileManagerProvider');
  }
  return context;
}
