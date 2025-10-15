// Imports
import {Command} from 'commander';
import simpleGit from 'simple-git';
import path from 'path';

// Path Control 
// __dirname is not available in es modules, so derive it
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// full URL of the current module file
const __filename = fileURLToPath(import.meta.url);
// getting absolute path of the dir containing this file.
const __dirname = dirname(__filename);

const program = new Command();
const git = simpleGit();

// Dynamic path
// const repoPath = path.resolve(__dirname, '../..');
// const setPath = ?


const gitHelper = async (branchN, msg, ) => {
    try {
       const pushBranch = async () => {
        await git.add('.'); // make it dynamic adaptive
        await git.commit(msg);
        await git.push();
        console.log('✅ Pushed changes');
       }
        
    } catch (error) {
        console.error('❌ Git operation failed:', error.message);
    }
}

// every program. should a separate function for specific purpose



