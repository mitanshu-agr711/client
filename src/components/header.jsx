import { useFileManager, FileManagerProvider } from '../context/AppContext.jsx';
import { useRef } from 'react';
import { Upload, FolderPlus, Folder, File, Check, X } from 'lucide-react';

function Header() {
  const { 
    currentFolder, 
    setCurrentFolder, 
    folders 
  } = useFileManager();
  
  const navigateUp = () => {
    if (currentFolder) {
      const parentFolder = folders.find(f => f.id === currentFolder)?.parent;
      setCurrentFolder(parentFolder);
    }
  };

  const getCurrentFolderName = () => {
    if (!currentFolder) return "Root";
    return folders.find(f => f.id === currentFolder)?.name || "Unknown Folder";
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">File Manager</h1>
      
      {/* Breadcrumb navigation */}
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <button 
          onClick={() => setCurrentFolder(null)} 
          className="hover:text-blue-600"
        >
          Home
        </button>
        
        {currentFolder && (
          <>
            <span className="mx-2">/</span>
            <button 
              onClick={navigateUp}
              className="hover:text-blue-600 flex items-center"
            >
              {getCurrentFolderName()}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Actions Component
function Actions() {
  const { 
    setFiles, 
    files, 
    currentFolder, 
    setUploadProgress, 
    setShowFolderInput 
  } = useFileManager();
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(null), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Add files to state
    const newFiles = selectedFiles.map(file => ({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      folder: currentFolder,
      uploadDate: new Date().toLocaleDateString()
    }));
    
    setFiles([...files, ...newFiles]);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button 
        onClick={() => fileInputRef.current.click()}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        <Upload size={18} className="mr-2" />
        Upload Files
      </button>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button 
        onClick={() => setShowFolderInput(true)}
        className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
      >
        <FolderPlus size={18} className="mr-2" />
        New Folder
      </button>
    </div>
  );
}

// FolderCreator Component
function FolderCreator() {
  const { 
    newFolderName, 
    setNewFolderName, 
    showFolderInput, 
    setShowFolderInput,
    folders,
    setFolders,
    currentFolder
  } = useFileManager();

  const createFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
        parent: currentFolder
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setShowFolderInput(false);
    }
  };

  if (!showFolderInput) return null;

  return (
    <div className="flex items-center mb-6 p-3 bg-gray-100 rounded-md">
      <Folder size={18} className="text-gray-500 mr-2" />
      <input
        type="text"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
        placeholder="Folder name"
        className="flex-grow px-2 py-1 border border-gray-300 rounded-md mr-2"
        autoFocus
      />
      <button 
        onClick={createFolder}
        className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        <Check size={16} />
      </button>
      <button 
        onClick={() => {
          setShowFolderInput(false);
          setNewFolderName('');
        }}
        className="p-1 ml-1 bg-gray-400 text-white rounded-md hover:bg-gray-500"
      >
        <X size={16} />
      </button>
    </div>
  );
}

// UploadProgress Component
function UploadProgress() {
  const { uploadProgress } = useFileManager();

  if (uploadProgress === null) return null;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Uploading...</span>
        <span>{uploadProgress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${uploadProgress}%` }}
        ></div>
      </div>
    </div>
  );
}

// FolderGrid Component
function FolderGrid() {
  const { folders, currentFolder, setCurrentFolder } = useFileManager();
  
  const filteredFolders = folders.filter(folder => folder.parent === currentFolder);
  
  if (filteredFolders.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Folders</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredFolders.map(folder => (
          <div 
            key={folder.id}
            onClick={() => setCurrentFolder(folder.id)}
            className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition flex flex-col items-center"
          >
            <Folder size={36} className="text-yellow-500 mb-2" />
            <span className="text-sm text-center truncate w-full">{folder.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// FileList Component
function FileList() {
  const { files, currentFolder } = useFileManager();
  
  const filteredFiles = files.filter(file => file.folder === currentFolder);
  
  if (filteredFiles.length === 0) return null;

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Files</h2>
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        {filteredFiles.map(file => (
          <div 
            key={file.id}
            className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-100 transition"
          >
            <File size={20} className="text-gray-500 mr-3" />
            <div className="flex-grow">
              <div className="font-medium text-gray-800">{file.name}</div>
              <div className="text-xs text-gray-500">
                {formatFileSize(file.size)} • {file.uploadDate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// EmptyState Component
function EmptyState() {
  const { files, folders, currentFolder } = useFileManager();
  
  const filteredFolders = folders.filter(folder => folder.parent === currentFolder);
  const filteredFiles = files.filter(file => file.folder === currentFolder);
  
  if (filteredFolders.length > 0 || filteredFiles.length > 0) return null;

  return (
    <div className="text-center py-12 text-gray-500">
      <Upload size={40} className="mx-auto mb-3 opacity-50" />
      <p>Upload files or create folders to get started</p>
    </div>
  );
}

// Main FileManager Component
export default function FileManager() {
  return (
    <FileManagerProvider>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <Header />
        <Actions />
        <FolderCreator />
        <UploadProgress />
        <FolderGrid />
        <FileList />
        <EmptyState />
      </div>
    </FileManagerProvider>
  );
}