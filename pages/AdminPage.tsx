
import React, { useState, useRef } from 'react';
import { Post, SiteConfig } from '../types';
import { LayoutDashboard, FileText, Settings, Plus, Trash2, Edit, Save, X, Image as ImageIcon, Upload, RotateCcw, Link as LinkIcon } from 'lucide-react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const postImageInputRef = useRef<HTMLInputElement>(null);

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

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setConfig(prev => ({ ...prev, heroImageUrl: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentEdit) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCurrentEdit({ ...currentEdit, imageUrl: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetHeroImage = () => {
    setConfig(prev => ({ 
      ...prev, 
      heroImageUrl: 'https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?auto=format&fit=crop&q=80&w=1200&h=1200' 
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
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'CONTENT' ? 'bg-[#E31B23] text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <FileText size={18} />
            <span>콘텐츠 관리</span>
          </button>
          <button 
            onClick={() => setActiveTab('SETTINGS')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'SETTINGS' ? 'bg-[#E31B23] text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Settings size={18} />
            <span>사이트 설정</span>
          </button>
        </nav>

        <div className="bg-slate-800 p-4 rounded-2xl">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Signed in as</div>
          <div className="text-sm font-bold truncate">SeoulFire_Admin_v2</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {activeTab === 'CONTENT' ? '콘텐츠 관리' : '사이트 설정'}
            </h1>
            <p className="text-slate-500 font-medium">서울소방GPT 플랫폼의 핵심 정보를 관리합니다.</p>
          </div>
          {activeTab === 'CONTENT' && !isEditing && (
            <button 
              onClick={startNew}
              className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#E31B23] transition-all shadow-lg"
            >
              <Plus size={18} />
              <span>새 연구 자료 등록</span>
            </button>
          )}
        </div>

        {activeTab === 'CONTENT' ? (
          isEditing && currentEdit ? (
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 max-w-4xl animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-slate-900">게시물 편집</h2>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-900"><X /></button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">제목</label>
                      <input 
                        type="text" 
                        value={currentEdit.title}
                        onChange={(e) => setCurrentEdit({...currentEdit, title: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">카테고리</label>
                        <select 
                          value={currentEdit.category}
                          onChange={(e) => setCurrentEdit({...currentEdit, category: e.target.value as any})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold focus:outline-none"
                        >
                          <option value="RESEARCH">연구 자료</option>
                          <option value="NEWS">기술 뉴스</option>
                          <option value="NOTICE">공지사항</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">작성일</label>
                        <input 
                          type="date" 
                          value={currentEdit.date}
                          onChange={(e) => setCurrentEdit({...currentEdit, date: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Post Image Field */}
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">대표 이미지</label>
                    <div className="relative group aspect-video bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                      {currentEdit.imageUrl ? (
                        <img src={currentEdit.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
                          <ImageIcon size={32} />
                          <span className="text-[10px] font-black">이미지 없음</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => postImageInputRef.current?.click()}
                          className="p-2 bg-white rounded-full text-slate-900 shadow-lg hover:scale-110 transition-transform"
                        >
                          <Upload size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                        <input 
                          type="text" 
                          placeholder="이미지 URL 입력..."
                          value={currentEdit.imageUrl || ''}
                          onChange={(e) => setCurrentEdit({...currentEdit, imageUrl: e.target.value})}
                          className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                      <input 
                        type="file" 
                        ref={postImageInputRef}
                        onChange={handlePostImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">요약문</label>
                  <textarea 
                    value={currentEdit.excerpt}
                    onChange={(e) => setCurrentEdit({...currentEdit, excerpt: e.target.value})}
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">본문 내용</label>
                  <textarea 
                    value={currentEdit.content}
                    onChange={(e) => setCurrentEdit({...currentEdit, content: e.target.value})}
                    rows={6}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="mt-10 flex space-x-4">
                <button 
                  onClick={savePost}
                  className="flex-grow bg-[#E31B23] text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-red-100 hover:scale-[1.01] transition-all"
                >
                  <Save size={18} />
                  <span>변경사항 저장하기</span>
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-8 bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                    <th className="px-8 py-6">이미지</th>
                    <th className="px-8 py-6">제목</th>
                    <th className="px-8 py-6">카테고리</th>
                    <th className="px-8 py-6">작성일</th>
                    <th className="px-8 py-6 text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {posts.map(post => (
                    <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-100">
                          {post.imageUrl ? (
                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-slate-300">
                              <ImageIcon size={16} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-900 max-w-xs truncate">{post.title}</div>
                        <div className="text-xs text-slate-400 font-medium">{post.author}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black tracking-widest ${
                          post.category === 'RESEARCH' ? 'bg-blue-50 text-blue-600' : 
                          post.category === 'NEWS' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-[#E31B23]'
                        }`}>
                          {post.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-500 font-bold">{post.date}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => startEdit(post)} className="p-2 text-slate-400 hover:text-blue-500 transition-colors"><Edit size={18}/></button>
                          <button onClick={() => handleDelete(post.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Branding Settings */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center">
                <Settings size={20} className="mr-2 text-[#E31B23]" />
                브랜딩 설정
              </h2>
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">플랫폼 메인 색상 (Fire Red)</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E31B23] border-4 border-white shadow-lg"></div>
                    <input type="text" value="#E31B23" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-black text-slate-900" disabled />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">SEO 메타 타이틀</label>
                  <input type="text" defaultValue="서울소방GPT - 서울소방 AI 연구 및 지식 공유 플랫폼" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 font-bold" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">사이트 공개 여부</label>
                   <div className="flex items-center space-x-2">
                     <div className="w-12 h-6 bg-green-500 rounded-full relative">
                       <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                     </div>
                     <span className="text-sm font-bold text-slate-900">현재 서비스 정상 작동 중</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Hero Image Management */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center">
                <ImageIcon size={20} className="mr-2 text-[#E31B23]" />
                메인 히어로 이미지 관리
              </h2>
              
              <div className="space-y-6">
                <div className="relative group rounded-3xl overflow-hidden aspect-video bg-slate-100 border border-slate-100">
                  <img 
                    src={config.heroImageUrl} 
                    alt="Current Hero" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-xs font-bold uppercase tracking-widest">현재 적용된 이미지</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleHeroImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center space-x-3 bg-slate-900 text-white py-5 rounded-2xl font-black hover:bg-[#E31B23] transition-all shadow-lg"
                  >
                    <Upload size={20} />
                    <span>새 이미지 업로드</span>
                  </button>
                  
                  <button 
                    onClick={resetHeroImage}
                    className="w-full flex items-center justify-center space-x-2 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                  >
                    <RotateCcw size={18} />
                    <span>기본 이미지로 초기화</span>
                  </button>
                </div>

                <p className="text-[10px] text-slate-400 font-bold leading-relaxed text-center px-4 uppercase tracking-tighter">
                  권장 해상도: 1200x1200px 이상 / JPG, PNG 파일 지원<br/>
                  브라우저 저장소(Local Storage)를 사용하여 즉시 반영됩니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
