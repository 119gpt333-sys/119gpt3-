
import React from 'react';
import { View, Post, SiteConfig } from '../types';
import PostCard from '../components/PostCard';
import { ArrowRight, Library, Sparkles, Database } from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: View, post?: Post) => void;
  posts: Post[];
  config: SiteConfig;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, posts, config }) => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-20">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-red-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Compact Floating Notion AI Banner (Upper Position) - Linked */}
          <div className="flex justify-center mb-12">
            <a 
              href="https://ryan-chat.notion.site/GPT-e0f26096a77f47978e1d2f6a47add277?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-slate-900 rounded-full p-[1px] shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-red-100 max-w-2xl w-full block"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E31B23] to-red-400 rounded-full blur opacity-10 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-slate-900 rounded-full px-6 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#E31B23] p-1.5 rounded-full text-white">
                    <Sparkles size={14} />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
                    <span className="text-white text-sm font-black tracking-tight whitespace-nowrap">노션 AI 자료 수집</span>
                    <span className="hidden md:block w-[1px] h-3 bg-slate-700"></span>
                    <span className="text-slate-400 text-xs font-bold truncate max-w-[200px] md:max-w-none">전문 지식 데이터의 지능형 체계화</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-white group-hover:text-[#E31B23] transition-colors flex items-center space-x-1">
                  <span className="text-[10px] font-black uppercase tracking-widest">Enter</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                AI로 미래의<br/>
                <span className="text-[#E31B23]">소방 안전</span>을<br/>
                앞당깁니다
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg mb-12">
                서울소방GPT의 데이터를 기반으로 한 연구 자료와 최신 인공지능 알고리즘을 공유하는 지식 플랫폼입니다.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={() => onNavigate(View.RESEARCH)}
                  className="bg-[#E31B23] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-red-200 transition-all flex items-center justify-center group"
                >
                  연구 자료실 탐색
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  className="bg-white border-2 border-slate-100 text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center"
                >
                  기술 문의하기
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100">
                <img 
                  src={config.heroImageUrl} 
                  alt="Seoul Firefighter Hero" 
                  className="w-full h-full object-cover aspect-square transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div>
              <div className="text-[10px] font-black text-[#E31B23] uppercase tracking-[0.3em] mb-4">
                Latest Insights
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                최신 연구 및 기술 동향
              </h2>
            </div>
            <button 
              onClick={() => onNavigate(View.RESEARCH)}
              className="group flex items-center text-slate-900 font-black text-sm uppercase tracking-widest hover:text-[#E31B23] transition-colors"
            >
              모든 자료 보기 <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onClick={() => onNavigate(View.POST_DETAIL, post)} 
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
