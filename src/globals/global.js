import { Octokit } from '@octokit/rest';
import { GITHUB_PERSONAL_ACCESS_TOKEN } from '../../config.js';

// Create an instance of Octokit with your GitHub personal access token
global.octokit = new Octokit({
    auth: GITHUB_PERSONAL_ACCESS_TOKEN,
});