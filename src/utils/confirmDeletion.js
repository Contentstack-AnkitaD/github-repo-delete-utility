import inquirer from 'inquirer';

// Prompt for confirmation before deleting repositories
export const confirmDeletion = async () => {
    const confirmDelete = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to proceed with deleting the selected repositories?',
        default: false,
    });

    if (!confirmDelete.confirm) {
        console.error('Deletion process aborted.');
        return false;
    }
    return true;
}