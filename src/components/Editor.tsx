import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { Palette, Type } from 'lucide-react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const Editor = ({ content, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  const setFontFamily = (font: string) => {
    editor
      .chain()
      .focus()
      .setMark('textStyle', { fontFamily: font })
      .run();
  };

  return (
    <div className="relative group">
      <div className="prose max-w-none w-full">
        <EditorContent editor={editor} />
      </div>
      
      {/* Styling toolbar - appears on selection */}
      <div className="absolute -top-12 left-0 hidden group-focus-within:flex items-center gap-2 bg-white rounded-lg shadow-lg p-2">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          <input
            type="color"
            onChange={(e) => setColor(e.target.value)}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4" />
          <select
            onChange={(e) => setFontFamily(e.target.value)}
            className="px-2 py-1 border rounded text-sm"
          >
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Poppins">Poppins</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>
      </div>
    </div>
  );
};