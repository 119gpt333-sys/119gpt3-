
import React from 'react';
import { Flame, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <Flame className="text-[#E31B23] mr-2" size={28} />
              <span className="text-xl font-black text-slate-900">서울소방<span className="text-[#E31B23]">GPT</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              서울소방GPT 인공지능 연구소는 최신 기술을 통해 시민의 안전을 지키고 소방관의 업무 효율을 극대화합니다.
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-bold mb-6">플랫폼</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-[#E31B23] transition-colors">연구 자료실</a></li>
              <li><a href="#" className="hover:text-[#E31B23] transition-colors">데이터 API</a></li>
              <li><a href="#" className="hover:text-[#E31B23] transition-colors">AI 분석 리포트</a></li>
              <li><a href="#" className="hover:text-[#E31B23] transition-colors">커뮤니티</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6">법적 고지</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-[#E31B23] transition-colors">개인정보 처리방침</a></li>
              <li><a href="#" className="hover:text-[#E31B23] transition-colors">이용 약관</a></li>
              <li><a href="#" className="hover:text-[#E31B23] transition-colors">저작권 안내</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6">연락처</h4>
            <ul className="flex space-x-6 text-slate-500">
              <li className="flex items-center">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:text-[#E31B23] transition-colors">
                  <Mail size={20} />
                </div>
              </li>
              <li className="flex items-center">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:text-[#E31B23] transition-colors">
                  <Phone size={20} />
                </div>
              </li>
              <li className="flex items-center">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:text-[#E31B23] transition-colors">
                  <MapPin size={20} />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-medium">
          <p>© 2024 Seoul Fire Service AI Lab. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-900">Twitter</a>
            <a href="#" className="hover:text-slate-900">GitHub</a>
            <a href="#" className="hover:text-slate-900">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
