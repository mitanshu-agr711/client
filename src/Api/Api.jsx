
import axios from 'axios';

const BASE_URL = 'https://backendimage-rn9f.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

export const folderService = {
  getFolders: () => api.get('/folder/userFolder'),
  getFolderContents: (id) => api.get(`/folder/${id}`),
  createFolder: (data) => api.post('/folder/createFolder', data),
};

export const imageService = {
  getFolderImages: (folderId) => api.get(`/image/${folderId}`),
  uploadImage: (formData) =>
    api.post('/image/upImage', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  searchImages: (query) => api.get(`/image/search?query=${query}`),
};
