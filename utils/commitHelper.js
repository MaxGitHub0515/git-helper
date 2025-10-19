
import OpenAI from "openai";
import process from "process";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


export const generateAICommitMessage = async ({git}) => {
    const status = await git.status();
    const changedFiles = status.files.map((f) => f.path);
    if(changedFiles.length === 0 ) return "No changes detected";
    const diffs = await Promise.all(changedFiles.map((f) => git.diff(['HEAD', f])));
    const changesSummary = changedFiles.map((f, idx) => ({
        file: f,
        diff: diffs[idx].slice(0, 1500) // limit diff size
    }))

const aiResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
        role: "system", 
        content: `You are an expert assistant that writes clear, concise, and meaningful git commit messages.
        Each commit message should accurately summarize the intent and impact of the changes after reviewing
        all modified, added, or deleted files. Focus on the purpose and effect of the code updates, not on file names alone.`,
        },
        {
        role: "user",
        content: `Summarize these code changes into a short, conventional git commit message (max 20 words):\n 
        ${changesSummary
            .map(c => `File: ${c.file}\nDiff:\n${c.diff}`)
            .join('\n\n')}` 
    }
    ]
})
    const suggestedMsgAI = aiResponse.choices?.[0]?.message?.content?.trim();  
    return {suggestedMsgAI}
}
