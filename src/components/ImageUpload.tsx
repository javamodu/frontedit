import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (image: string) => void;
  currentImage: string;
}

export const ImageUpload = ({ onImageUpload, currentImage }: ImageUploadProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group">
      <img
        src={currentImage || "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
        alt="Uploadable section"
        className="w-full h-full object-cover"
      />
      <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
        <Upload className="w-8 h-8 text-white" />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
};