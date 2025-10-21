
export const askUser = async (git, prompt, currentBranch, suggestedMsgAI) => {
  return prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: [
               {name: 'Push all changes', value: 'push'},
               {name: "Commit changes to a directory", value: "commit_changes"},
               {name: 'See all branches', value: 'see_branches'},
               {name: 'Create and switch to a new branch', value: 'create_branch_switch'},
               {name: 'Switch to an existing branch safely', value: 'switch_branch'},
               {name: 'Amend the last commit', value: 'amend_commit'},
               {name: 'Uncommit the last commit (soft reset)', value:'undo_soft_commit'},
               {name: 'Uncommit the last commit (hard reset)', value:'undo_hard_commit'}
            ]
        },
        {
            type: 'input',
            name: 'dir',
            message: 'Enter the directory to commit (relative to repo root) or press Enter to use current project directory:',
            default: '.',
            when: (answers) => answers.action === 'commit_changes',
            validate: (input) => input.trim() !== '' || 'Directory cannot be empty', 
            filter: (input) => input.replace(/\\/g, '/') // to normalize path


        },
        {
            type: 'input',
            name: 'commitMsg',
            when: (answers) => ['commit_changes', 'push'].includes(answers.action),
            message: 'Enter commit message manually or use auto-githelper commit message:',
            default: suggestedMsgAI

        },
        {
            type: 'input',
            name: 'targetBranch',
            message: 'Enter the name of a branch:',
            when: (answers) => ['push', 'create_branch_switch', 'switch_branch'].includes(answers.action),
            default: currentBranch,

        },
        {
            type: 'confirm',
            name: 'confirmStatus',
            message: 'Are your sure you want to proceed with this action?',
            when: (answers) => ['undo_soft_commit', 'undo_hard_commit', 'push', 'commit_changes'].includes(answers.action),
            default: true
        }
])
}
