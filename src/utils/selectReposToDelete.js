import inquirer from 'inquirer';

// Function to prompt user to select repositories for deletion
export const selectReposToDelete = async (repos) => {
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

    console.log('\nRepositories selected for deletion:', selectedRepositories, "\n");
    return selectedRepositories;
};
