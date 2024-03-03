// Importing necessary modules
import '../globals/global.js';

import fs from 'fs';
import { fileLogger, enableConsoleLogging, disableConsoleLogging, writeReposToFile } from '../logger/fileLogger.js';
import { confirmDeletion } from '../utils/confirmDeletion.js';
import { fetchRepos } from '../utils/fetchRepos.js';
import { selectReposToDelete } from '../utils/selectReposToDelete.js';
import { deleteRepo } from '../utils/deleteRepo.js';

// Get command line arguments
const args = process.argv.slice(2);
const skipPrompt = args.includes('--yes') || args.includes('-y');

// Variables to handle exclusion file
let exceptFile = null;
let reposToDelete = [];
const exceptIndex = args.findIndex(arg => arg === '--except');
if (exceptIndex !== -1 && args[exceptIndex + 1]) {
    exceptFile = args[exceptIndex + 1];
}

// Main function to delete repositories
const deleteRepositories = async () => {
    // Initialize logging and console output
    fileLogger();
    enableConsoleLogging();

    // Fetch repositories
    let repos = await fetchRepos();
    if (repos.length === 0) {
        console.alert('No repositories found.');
        return;
    }
    console.log("Total Repositories: ", repos.length);

    // Exclude repositories from the provided file, if specified
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
    } else {
        // Select repositories to delete if no exclusion file provided
        reposToDelete = await selectReposToDelete(repos);
        if (reposToDelete.length === 0) {
            console.error('No repositories selected for deletion.');
            return;
        }
    }

    // Confirm deletion with user
    let confirm = await confirmDeletion(skipPrompt);
    if (confirm === true) {
        // Delete selected repositories
        for (const repoName of reposToDelete) {
            await deleteRepo(repoName);
        }
    }

    // Disable console output
    disableConsoleLogging();
};

// Execute the main function
deleteRepositories();
