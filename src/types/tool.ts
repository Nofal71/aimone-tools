
export interface Tool {
  id: string;
  name: string;
  purpose: string;
  description: string;
  url: string;
  category: string;
  featured?: boolean;
  isPremium?: boolean;
  logo?: string;
  tags: string[];
  rating?: number;
  users?: string;
}

export interface ToolFilters {
  search: string;
  category: string;
  pricing: string;
  sortBy: string;
}

export interface AISearchResponse {
  message: string;
  id: string;
}
