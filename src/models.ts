/**
 * Represents a category for content classification.
 */
export interface Category {
  name: string; // The name of the category.
  category_id: string; // Unique identifier for the category.
  icon_name: string; // The icon associated with the category.
  subscribed?: boolean; // Optional flag indicating subscription status.
}

/**
 * The base model for all content items within the system.
 */
export interface ContentItem {
  id: string; // Unique identifier for the content item.
  title: string; // Title of the content item.
  description: string; // Description or summary of the content item.
  timestamp: Date; // Publication or creation timestamp of the content item.
  category_id: string;
  tags: string[]; // Optional array of tags associated with the content item.
  media_type: MediaType; // The type of media the content item represents.
  jigsaw_layout: JigsawLayout | null;
  hygge_score: number | null;
  personal_score: number | null;
  final_score: number | null;
  ingested_date: string;
  hygge_description: string | null;
  reason_for_score: string | null;
}

/**
 * Movies
 */
export interface MovieContentItem extends ContentItem {
  original_language: string;
  original_title: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  thumbnail_poster_url: string | null;
  poster_url: string | null;
  thumbnail_backdrop_url: string | null;
  backdrop_url: string | null;
  genres: string;
  main_actors: string[];

  posters?: string[];
  backdrops?: string[];
  logos?: string[];
  budget?: number;
  revenue?: number;
  director?: string;

  primary_color_hex: string;
  secondary_color_hex: string;
}
/**
 * Detailed model for articles, extending the base ContentItem.
 */
export interface ArticleContentItem extends ContentItem {
  url: string;
  image_url: string | null;
  thumbnail_image_url: string | null;
  authors: string[] | null;
  raw_tags: string[];
  date_published: string | null;
  word_count: number | null;
  domain: string | null;
  excerpt: string | null;
  news_source: NewsSource;
  eta_to_read: number | null;
  html_content: string;
  short_title: string;
}

/**
 * Defines the media type of content items.
 */
export type MediaType = 'article' | 'video' | 'trip' | 'post' | 'business' | 'event' | 'recipe' | 'weather' | 'movie';

export type JigsawLayout =  'prominent' | 'average' | 'minor' | null; // Optional layout designation.

/**
 * Represents the source of a news article.
 */
export interface NewsSource {
  link: string; // URL to the news source.
  category_id: string; // Identifier for the category of the news source.
  source_id: string; // Unique identifier for the news source itself.
  name: string; // Name of the news source.
  logo_url: string; // URL to the logo of the news source.
  color_hex: string; // Hexadecimal color code associated with the news source.
}


/**
 * Represents a message in a conversation, could be from a user or the system.
 */
export interface ConversationMessage {
  role: 'user' | 'system' | 'assistant'; // Role of the message sender.
  content: string; // Content of the message.
}

/**
 * Defines the types of interactions users can have with content items.
 */
export type InteractionType = 'view' | 'like' | 'share' | 'comment' | 'follow' | 'purchase' | 'save';

/**
 * Tracks interactions users have with content items.
 */
export interface Interaction {
  interaction_id: string; // Unique identifier for the interaction.
  user_id: string; // Identifier of the user who interacted with the content.
  interaction_type: InteractionType; // The type of interaction.
  content_id: string; // Identifier of the content that was interacted with.
  content_details: ContentItem; // Details of the content interacted with.
  timestamp: Date; // Timestamp of when the interaction occurred.
  duration_in_seconds?: number; // Optional duration of interaction in seconds.
  interaction_data?: Record<string, any>; // Optional additional data about the interaction.
}

/**
 * Defines the weighting of different types of interactions to quantify their impact.
 */
export const weights: Record<InteractionType, number> = {
  view: 1, // Assigned the least weight, indicating a view interaction.
  like: 2, // Indicates that the content was liked by a user.
  share: 3, // Indicates content shared by a user, given more importance than a like.
  comment: 4, // Indicates a comment was made, suggesting higher engagement.
  save: 5, // Content saved by a user for later, indicating significant interest.
  follow: 6, // User follows the content creator, showing long-term engagement.
  purchase: 7, // The highest weight, indicating a purchase was made based on the content.
};

/**
 * Represents a content item stored in Redis cache.
 */
export interface RedisContentItem {
  id: string; // Unique identifier for the content item.
  metadata: ContentItem; // Supports all content types, allowing flexible storage.
}

/**
 * Models a section of the user feed, grouping content items by theme or category.
 */
export interface FeedSection {
  id: string
  title: string | null; // Title of the section, can be null for sections without titles.
  section_title_color: string;
  contentItems: ContentItem[]; // Array of various content types within the section.
}

/**
 * Represents the structure of a user's feed, including paginated sections of content.
 */
export interface UserFeed {
  sections: FeedSection[]; // Sections of content items within the user's feed.
  next_cursor: string | null; // Cursor for pagination, null if there's no more content.
  has_more: boolean; // Indicates if more content is available beyond the current page.
}

/**
 * A map of weights!
 */
export type WeightMap = {
  [key in InteractionType]: number;
};

/**
 * A watered down version of a ArticleContentItem instance, meant to be send to be processed by ML
 */
export interface PreProccesedArticleData {
  id: string;
  title: string;
  description: string;
  word_count: number | null;
  authors: string[] | null;
}

/**
 * The model that ML gives back to us, hyrdated with goodies.
 */
export interface PostProccessedArticleData extends PreProccesedArticleData {
  tags: string[];
  reason: string;
  improved_description: string;
  hygge_score: number;
  original_description: string;
  eta_to_read: number;
  short_title: string;
}

/**
 * A watered down version of a ArticleContentItem instance, meant to be send to be processed by ML
 */
export interface PreProccesedMovieData {
  id: string;
  title: string;
  description: string;
  vote_average: string;
  popularity: string;
  main_actors: string[];
  budget?: number;
  revenue?: number;
  director?: string;
}

/**
 * The model that ML gives back to us, hyrdated with goodies.
 */
export interface PostProccessedMovieData extends PreProccesedMovieData {
  reason_for_score: string;
  hygge_score: number;
  short_description: string;
  suggested_category: string;
  primary_color_hex: string;
  secondary_color_hex: string;
}

/**
 * Tracks interactions users have with content items.
 */
export interface FeedCluster {
  cluster_title: string; 
  cluster_uuid: string; 
  content_items: ContentItem[]; 
  average_hygge_score: number;
  news_categories: string[]; 
  score_for_user: number | null;
  category_counts: { [category_id: string]: number }; 
}

export interface GenreMap {
  [id: number]: string;
}

export interface HyggeClub {
  club_icon_url: string;
  club_id: string;
  club_status: string;
  general_area: string;
  cities: string[];
  latitude: string;
  longitude: string;
  name: string;
  weather_type: string;
  club_activities_key: string;
}

export interface User {
  firestore_uuid: string; // Renamed to avoid conflict with doc.id
  firestore_uid: string;
  hygge_club_id: string;
  token: string | undefined;
}
