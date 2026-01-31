
import React, { useState } from 'react';
import { X, Lock, ShieldAlert, ChevronRight } from 'lucide-react';

interface AdminPasswordModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AdminPasswordModal: React.FC<AdminPasswordModalProps> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1618') {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      ></div>
      
      <div className={`relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-200 ${error ? 'animate-shake' : ''}`}>
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          .animate-shake {
            animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both;
            animation-iteration-count: 2;
          }
        `}</style>

        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#E31B23]">
              <Lock size={24} />
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors">
              <X size={24} />
            </button>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-2">관리자 인증</h2>
          <p className="text-slate-500 font-medium mb-8">대시보드에 접근하려면 비밀번호를 입력하세요.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input 
                type="password" 
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-5 font-black text-center text-2xl tracking-[1em] focus:outline-none transition-all ${
                  error ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-[#E31B23] focus:bg-white'
                }`}
              />
              {error && (
                <div className="absolute -bottom-6 left-0 right-0 flex items-center justify-center text-red-500 text-[10px] font-black uppercase tracking-widest">
                  <ShieldAlert size={12} className="mr-1" /> 비밀번호가 일치하지 않습니다
                </div>
              )}
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black flex items-center justify-center group hover:bg-[#E31B23] transition-all shadow-xl"
            >
              <span>인증 및 입장</span>
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </form>
        </div>

        <div className="bg-slate-50 p-6 flex items-center justify-center border-t border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Authorized Personnel Only
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPasswordModal;
