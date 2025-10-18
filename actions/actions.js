

// Push all changes locally
export const pushAllChanges = async ({git, defaultRemoteRepo, branch, commitMsg, targetPath}) => {
        // Validate branch
        const allBranches = (await git.branch()).all;
        const status = await git.status();
        const pendingChanges = status.files.length > 0;
        if(!allBranches.includes(branch)) throw new Error(`Branch ${branch} does not exist.`);
        try {
        if(pendingChanges) {
           await commitChanges({git, commitMsg, targetPath, branch});
        } else {
            console.log('No changes detected — skipping commit'.yellow);
        }
        await git.push(defaultRemoteRepo, branch);
        console.log(`Pushed changes to ${branch}`);
        } catch (error) {
            console.log('No changes to commit'.yellow, error.message);       
        }
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
