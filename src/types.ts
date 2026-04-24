export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  views: string;
  publishedAt: string;
  category: string;
  description: string;
  duration: string;
}

export interface GearItem {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  link: string;
  inStock?: boolean;
}
