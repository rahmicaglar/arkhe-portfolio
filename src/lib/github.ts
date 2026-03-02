import { GitHubRepo } from '@/types';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'rahmicaglar';
const BASE_URL = 'https://api.github.com';

export async function getPublicRepos(): Promise<GitHubRepo[]> {
    try {
        const response = await fetch(
            `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20&type=public`,
            {
                headers: { 'Accept': 'application/vnd.github.v3+json' },
                next: { revalidate: 3600 }, // Cache for 1 hour
            }
        );

        if (!response.ok) throw new Error('GitHub API error');

        const repos: GitHubRepo[] = await response.json();
        // Filter out forks, sort by stars
        return repos
            .filter((r) => !r.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count);
    } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
        return [];
    }
}

export async function getGitHubProfile() {
    try {
        const response = await fetch(`${BASE_URL}/users/${GITHUB_USERNAME}`, {
            headers: { 'Accept': 'application/vnd.github.v3+json' },
            next: { revalidate: 3600 },
        });
        if (!response.ok) throw new Error('GitHub API error');
        return response.json();
    } catch {
        return null;
    }
}
