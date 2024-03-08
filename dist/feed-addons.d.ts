import { ContentItem, ArticleContentItem } from "./models";
export declare function isArticleContentItem(contentItem: ContentItem): contentItem is ArticleContentItem;
export declare function getContentItemsByType<T extends ContentItem>(contentItems: ContentItem[], checkType: (contentItem: ContentItem) => contentItem is T): T[];
