import React, { useState } from 'react';
import { Editor } from './components/Editor';
import { ImageUpload } from './components/ImageUpload';
import { CustomizationPanel } from './components/CustomizationPanel';
import { Code, Rocket, Users, Settings } from 'lucide-react';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  const [contentImage, setContentImage] = useState('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  
  const [content, setContent] = useState({
    hero: '<h1 style="color: #ffffff;">Build Your Next Great Idea</h1><p style="color: #ffffff;">Launch faster with our intuitive platform</p>',
    features: '<h2>Powerful Features</h2><p>Everything you need to succeed</p>',
    imageSection: '<h2>Our Vision</h2><p>Building the future of web development</p>',
    about: '<h2>About Us</h2><p>We are passionate about helping businesses grow</p>',
  });

  const [styles, setStyles] = useState({
    hero: {
      backgroundColor: '#000000',
      opacity: 0.5,
      textColor: '#ffffff'
    },
    features: {
      backgroundColor: '#ffffff',
      opacity: 1,
      textColor: '#000000'
    },
    imageSection: {
      backgroundColor: '#f3f4f6',
      opacity: 1,
      textColor: '#000000'
    },
    about: {
      backgroundColor: '#f9fafb',
      opacity: 1,
      textColor: '#000000'
    }
  });

  const handleStyleChange = (section: string, newStyles: any) => {
    setStyles(prev => ({
      ...prev,
      [section]: newStyles
    }));
  };

  const handleImageUpload = (file: File, section: 'hero' | 'content') => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (section === 'hero') {
        setHeroImage(reader.result as string);
      } else {
        setContentImage(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {/* Customization Toggle Button */}
      <button
        onClick={() => setIsPanelOpen(true)}
        className="fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Customization Panel */}
      <CustomizationPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        currentStyles={styles}
        onStyleChange={handleStyleChange}
        onImageUpload={(file) => handleImageUpload(file, 'hero')}
      />

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: styles.hero.backgroundColor,
            opacity: styles.hero.opacity
          }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="prose prose-xl prose-invert">
              <Editor
                content={content.hero}
                onChange={(newContent) => setContent({ ...content, hero: newContent })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        className="py-20"
        style={{
          backgroundColor: styles.features.backgroundColor,
          opacity: styles.features.opacity
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Editor
              content={content.features}
              onChange={(newContent) => setContent({ ...content, features: newContent })}
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Code />, title: "Clean Code", desc: "Built with modern best practices" },
              { icon: <Rocket />, title: "Fast Performance", desc: "Optimized for speed" },
              { icon: <Users />, title: "Team Collaboration", desc: "Work together seamlessly" }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-blue-500">
                  {feature.icon}
                </div>
                <Editor
                  content={`<h3 class="text-xl font-bold mb-2">${feature.title}</h3><p class="text-gray-600">${feature.desc}</p>`}
                  onChange={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section 
        className="py-20"
        style={{
          backgroundColor: styles.imageSection.backgroundColor,
          opacity: styles.imageSection.opacity
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose">
              <Editor
                content={content.imageSection}
                onChange={(newContent) => setContent({ ...content, imageSection: newContent })}
              />
            </div>
            <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
              <ImageUpload
                currentImage={contentImage}
                onImageUpload={(file) => handleImageUpload(file, 'content')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        className="py-20"
        style={{
          backgroundColor: styles.about.backgroundColor,
          opacity: styles.about.opacity
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose max-w-none">
            <Editor
              content={content.about}
              onChange={(newContent) => setContent({ ...content, about: newContent })}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;