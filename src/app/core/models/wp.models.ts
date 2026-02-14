export interface WpPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  status: 'publish' | 'draft' | 'pending';
  date: string;
  categories: number[];
  featured_media: number;
  link: string;
}

export interface WpCategory {
  id: number;
  name: string;
}

export interface WpMedia {
  id: number;
  source_url: string;
  title: { rendered: string };
  guid: { rendered: string };
}

export interface WpPostPayload {
  title: string;
  content: string;
  status: 'publish' | 'draft' | 'pending';
  categories?: number[];
  featured_media?: number;
}