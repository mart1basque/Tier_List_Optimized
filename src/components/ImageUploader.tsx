import React, { useRef, useState } from 'react';
import { Upload, Plus, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Character } from '../types/types';

interface ImageUploaderProps {
  onImageUploaded: (character: Character) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded }) => {
  const { themeColors } = useTheme();
  const [dragActive, setDragActive] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };
  
  const handleSubmit = () => {
    if (previewImage && characterName.trim()) {
      const newCharacter: Character = {
        id: `custom-${Date.now()}`,
        name: characterName,
        image: previewImage,
        universe: 'custom',
      };
      
      onImageUploaded(newCharacter);
      setPreviewImage(null);
      setCharacterName('');
    }
  };
  
  const handleCancel = () => {
    setPreviewImage(null);
    setCharacterName('');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h3 className="font-medium mb-4" style={{ color: themeColors.text }}>
        Add Custom Character
      </h3>
      
      {previewImage ? (
        <div className="mb-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-200">
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" draggable={false} />
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1" style={{ color: themeColors.text }}>
                Character Name
              </label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter character name"
                autoFocus
              />
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-md text-white"
              style={{ backgroundColor: themeColors.primary }}
              disabled={!characterName.trim()}
            >
              <Plus size={16} className="inline mr-1" />
              Add to Tier List
            </button>
            
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-md border"
            >
              <X size={16} className="inline mr-1" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${
            dragActive ? 'border-gray-400 bg-gray-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <Upload
            className="mx-auto mb-2"
            size={24}
            style={{ color: themeColors.primary }}
          />
          <p className="mb-2 text-sm" style={{ color: themeColors.text }}>
            Drag & drop an image, or <span
              className="cursor-pointer font-medium"
              style={{ color: themeColors.primary }}
              onClick={() => fileInputRef.current?.click()}
            >browse</span>
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG or GIF up to 5MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;