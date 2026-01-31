
export interface Post {
  id: string;
  category: 'RESEARCH' | 'NEWS' | 'NOTICE';
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  tags: string[];
}

export interface SiteConfig {
  primaryColor: string;
  siteName: string;
  showHero: boolean;
  heroImageUrl: string;
}

export enum View {
  HOME = 'home',
  RESEARCH = 'research',
  ADMIN = 'admin',
  POST_DETAIL = 'post_detail'
}
