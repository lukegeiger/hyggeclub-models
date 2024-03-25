/**
 * Represents a category for content classification.
 */
export interface Category {
    name: string;
    category_id: string;
    icon_name: string;
    subscribed?: boolean;
}
/**
 * The base model for all content items within the system.
 */
export interface ContentItem {
    id: string;
    title: string;
    description: string;
    timestamp: Date;
    category_id: string;
    tags: string[];
    media_type: MediaType;
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
}
/**
 * Defines the media type of content items.
 */
export type MediaType = 'article' | 'video' | 'audio' | 'post' | 'business' | 'event' | 'update' | 'weather' | 'movie';
export type JigsawLayout = 'prominent' | 'average' | 'minor' | null;
/**
 * Represents the source of a news article.
 */
export interface NewsSource {
    link: string;
    category_id: string;
    source_id: string;
    name: string;
    logo_url: string;
    color_hex: string;
}
/**
 * Represents a message in a conversation, could be from a user or the system.
 */
export interface ConversationMessage {
    role: 'user' | 'system' | 'assistant';
    content: string;
}
/**
 * Defines the types of interactions users can have with content items.
 */
export type InteractionType = 'view' | 'like' | 'share' | 'comment' | 'follow' | 'purchase' | 'save';
/**
 * Tracks interactions users have with content items.
 */
export interface Interaction {
    interaction_id: string;
    user_id: string;
    interaction_type: InteractionType;
    content_id: string;
    content_details: ContentItem;
    timestamp: Date;
    duration_in_seconds?: number;
    interaction_data?: Record<string, any>;
}
/**
 * Defines the weighting of different types of interactions to quantify their impact.
 */
export declare const weights: Record<InteractionType, number>;
/**
 * Represents a content item stored in Redis cache.
 */
export interface RedisContentItem {
    id: string;
    metadata: ContentItem;
}
/**
 * Models a section of the user feed, grouping content items by theme or category.
 */
export interface FeedSection {
    id: string;
    title: string | null;
    section_title_color: string;
    contentItems: ContentItem[];
}
/**
 * Represents the structure of a user's feed, including paginated sections of content.
 */
export interface UserFeed {
    sections: FeedSection[];
    next_cursor: string | null;
    has_more: boolean;
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
export interface ArticleCluster {
    cluster_title: string;
    cluster_uuid: string;
    cluster_id: InteractionType;
    article_uuids: string[];
    articles_data: ArticleContentItem[];
    average_hygge_score: number;
    news_categories: string[];
    score_for_user: number | null;
    category_counts: {
        [category_id: string]: number;
    };
}
export interface GenreMap {
    [id: number]: string;
}
