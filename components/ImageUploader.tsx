
import React, { useRef, useState } from 'react';
import { Upload, RotateCcw, Loader2, Check } from 'lucide-react';

interface ImageUploaderProps {
  imageUrl: string;
  onUpload: (base64: string) => void;
  onReset: () => void;
  label?: string;
  helperText?: string;
  aspectRatio?: 'video' | 'square' | 'auto';
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  imageUrl, 
  onUpload, 
  onReset, 
  label, 
  helperText,
  aspectRatio = 'video'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setShowSuccess(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        // Simulate a tiny delay for better UX "feel" of processing
        setTimeout(() => {
          const base64String = reader.result as string;
          onUpload(base64String);
          setIsUploading(false);
          setShowSuccess(true);
          
          // Hide success checkmark after 2 seconds
          setTimeout(() => setShowSuccess(false), 2000);
        }, 600);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const aspectClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    auto: 'h-48'
  }[aspectRatio];

  return (
    <div className="space-y-4">
      {label && <label className="block text-sm font-bold text-slate-500">{label}</label>}
      <div className={`relative ${aspectClass} rounded-3xl overflow-hidden bg-slate-100 group border border-slate-200`}>
        <img 
          src={imageUrl || 'https://images.unsplash.com/photo-1619623602162-81c83ecf1b5e?auto=format&fit=crop&q=80&w=1200&h=1200'} 
          className={`w-full h-full object-cover transition-all duration-500 ${isUploading ? 'blur-sm scale-105 opacity-50' : 'group-hover:scale-105'}`} 
          alt="Preview" 
        />
        
        {/* Default Hover Controls */}
        {!isUploading && !showSuccess && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 backdrop-blur-[2px]">
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-4 bg-white rounded-2xl text-slate-900 hover:scale-110 active:scale-95 transition-all shadow-xl"
              title="이미지 업로드"
            >
              <Upload size={24} />
            </button>
            <button 
              type="button"
              onClick={onReset}
              className="p-4 bg-white rounded-2xl text-[#E31B23] hover:scale-110 active:scale-95 transition-all shadow-xl"
              title="기본값으로 초기화"
            >
              <RotateCcw size={24} />
            </button>
          </div>
        )}

        {/* Loading Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center animate-in fade-in duration-300">
            <Loader2 className="text-[#E31B23] animate-spin mb-2" size={32} />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Processing...</span>
          </div>
        )}

        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center animate-in zoom-in-95 fade-in duration-300">
            <div className="bg-white p-4 rounded-full shadow-2xl animate-bounce">
              <Check className="text-green-500" size={32} strokeWidth={4} />
            </div>
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
      </div>
      {helperText && (
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
