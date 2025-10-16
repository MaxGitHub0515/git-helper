
import inquirer from 'inquirer';

 export const answers = inquirer.prompt([
        {
            type: 'select',
            name: 'action',
            message: 'Choose an action:',
            choices: [
                '0.0 Before commiting choose some specific brunch or current one',
                    '01. See all branches',
                    '02. Create and switch to a new branch',
                    '03. Switch to an existing branch safely',
                '1. Push all changes',
                '2. Commit all changes to a specific directory',
                '3. Commit all changes to this directory',
                
            ]
        },
        {
            type: 'input',
            name: 'dir',
            message: 'Enter the directory to commit (relative to repo root):',
            default: '.',
            when: (answers) => answers.action.includes('specific directory')
        },
        {
            type: 'input',
            name: 'branchN',
            message: 'Enter branch name:',
            default: "main"

        }
])