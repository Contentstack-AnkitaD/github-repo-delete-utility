# GitHub Repository Deletion Script

This script allows you to delete multiple repositories from your GitHub account using a personal access token (PAT).

## Getting Started

### 1. Generate Personal Access Token (PAT)

To use this script, you'll need to generate a personal access token (PAT) on GitHub. Follow these steps to generate the token:

1. Navigate to GitHub Settings: Go to the Settings page of your GitHub account.

2. Access Developer Settings: In the Settings page, scroll down the left sidebar and click on "Developer settings".

3. Generate New Token: Under Developer settings, click on "Personal access tokens".

4. Choose Classic Tokens: Click on the second option, "Tokens (classic)".

5. Generate New Token: Click on the "Generate new token" button.

6. Provide Token Description: Enter a description for the token.

7. Select Scopes: Choose the scopes (permissions) for the token. You'll likely need permissions related to repositories, such as `repo` (Full control of private repositories) and `delete_repo` (Delete repositories).

8. Generate Token: Click on the "Generate token" button.

9. Copy Token: Once the token is generated, copy the token value and store it securely.

10. Use Token: In your script or application, use this token as the auth parameter when authenticating with the GitHub API.

11. Keep Token Secure: Treat your personal access token like a password and do not share it with anyone or expose it in public repositories.

### 2. Installation

To install dependencies, run:

```bash
npm install
```

### 3. Configuration

After installing the script, you need to create a `config.js` file with your GitHub personal access token and username. You can use the provided `sample.config.js` as a template:

1. Copy `sample.config.js` to `config.js`.
2. Open `config.js` in a text editor.
3. Replace `GITHUB_PERSONAL_ACCESS_TOKEN` with your actual GitHub personal access token.
4. Replace `GITHUB_USERNAME` with your GitHub username.
5. Save the file.

Make sure to keep your personal access token secure and do not share it with anyone or expose it in public repositories.

### 4. Usage

To delete repositories, run the script:

```bash
npm run delete-repos
```

#### Additional flags can be used to modify the behavior of the script:

- `-y` or `--yes`: Skips the prompt confirmation before deleting repositories.

```bash
npm run delete-repos -- -y
```

- `--except` <filename>: Deletes all repositories except those listed in the specified file. Each repository name should be listed on a separate line in the file.

```bash
npm run delete-repos -- --except 'github-repo-delete/excluded_repos.txt'
```


## Author

[Ankita D.](https://github.com/D-Ankita)
