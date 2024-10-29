import React from 'react';
import { Settings, Palette, Type } from 'lucide-react';

interface StyleCustomizerProps {
  onStyleChange: (styles: any) => void;
  currentStyles: any;
}

export const StyleCustomizer = ({ onStyleChange, currentStyles }: StyleCustomizerProps) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
          <Palette className="w-4 h-4" />
          <input
            type="color"
            value={currentStyles.primaryColor}
            onChange={(e) => onStyleChange({ ...currentStyles, primaryColor: e.target.value })}
            className="w-6 h-6"
          />
        </button>
        
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4" />
          <select
            value={currentStyles.fontFamily}
            onChange={(e) => onStyleChange({ ...currentStyles, fontFamily: e.target.value })}
            className="px-2 py-1 border rounded"
          >
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Poppins">Poppins</option>
          </select>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};