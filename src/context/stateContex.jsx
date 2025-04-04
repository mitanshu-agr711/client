import React, { useState } from 'react';
import { folderService, imageService } from '../Api/Api.jsx';
import { FileManagerContext } from './AppContext'; 

export const FileManagerProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [images, setImages] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRootFolders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await folderService.getFolders();
      const rootFolders = response.data.filter(folder => !folder.parent);
      setFolders(rootFolders);
      setCurrentFolder(null);
      return rootFolders;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch folders');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getSubfolders = async (folderId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await folderService.getFolderContents(folderId);
      setFolders(response.data.subfolders);
      setCurrentFolder(response.data.folder);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch folder contents');
      return { folder: null, subfolders: [] };
    } finally {
      setLoading(false);
    }
  };

  const createFolder = async (folderData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await folderService.createFolder(folderData);
      folderData.parent
        ? await getSubfolders(folderData.parent)
        : await getRootFolders();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create folder');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getFolderImages = async (folderId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await imageService.getFolderImages(folderId);
      setImages(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch images');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (imageData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await imageService.uploadImage(imageData);
      await getFolderImages(imageData.folder);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload image');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchImages = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const response = await imageService.searchImages(query);
      setSearchResults(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to search images');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <FileManagerContext.Provider
      value={{
        folders,
        currentFolder,
        images,
        searchResults,
        loading,
        error,
        getRootFolders,
        getSubfolders,
        createFolder,
        getFolderImages,
        uploadImage,
        searchImages,
        setCurrentFolder,
      }}
    >
      {children}
    </FileManagerContext.Provider>
  );
};
