

  export interface Category {
    name: string;
    category_id: string;
    icon_name: string;
    subscribed?: boolean; // Optional property to indicate subscription status
  }
  
  export interface ExtendedCategory extends Category {
    subscribed?: boolean;
  }
  
  export interface ConversationMessage {
    role: 'user' | 'system' | 'assistant';
    content: string;
  }

export interface ArticleData {
    id: string;
    title: string;
    description: string;
    word_count: number | null;
    authors: string[] | null;
  }
  
  export interface ProcessedArticleData extends ArticleData {
    tags: string[];
    hygge_score: number;
    improved_description: string;
    reason: string;
    original_description: string;
    eta_to_read: number;
  }

  export type Article = {
    title: string;
    url: string;
    description: string;
    authors: string[];
    date: string; // Original publication date as a string
    unix_date: number; // Unix timestamp of the publication date
    id: string; // Unique identifier for the article, generated by uuidv4
    image_url: string | null; // Allow null if an image URL is not found
    thumbnail_image_url?: string | null; // Allow null if an image URL is not found
    scraped_text: string | null;
    date_published: string | null;
    word_count: number | null;
    domain: string | null;
    excerpt: string | null;
    news_source: NewsSource;
  };
  
  export interface NewsSource {
    link: string;
    category_id: string;
    source_id: string;
    name: string;
    logo_url: string;
    color_hex: string;
  }

  export type HyggeArticle = Article & {
    hygge_description: string;
    tags: string[];
    hygge_score: number;
    reason_for_score: string;
    eta_to_read: number;
};

export type ScoredArticle = HyggeArticle & {
  personal_score: number;
  final_score: number;
  jigsaw_layout: JigsawLayout
};

export type JigsawLayout = 'prominent' | 'average' | 'minor';

  export type MediaType = 'article' | 'video' | 'audio' | 'post' | 'business';

  export type ContentDetails = {
      title?: string;
      description?: string;
      tags?: string[];
      media_type: MediaType
      media_url?: string;
      additional_data?: Record<string, any>;
  };
  
  export type Interaction = {
      interaction_id: string;
      user_id: string;
      interaction_type: InteractionType
      content_id: string;
      content_details: ContentDetails;
      timestamp: Date;
      duration_in_seconds?: number;
      interaction_data?: Record<string, any>;
  };
  
  export type InteractionType = 'view' | 'like' | 'share' | 'comment' | 'follow' | 'purchase' | 'save';
  
  export type WeightMap = {
    [key in InteractionType]: number;
  };
  
  export const weights: WeightMap = {
    view: 1,
    like: 2,
    share: 3,
    comment: 4,
    save: 5,
    follow: 6,
    purchase: 7, 
  };
  