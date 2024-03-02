// Importing the globals.js file to ensure global.octokit is initialized
import fs from 'fs';
import './globals/global.js';

import { fileLogger, enableConsoleLogging, disableConsoleLogging, writeReposToFile } from './logger/fileLogger.js';
import { confirmDeletion } from './utils/confirmDeletion.js';

import { fetchRepos } from './utils/fetchRepos.js';
import { selectReposToDelete } from './utils/selectReposToDelete.js';
import { deleteRepo } from './utils/deleteRepo.js';

const args = process.argv.slice(2);
const skipPrompt = args.includes('--yes') || args.includes('-y');

let exceptFile = null;
let reposToDelete = [];
const exceptIndex = args.findIndex(arg => arg === '--except');
if (exceptIndex !== -1 && args[exceptIndex + 1]) {
  exceptFile = args[exceptIndex + 1];
}

const deleteRepositories = async () => {
  fileLogger();
  enableConsoleLogging();
  let repos = await fetchRepos();
  if (repos.length === 0) {
    console.alert('No repositories found.');
    return;
  }
  console.log("Total Repositories: ", repos.length);

  if (exceptFile) {
    try {
      const excludedRepos = fs.readFileSync(exceptFile, 'utf8').split('\n').map(repo => repo.trim());
      repos = repos.filter(repo => !excludedRepos.includes(repo));
      writeReposToFile(repos);
      console.log('Repositories to be deleted written to deleteRepos.txt file. Please check the file.');
      reposToDelete = repos;

    } catch (err) {
      console.error(`Error reading or parsing the exclusion file: ${exceptFile}, ${err.message}`);
      return;
    }
  }
  else {
    reposToDelete = await selectReposToDelete(repos);
    if (reposToDelete.length === 0) {
      console.error('No repositories selected for deletion.');
      return;
    }
  }
  let confirm = await confirmDeletion(skipPrompt);
  if (confirm === true) {
    for (const repoName of reposToDelete) {
      await deleteRepo(repoName);
    }
  }

  disableConsoleLogging();
};

deleteRepositories();
