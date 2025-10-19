#!/usr/bin/env node


// Imports
import {Command} from 'commander';
import simpleGit from 'simple-git';
import inquirer from 'inquirer';
import path from 'path';
import process from 'process';
import "colors";
import dotenv from 'dotenv';
dotenv.config();
// Path Control 
// __dirname is not available in es modules, so derive it
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { askUser } from './utils/inquirer.js';
import {actionsMap} from './actions/actionsMap.js';
import {generateAICommitMessage} from './utils/commitHelper.js';
// full URL of the current module file
const __filename = fileURLToPath(import.meta.url);
// getting absolute path of the dir containing this file.
const __dirname = dirname(__filename);
// cwd is the current working directory where the command is run
const defPath = process.cwd();

const program = new Command();
const git = simpleGit();
const prompt = inquirer.prompt;



console.log(`Current project directory: ${defPath.yellow}`);

export const gitHelper = async (defaultRemoteRepo = "origin") => {
    try {
        const currentBranch = (await git.branch()).current;
        const {suggestedMsgAI} = await generateAICommitMessage({git})
        const answers = await askUser(git, prompt, currentBranch, suggestedMsgAI);
        const { action, dir, targetBranch, commitMsg} = answers;
        // Detect current branch automatically
        const branch = targetBranch || currentBranch;
        const targetPath = action === "commit_changes" ? path.resolve(defPath, dir) : defPath;
        // selecting action to execute
        const selectedAction = actionsMap[action];
        if(!selectedAction) throw new Error(`⚠️ Unknown action: ${action}`);
        await selectedAction({git, branch, commitMsg, defaultRemoteRepo, targetPath})
    } catch (error) {
        console.error('❌ Git operation failed:', error.message);
    }
}

gitHelper();
// pushAll
// 

// every program. should be a separate function for specific purpose

// Purpose -simplify git operations
// 1. commit and push all changes
// 2. create and push new branch


// Issues on the way - 
// 1. Adjust the path for shebang
// 2. Would be nice to add auto-commit with openai, and manual option too
