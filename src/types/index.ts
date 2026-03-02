export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    cover_image: string | null;
    category_id: number | null;
    published: boolean;
    created_at: string;
    updated_at: string;
    category?: Category;
    tags?: Tag[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface Admin {
    id: string;
    email: string;
    created_at: string;
}

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics: string[];
    updated_at: string;
    homepage: string | null;
    fork: boolean;
}

export interface JwtPayload {
    sub: string;
    email: string;
    role: 'admin';
    iat?: number;
    exp?: number;
}

export interface ApiResponse<T = unknown> {
    data?: T;
    error?: string;
    message?: string;
}

export interface PostFormData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    category_id: number | null;
    published: boolean;
    tags: number[];
}
