import React from 'react';
import { Settings, Palette, Image, X } from 'lucide-react';

interface CustomizationPanelProps {
  onStyleChange: (section: string, styles: any) => void;
  currentStyles: {
    [key: string]: {
      backgroundColor: string;
      textColor: string;
      opacity: number;
    };
  };
  onImageUpload: (file: File) => void;
  onSecondaryImageUpload: (file: File) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizationPanel = ({
  onStyleChange,
  currentStyles,
  onImageUpload,
  onSecondaryImageUpload,
  isOpen,
  onClose
}: CustomizationPanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed right-4 top-4 bg-white rounded-lg shadow-xl p-6 w-80 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Page Customization</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Section Customization */}
      {Object.entries(currentStyles).map(([section, styles]) => (
        <div key={section} className="mb-6">
          <h4 className="text-sm font-medium mb-2 capitalize">{section} Section</h4>
          
          <div className="space-y-3">
            {/* Background Color */}
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <label className="text-sm">Background:</label>
              <input
                type="color"
                value={styles.backgroundColor}
                onChange={(e) => onStyleChange(section, {
                  ...styles,
                  backgroundColor: e.target.value
                })}
                className="w-8 h-8 cursor-pointer"
              />
            </div>

            {/* Background Opacity */}
            <div className="flex items-center gap-2">
              <label className="text-sm">Opacity:</label>
              <input
                type="range"
                min="0"
                max="100"
                value={styles.opacity * 100}
                onChange={(e) => onStyleChange(section, {
                  ...styles,
                  opacity: parseInt(e.target.value) / 100
                })}
                className="w-full"
              />
              <span className="text-sm w-8">{Math.round(styles.opacity * 100)}%</span>
            </div>

            {/* Image Upload for Hero Sections */}
            {(section === 'hero' || section === 'secondaryHero') && (
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                <label className="text-sm">Background Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (section === 'hero') {
                        onImageUpload(file);
                      } else {
                        onSecondaryImageUpload(file);
                      }
                    }
                  }}
                  className="text-sm"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};