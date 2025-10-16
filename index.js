#!/usr/bin/env node


// Imports
import {Command} from 'commander';
import simpleGit from 'simple-git';
import inquirer from 'inquirer';
import path from 'path';
import process from 'process';
import "colors";
// Path Control 
// __dirname is not available in es modules, so derive it
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { askUser } from './utils/inquirer.js';
// full URL of the current module file
const __filename = fileURLToPath(import.meta.url);
// getting absolute path of the dir containing this file.
const __dirname = dirname(__filename);
// cwd is the current working directory where the command is run
const defPath = process.cwd();

const program = new Command();
const git = simpleGit();

// Dynamic path
// const repoPath = path.resolve(__dirname, '../..');
// const setPath = ?

console.log(`Current project directory: ${__dirname.blue}`);

const gitHelper = async (msg, defaultRemoteRepo = "origin") => {
    try {
        const answers = await askUser();
        const { action, dir, targetBranch } = answers;
        // Detect current branch automatically
        const currentBranch = (await git.branch()).current;
        const branch = targetBranch || currentBranch;
    // Push all changes locally
       const pushAll = async () => {
       const branchExists = (await git.branch()).current
        if (!branchExists) new Error(`Branch ${branchN} does not exist`);
        await git.add(defPath);
        try {
        await git.commit(msg);
        } catch (error) {
            console.log('No changes to commit'.yellow);
        }
        await git.push(defaultRemoteRepo, branchN);
        console.log(`Pushed changes to ${branchN}`);
       };
        await pushAll();

       // Adding current repo and committing all changes in it 
       
       const commit = async () => {

         const commitAll = async () => {
            await git.add(defPath);
            await git.commit(msg)
        }
       }
      
      

       
        
        
    } catch (error) {
        console.error('❌ Git operation failed:', error.message);
    }
}

gitHelper(
    'random',
    'test commit from script',

)

// pushAll
// 

// every program. should be a separate function for specific purpose

// Purpose -simplify git operations
// 1. commit and push all changes
// 2. create and push new branch


// Issues on the way - 
// 1. Adjust the path for shebang

