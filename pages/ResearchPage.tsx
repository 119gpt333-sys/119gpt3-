
import React, { useState, useEffect } from 'react';
import { Post, View } from '../types';
import PostCard from '../components/PostCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface ResearchPageProps {
  onNavigate: (view: View, post?: Post, category?: string) => void;
  posts: Post[];
  activeFilter: string;
  setFilter: (category: string) => void;
}

const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigate, posts, activeFilter, setFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { label: '전체', value: 'ALL' },
    { label: '연구 논문', value: 'RESEARCH' },
    { label: '기술 뉴스', value: 'NEWS' },
    { label: '공지사항', value: 'NOTICE' },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeFilter === 'ALL' || post.category === activeFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <div className="bg-white pt-24 pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] font-black text-[#E31B23] uppercase tracking-[0.3em] mb-4">
            Research Repository
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-8">
            {activeFilter === 'NOTICE' ? '공지사항' : '연구 자료 아카이브'}
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="관심 있는 연구 주제나 키워드를 검색하세요..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`px-6 py-4 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                    activeFilter === cat.value 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
              <button className="p-4 bg-slate-50 text-slate-500 rounded-2xl hover:bg-slate-100">
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onClick={() => onNavigate(View.POST_DETAIL, post)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-slate-500 font-medium">다른 키워드로 검색하거나 필터를 변경해 보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchPage;
