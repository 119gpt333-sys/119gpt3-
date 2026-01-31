
import React, { useState } from 'react';
import { Post, SiteConfig } from '../types';
import { FileText, Settings, Plus, Trash2, Edit, Save, X, ExternalLink } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';

interface AdminPageProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
}

const AdminPage: React.FC<AdminPageProps> = ({ posts, setPosts, config, setConfig }) => {
  const [activeTab, setActiveTab] = useState<'CONTENT' | 'SETTINGS'>('CONTENT');
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<Partial<Post> | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('정말 이 게시물을 삭제하시겠습니까?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const startEdit = (post: Post) => {
    setCurrentEdit(post);
    setIsEditing(true);
  };

  const startNew = () => {
    setCurrentEdit({
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      excerpt: '',
      content: '',
      category: 'RESEARCH',
      author: '관리자',
      date: new Date().toISOString().split('T')[0],
      imageUrl: '',
      tags: [],
    });
    setIsEditing(true);
  };

  const savePost = () => {
    if (!currentEdit) return;
    const postToSave = currentEdit as Post;
    const exists = posts.find(p => p.id === postToSave.id);
    if (exists) {
      setPosts(posts.map(p => p.id === postToSave.id ? postToSave : p));
    } else {
      setPosts([postToSave, ...posts]);
    }
    setIsEditing(false);
    setCurrentEdit(null);
  };

  const handleHeroImageUpload = (base64: string) => {
    setConfig(prev => ({ ...prev, heroImageUrl: base64 }));
  };

  const resetHeroImage = () => {
    setConfig(prev => ({ 
      ...prev, 
      heroImageUrl: 'https://images.unsplash.com/photo-1619623602162-81c83ecf1b5e?auto=format&fit=crop&q=80&w=1200&h=1200' 
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 space-y-8">
        <div className="flex items-center space-x-2 px-2">
          <div className="w-8 h-8 bg-[#E31B23] rounded-lg"></div>
          <span className="font-black text-xl">Admin</span>
        </div>
        
        <nav className="flex-grow space-y-2">
          <button 
            onClick={() => setActiveTab('CONTENT')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'CONTENT' ? 'bg-[#E31B23] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <FileText size={20} />
            <span className="font-bold">콘텐츠 관리</span>
          </button>
          <button 
            onClick={() => setActiveTab('SETTINGS')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'SETTINGS' ? 'bg-[#E31B23] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Settings size={20} />
            <span className="font-bold">사이트 설정</span>
          </button>
        </nav>

        <div className="px-4 py-4 bg-white/5 rounded-2xl">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold">System Online</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 overflow-y-auto">
        {activeTab === 'CONTENT' ? (
          <div>
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-black text-slate-900">콘텐츠 관리</h1>
              <button 
                onClick={startNew}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-[#E31B23] transition-all"
              >
                <Plus size={20} />
                <span>새 게시물 추가</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-red-200 transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <img src={post.imageUrl || 'https://picsum.photos/seed/thumb/100/100'} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-[#E31B23] uppercase mb-1">{post.category}</div>
                      <h3 className="font-bold text-slate-900 group-hover:text-[#E31B23] transition-colors">{post.title}</h3>
                      <div className="text-xs text-slate-400 font-medium">{post.date} • {post.author}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => startEdit(post)}
                      className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-3 text-slate-400 hover:text-[#E31B23] hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black text-slate-900 mb-10">사이트 설정</h1>
            
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
                <h3 className="font-black text-slate-900 text-xl">메인 히어로 설정</h3>
                
                <ImageUploader 
                  label="히어로 이미지"
                  imageUrl={config.heroImageUrl}
                  onUpload={handleHeroImageUpload}
                  onReset={resetHeroImage}
                  helperText="배포 시 소방관 중심의 이미지를 권장합니다."
                />

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-500">사이트 이름</label>
                  <input 
                    type="text" 
                    value={config.siteName}
                    onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-3xl text-white">
                <h3 className="font-black text-xl mb-4">데이터 관리</h3>
                <p className="text-slate-400 text-sm mb-6 font-medium">현재 모든 데이터는 로컬 스토리지에 저장되어 있습니다. 서버와 동기화하려면 데이터베이스 연결이 필요합니다.</p>
                <button className="w-full py-4 bg-white/10 rounded-2xl font-bold hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center space-x-2">
                  <ExternalLink size={18} />
                  <span>Cloud DB 연결 가이드</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsEditing(false)}></div>
          <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col h-[80vh] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-900">게시물 편집</h2>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-900">
                <X size={28} />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest">제목</label>
                  <input 
                    type="text" 
                    value={currentEdit?.title}
                    onChange={(e) => setCurrentEdit({...currentEdit!, title: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest">카테고리</label>
                  <select 
                    value={currentEdit?.category}
                    onChange={(e) => setCurrentEdit({...currentEdit!, category: e.target.value as any})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-red-500 outline-none"
                  >
                    <option value="RESEARCH">연구 자료</option>
                    <option value="NEWS">기술 뉴스</option>
                    <option value="NOTICE">공지사항</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest">요약문</label>
                <textarea 
                  rows={2}
                  value={currentEdit?.excerpt}
                  onChange={(e) => setCurrentEdit({...currentEdit!, excerpt: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-red-500 outline-none resize-none"
                />
              </div>

              <div className="space-y-8">
                <ImageUploader 
                  label="게시물 대표 이미지"
                  imageUrl={currentEdit?.imageUrl || ''}
                  onUpload={(base64) => setCurrentEdit({...currentEdit!, imageUrl: base64})}
                  onReset={() => setCurrentEdit({...currentEdit!, imageUrl: ''})}
                  aspectRatio="video"
                />

                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest">본문 내용</label>
                  <textarea 
                    rows={6}
                    value={currentEdit?.content}
                    onChange={(e) => setCurrentEdit({...currentEdit!, content: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 flex justify-end space-x-4">
              <button 
                onClick={() => setIsEditing(false)}
                className="px-8 py-4 font-bold text-slate-500 hover:text-slate-900 transition-all"
              >
                취소
              </button>
              <button 
                onClick={savePost}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-[#E31B23] transition-all flex items-center space-x-2"
              >
                <Save size={20} />
                <span>변경사항 저장</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
