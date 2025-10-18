
export const askUser = async (git, prompt, currentBranch, suggestedMsgAI) => {
  return prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: [
               {name: 'Push all changes', value: 'push'},
               {name: "Commit all changes to current directory", value: "commit_current"},
               {name: "Commit all changes to a specific directory", value: "commit_specific"},
               {name: 'See all branches', value: 'see_branches'},
               {name: 'Create and switch to a new branch', value: 'create_branch_switch'},
               {name: 'Switch to an existing branch safely', value: 'switch_branch'},
            ]
        },
        {
            type: 'input',
            name: 'dir',
            message: 'Enter the directory to commit (relative to repo root):',
            default: '.',
            when: (answers) => answers.action === 'commit_specific',
            validate: (input) => input.trim() !== '' || 'Directory cannot be empty', 
            filter: (input) => input.replace(/\\/g, '/') // to normalize path


        },
        {
            type: 'input',
            name: 'commitMsg',
            when: (answers) => answers.action === 'see_branches',
            message: 'Enter commit message manually or use auto-githelper commit message:',
            default: suggestedMsgAI

        },
        {
            type: 'input',
            name: 'targetBranch',
            message: 'Enter branch name:',
            default: currentBranch,

        }
])
}
