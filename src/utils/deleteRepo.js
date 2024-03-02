import { GITHUB_USERNAME } from "../../config.js";

// Function to delete a repository
export const deleteRepo = async (repoName) => {
    try {
        await global.octokit.rest.repos.delete({
            owner: GITHUB_USERNAME,
            repo: repoName,
        });
        console.success(`Repository '${repoName}' deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting repository '${repoName}':`, error.message);
    }
};