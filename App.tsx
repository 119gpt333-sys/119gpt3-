import React, { useState, useEffect } from 'react';
import { View, Post, SiteConfig } from './types';
import { MOCK_POSTS } from './constants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ResearchPage from './pages/ResearchPage';
import PostDetailPage from './pages/PostDetailPage';
import { MessageSquare } from 'lucide-react';
import AskAIModal from './components/AskAIModal';
import AdminPasswordModal from './components/AdminPasswordModal';

const DEFAULT_CONFIG: SiteConfig = {
  primaryColor: '#E31B23',
  siteName: '서울소방GPT',
  showHero: true,
  heroImageUrl: 'https://images.unsplash.com/photo-1619623602162-81c83ecf1b5e?auto=format&fit=crop&q=80&w=1200&h=1200'
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  // Initialize posts with error handling
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const savedPosts = localStorage.getItem('seoul_fire_posts');
      if (savedPosts) {
        return JSON.parse(savedPosts);
      }
    } catch (error) {
      console.error("Failed to load posts from storage:", error);
    }
    return MOCK_POSTS;
  });

  const [researchFilter, setResearchFilter] = useState('ALL');
  
  // Initialize config with error handling
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const savedConfig = localStorage.getItem('seoul_fire_config');
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        // Ensure new default image is used if it was the old default
        if (parsed.heroImageUrl === 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&q=80&w=1200&h=1200' || 
            parsed.heroImageUrl === 'https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?auto=format&fit=crop&q=80&w=1200&h=1200') {
          return DEFAULT_CONFIG;
        }
        return parsed;
      }
    } catch (error) {
      console.error("Failed to load config from storage:", error);
    }
    return DEFAULT_CONFIG;
  });

  // Sync config to LocalStorage
  useEffect(() => {
    localStorage.setItem('seoul_fire_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  // Sync posts to LocalStorage
  useEffect(() => {
    localStorage.setItem('seoul_fire_posts', JSON.stringify(posts));
  }, [posts]);

  const navigateTo = (view: View, post?: Post, category: string = 'ALL') => {
    if (view === View.ADMIN && !isAdminAuthenticated) {
      setIsAdminAuthModalOpen(true);
      return;
    }

    setCurrentView(view);
    if (post) setSelectedPost(post);
    if (view === View.RESEARCH) {
      setResearchFilter(category);
    }
    window.scrollTo(0, 0);
  };

  const handleAdminAuth = (success: boolean) => {
    if (success) {
      setIsAdminAuthenticated(true);
      setIsAdminAuthModalOpen(false);
      setCurrentView(View.ADMIN);
      window.scrollTo(0, 0);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <HomePage onNavigate={navigateTo} posts={posts.slice(0, 3)} config={siteConfig} />;
      case View.RESEARCH:
        return (
          <ResearchPage 
            onNavigate={navigateTo} 
            posts={posts} 
            activeFilter={researchFilter} 
            setFilter={setResearchFilter} 
          />
        );
      case View.ADMIN:
        return <AdminPage posts={posts} setPosts={setPosts} config={siteConfig} setConfig={setSiteConfig} />;
      case View.POST_DETAIL:
        return selectedPost ? <PostDetailPage post={selectedPost} onBack={() => navigateTo(View.RESEARCH, undefined, researchFilter)} /> : null;
      default:
        return <HomePage onNavigate={navigateTo} posts={posts.slice(0, 3)} config={siteConfig} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        currentView={currentView} 
        onNavigate={navigateTo} 
        currentResearchFilter={researchFilter}
      />
      
      <main className="flex-grow pt-20">
        {renderView()}
      </main>

      <Footer />

      {/* Floating AI Chat Button */}
      <button 
        onClick={() => setIsAIModalOpen(true)}
        className="fixed bottom-8 right-8 bg-[#E31B23] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 flex items-center justify-center"
        aria-label="Ask AI"
      >
        <MessageSquare size={24} />
      </button>

      {isAIModalOpen && <AskAIModal onClose={() => setIsAIModalOpen(false)} />}
      
      {isAdminAuthModalOpen && (
        <AdminPasswordModal 
          onClose={() => setIsAdminAuthModalOpen(false)} 
          onSuccess={() => handleAdminAuth(true)} 
        />
      )}
    </div>
  );
};

export default App;