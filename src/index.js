import { Octokit } from '@octokit/rest';
import inquirer from 'inquirer';
import { GITHUB_PERSONAL_ACCESS_TOKEN, GITHUB_USERNAME } from '../config.js';

// Create an instance of Octokit with your GitHub personal access token
const octokit = new Octokit({
  auth: GITHUB_PERSONAL_ACCESS_TOKEN,
});

// Function to fetch repositories from GitHub
const fetchRepos = async () => {
  try {
    let page = 1;
    let allRepos = [];

    // Fetch repositories page by page until all repositories are retrieved
    while (true) {
      const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
        per_page: 100, // Fetch up to 100 repositories per page
        page: page,
      });

      // Add fetched repositories to the array
      allRepos = [...allRepos, ...repos.map(repo => repo.name)];

      // If the fetched repositories are less than 100, it means there are no more pages
      if (repos.length < 100) {
        break;
      }

      // Increment page number for the next request
      page++;
    }

    return allRepos;
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
    return [];
  }
};


// Function to prompt user to select repositories for deletion
const selectReposToDelete = async (repos) => {
  const reposToDelete = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'repositories',
      message: 'Select repositories to delete:',
      choices: repos.map(repo => ({
        name: repo,
      })),
    }
  ]);

  const selectedRepositories = reposToDelete.repositories;

  console.log('Repositories selected for deletion:', selectedRepositories);
  return selectedRepositories;
};

// Function to delete a repository
const deleteRepo = async (repoName) => {
  try {
    await octokit.rest.repos.delete({
      owner: GITHUB_USERNAME,
      repo: repoName,
    });
    console.log(`Repository '${repoName}' deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting repository '${repoName}':`, error.message);
  }
};

// Main function to delete repositories
const deleteRepositories = async () => {
  const repos = await fetchRepos();
  if (repos.length === 0) {
    console.log('No repositories found.');
    return;
  }
  console.log("Total Repositories: ", repos.length);

  const reposToDelete = await selectReposToDelete(repos);
  if (reposToDelete.length === 0) {
    console.log('No repositories selected for deletion.');
    return;
  }

  for (const repoName of reposToDelete) {
    await deleteRepo(repoName);
  }
};

// Call the main function
deleteRepositories();
