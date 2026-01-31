
import { Post } from './types';

export const PRIMARY_RED = '#E31B23';

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    category: 'RESEARCH',
    title: '서울시 밀집 지역 화재 확산 예측 AI 알고리즘 연구',
    excerpt: '공간 정보 데이터와 과거 화재 이력을 바탕으로 한 딥러닝 기반 확산 예측 모델의 성능 평가 및 현장 도입 제언.',
    content: '본 연구는 서울시의 고밀도 주거 지역에서의 화재 확산을 방지하기 위한 AI 모델을 제안합니다...',
    author: '서울소방본부 IT팀',
    date: '2024-05-15',
    imageUrl: 'https://picsum.photos/seed/fire1/800/400',
    tags: ['인공지능', '화재예측', '데이터분석']
  },
  {
    id: '2',
    category: 'NEWS',
    // Fix: Use double quotes to properly encapsulate the string containing nested single quotes
    title: "지능형 구조 로봇 '서울아이(Seoul-i)' 실전 배치 개시",
    excerpt: '붕괴 위험 지역 및 독성 가스 노출 현장에서 소방관의 안전을 확보하고 실시간 현장 정보를 송출하는 최첨단 구조 로봇.',
    content: '서울소방은 오늘부터 지능형 구조 로봇을 본격적으로 운용하기 시작했습니다...',
    author: '구조작업팀',
    date: '2024-05-10',
    imageUrl: 'https://picsum.photos/seed/robot/800/400',
    tags: ['구조로봇', '최첨단장비', '현장배치']
  },
  {
    id: '3',
    category: 'RESEARCH',
    title: '시각 지능 기반 연기 투과 시야 확보 알고리즘',
    excerpt: '짙은 연기 속에서도 사물을 식별하고 구조 대상자를 감지할 수 있는 열화상 결합 AI 기술 개발 보고서.',
    content: '연기는 소방관의 시야를 가리는 가장 큰 장애물 중 하나입니다...',
    author: '미래기술연구소',
    date: '2024-05-01',
    imageUrl: 'https://picsum.photos/seed/vision/800/400',
    tags: ['시각지능', '열화상', '구조기술']
  }
];
