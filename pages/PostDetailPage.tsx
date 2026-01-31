
import React from 'react';
import { Post } from '../types';
import { ArrowLeft, Calendar, User, Share2, Printer, Download } from 'lucide-react';

interface PostDetailPageProps {
  post: Post;
  onBack: () => void;
}

const PostDetailPage: React.FC<PostDetailPageProps> = ({ post, onBack }) => {
  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 font-bold text-sm mb-12 hover:text-[#E31B23] transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> 목록으로 돌아가기
        </button>

        <div className="mb-12">
          <div className="inline-block bg-red-50 text-[#E31B23] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight mb-8">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 border-b border-slate-100 pb-12">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black">
                {post.author[0]}
              </div>
              <div>
                <div className="text-sm font-black text-slate-900">{post.author}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">연구위원</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <Calendar size={16} />
              <span className="text-sm font-bold">{post.date}</span>
            </div>
            <div className="flex-grow"></div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Share2 size={20}/></button>
              <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Printer size={20}/></button>
              <button className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-[#E31B23] transition-colors">
                <Download size={18} />
                <span>PDF 다운로드</span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative h-[500px] rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
          <img 
            src={post.imageUrl || 'https://picsum.photos/seed/fire-detail/1200/800'} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-xl text-slate-600 font-bold leading-relaxed mb-10 italic border-l-4 border-red-500 pl-6">
            {post.excerpt}
          </p>
          
          <div className="text-lg text-slate-700 leading-loose space-y-8 font-medium">
            <p>
              인공지능 기술은 현대 소방 작전의 패러다임을 변화시키고 있습니다. 서울소방GPT는 지난 3년간 축적된 수백만 건의 출동 데이터를 정제하여 화재 패턴 분석 모델을 고도화해 왔습니다. 본 리포트에서는 해당 모델이 실제 현장에서 거둔 성과와 향후 개선 방향에 대해 심도 있게 다룹니다.
            </p>
            
            <h3 className="text-2xl font-black text-slate-900 pt-8">1. 데이터 수집 및 정제 과정</h3>
            <p>
              분석의 첫 단계는 비정형 데이터인 무선 통신 내용과 정형 데이터인 출동 기록을 통합하는 과정입니다. 자연어 처리(NLP) 엔진은 급박한 현장 상황에서 발생한 오타나 생략된 단어를 복원하며, 이를 통해 정확한 화재 위치와 규모를 사전에 파악할 수 있는 기초 데이터를 생성합니다.
            </p>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 my-12">
              <h4 className="text-sm font-black text-[#E31B23] uppercase tracking-widest mb-4">Key Finding</h4>
              <p className="text-slate-900 font-bold text-lg mb-0">
                "AI 기반 골든타임 확보율이 기존 방식 대비 12.4% 향상되었으며, 이는 연간 약 450건의 추가 생명 구조 가능성을 시사합니다."
              </p>
            </div>

            <h3 className="text-2xl font-black text-slate-900 pt-8">2. 현장 도입 및 피드백 루프</h3>
            <p>
              개발된 모델은 일선 소방서에 배포된 태블릿 기기를 통해 실시간 정보를 제공합니다. 현장 지휘관은 인공지능이 제안하는 최적 진입 경로와 붕괴 위험도를 참고하여 보다 안전하고 신속한 의사결정을 내릴 수 있습니다.
            </p>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-slate-100 flex flex-wrap gap-3">
          {post.tags.map(tag => (
            <span key={tag} className="bg-slate-50 text-slate-500 px-4 py-2 rounded-xl text-xs font-bold border border-slate-100 hover:bg-red-50 hover:text-[#E31B23] transition-all cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
