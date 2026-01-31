
import React, { useState } from 'react';
import { View, Post } from '../types';
import { Flame, Menu, X, Lock } from 'lucide-react';
import { PRIMARY_RED } from '../constants';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View, post?: Post, category?: string) => void;
  currentResearchFilter?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, currentResearchFilter }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: '홈', view: View.HOME, category: 'ALL' },
    { label: '연구 자료', view: View.RESEARCH, category: 'RESEARCH' },
    { label: '공지사항', view: View.RESEARCH, category: 'NOTICE' },
  ];

  const isItemActive = (item: typeof navItems[0]) => {
    if (currentView !== item.view) return false;
    if (item.view === View.RESEARCH) {
      return currentResearchFilter === item.category;
    }
    return true;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate(View.HOME)}
          >
            <Flame className="text-[#E31B23] mr-2 transition-transform group-hover:scale-110" size={32} />
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
                서울소방<span className="text-[#E31B23]">GPT</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                Seoul Fire AI Research
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view, undefined, item.category)}
                className={`text-sm font-semibold transition-colors hover:text-[#E31B23] ${
                  isItemActive(item) ? 'text-[#E31B23]' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => onNavigate(View.ADMIN)}
              className="flex items-center space-x-1 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#E31B23] transition-all"
            >
              <Lock size={14} />
              <span>관리자</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-900">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onNavigate(item.view, undefined, item.category);
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left text-lg font-bold py-2 ${
                isItemActive(item) ? 'text-[#E31B23]' : 'text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => {
              onNavigate(View.ADMIN);
              setIsMenuOpen(false);
            }}
            className="w-full flex justify-center items-center space-x-2 bg-[#E31B23] text-white py-4 rounded-xl font-bold"
          >
            <Lock size={18} />
            <span>관리자 대시보드</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
