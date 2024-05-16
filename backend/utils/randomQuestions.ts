import { MCQ } from '../types/types.js'
import getRandomIndex from '../utils/getRandomIndex.js'
import { Categories } from '../utils/categories.js'
import getAllQuestions from "./getAllQuestions.js";
import { ErrorHandler } from './errorHandler.js';

type returnType = {
    selectedQuestions: MCQ[],
    usedIndices: number[]
}

const randomQuestions = async (category: string, mcqCount: number, indicesUsed?: number[]): Promise<returnType> => {
    try {
        if (!Boolean(Categories[`${category as keyof typeof Categories}`])) {
            throw new ErrorHandler("Category mentioned NOT AVAILABLE", 400);
        }
        const questions: MCQ[] = await getAllQuestions(Categories[category as keyof typeof Categories]);
        let selectedQuestions: MCQ[] = [];
        let usedIndices: Set<number> = new Set();
        if (indicesUsed) {
            indicesUsed.forEach(idx => usedIndices.add(idx));
        }
        for (let i = 0; i < mcqCount; i++) {
            if (mcqCount >= questions.length) {
                usedIndices.add(i);
                continue;
            }
            usedIndices.add(getRandomIndex(usedIndices, questions.length));
        }
        usedIndices.forEach(idx => {
            selectedQuestions.push(questions[idx]);
        })
        return { selectedQuestions, usedIndices: Array.from(usedIndices) };
    }
    catch (err) {
        console.log("failed to read file");
        throw err;
    }
}

export default randomQuestions;
