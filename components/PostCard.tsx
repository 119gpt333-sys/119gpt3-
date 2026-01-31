
import React from 'react';
import { Post } from '../types';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-red-100 transition-all duration-500 cursor-pointer custom-shadow hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={post.imageUrl || 'https://picsum.photos/seed/fire/800/600'} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[#E31B23] uppercase tracking-widest shadow-sm">
          {post.category}
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex items-center space-x-4 mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <span className="flex items-center"><Calendar size={12} className="mr-1" /> {post.date}</span>
          <span className="flex items-center"><User size={12} className="mr-1" /> {post.author}</span>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight group-hover:text-[#E31B23] transition-colors">
          {post.title}
        </h3>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex space-x-2">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] bg-slate-50 text-slate-500 px-2 py-1 rounded-md border border-slate-100">
                #{tag}
              </span>
            ))}
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#E31B23] group-hover:text-white transition-all">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
