export type FactCategorySlug =
  | "science-physics"
  | "deep-space"
  | "technology-ai"
  | "history-civilization"
  | "nature-earth"
  | "human-biology"
  | "psychology-mind"
  | "geography-wonders"
  | "food-culinary"
  | "culture-media"
  | "weird-unexplained";

export interface Category {
  id: string;
  name: string;
  slug: FactCategorySlug;
  description: string;
  iconName: string;
  accentColor: string; // Hex color for borders/glows
  gradient: string; // Tailwind gradient classes
  factCount: number;
}

export interface Fact {
  id: string;
  slug: string;
  title: string;
  hook: string;
  summary: string;
  category: FactCategorySlug;
  categoryName: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  verified: boolean;
  views: string;
  likes: number;
  imageUrl: string;
  tags: string[];
  source: string;
  sourceUrl?: string;
  isPopular?: boolean;
  isFactOfTheDay?: boolean;
  bentoSize?: "spotlight" | "medium" | "wide" | "compact";
  statHighlight?: {
    value: string;
    label: string;
  };
}

export interface ArticleSection {
  heading: string;
  content: string[];
  quote?: string;
}

export interface Article {
  slug: string;
  factId: string;
  title: string;
  subtitle: string;
  category: FactCategorySlug;
  categoryName: string;
  readTime: string;
  publishedDate: string;
  lastUpdated: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  heroImage: string;
  imageCaption: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  didYouKnowBreakdowns: {
    point: string;
    detail: string;
  }[];
  sources: {
    name: string;
    publication: string;
    url?: string;
  }[];
  relatedFactSlugs: string[];
}
