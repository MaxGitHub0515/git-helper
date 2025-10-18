

// Push all changes locally
export const pushAllChanges = async ({git, defaultRemoteRepo, branch, commitMsg, targetPath}) => {
        // Validate branch
        const allBranches = (await git.branch()).all;
        if(!allBranches.includes(branch)) throw new Error(`Branch ${branch} does not exist.`);
        await git.add(targetPath);
        try {
        await git.commit(commitMsg);
        } catch (error) {
            console.log('No changes to commit'.yellow, error.message);
            
            return;        
        }
        await git.push(defaultRemoteRepo, branch);
        console.log(`Pushed changes to ${branch}`);
       };

export const commitChanges = async ({git, commitMsg, targetPath, branch}) => {
       try {
        await git.add(targetPath);
        await git.commit(commitMsg);
        console.log(`Committed changes to ${branch} in directory ${targetPath.yellow}`.green);
       } catch (error) {
        console.log("Error committing changes: ".red + error.message);
       }
       }
    
export const showAllBranches = async ({git}) => {
        const allBranches = (await git.branch()).all;
        console.log('Branches in the repository:'.yellow);
        allBranches.forEach(b => console.log(`- ${b}`.green));
}

export const createBranchAndSwitch = async ({git, branch}) => {
    await git.checkoutLocalBranch(branch);
    // what about ustaged modfied files?
}

export const switchBranchSafely = async ({git, branch}) => {
    await git.checkout(branch);
    console.log(`✅ Switched to branch ${branch}`);
}
