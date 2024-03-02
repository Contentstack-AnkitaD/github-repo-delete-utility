import { GITHUB_USERNAME } from "../../config.js";

// Function to fetch repositories from GitHub
export const fetchRepos = async () => {
    try {
        let allRepos = [];
        let response;
        let page = 1;

        do {
            response = await global.octokit.rest.repos.listForAuthenticatedUser({
                per_page: 100,
                page,
            });

            // Filter out repositories not owned by the authenticated user
            const userRepos = response.data.filter(repo => repo.owner.login === GITHUB_USERNAME);
            allRepos = [...allRepos, ...userRepos.map(repo => repo.name)];
            page++;

        } while (response.data.length === 100);

        return allRepos;
    } catch (error) {
        console.error('Error fetching repositories:', error.message);
        return [];
    }
};