
import { createContext, useContext } from 'react';

export const FileManagerContext = createContext();

export const useFileManager = () => useContext(FileManagerContext);
