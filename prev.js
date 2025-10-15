

program
  .command('commit <msg>')
  .description('Add, commit, and push all changes')
  .action(async (msg) => {
    await git.add('.');
    await git.commit(msg);
    await git.push();
    console.log('✅ Pushed changes');
  });

program
  .command('branch <name>')
  .description('Create and push new branch')
  .action(async (name) => {
    await git.checkoutLocalBranch(name);
    await git.push(['-u', 'origin', name]);
    console.log(`🌿 Created and pushed '${name}'`);
  });

program.parse();





