// Importing the globals.js file to ensure global.octokit is initialized
import './globals/global.js';

import { deleteRepo } from './utils/deleteRepo.js';
import { fetchRepos } from './utils/fetchRepos.js';
import { selectReposToDelete } from './utils/selectReposToDelete.js';


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

deleteRepositories();
