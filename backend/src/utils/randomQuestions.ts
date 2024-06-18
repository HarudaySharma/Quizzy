import { MCQ } from '../types/types.js'
import getRandomIndex from '../utils/getRandomIndex.js'
import { Categories } from '../utils/categories.js'
import getAllQuestions from "./getAllQuestions.js";

type returnType = {
    selectedQuestions: MCQ[],
    usedIndices: string[]
}

const randomQuestions = async (category: keyof typeof Categories, mcqCount: number, indicesUsed?: string[]): Promise<returnType> => {
    try {
        const questions: MCQ[] = await getAllQuestions(Categories[category]);
        let selectedQuestions: MCQ[] = [];
        let usedIndices: Set<number> = new Set();

        const newSelectedIndices: string[] = [];
        if (indicesUsed) {
            indicesUsed.forEach(idx => usedIndices.add(parseInt(idx, 10)));
        }

        //console.log(indicesUsed?.length, questions.length);
        if (indicesUsed && indicesUsed.length >= questions.length) {
            return { selectedQuestions: [], usedIndices: [] };
        }
        for (let i = 0; i < mcqCount;) {
            if (mcqCount >= questions.length) {
                // send all the questions
                while (i < questions.length) {
                    usedIndices.add(i);
                    newSelectedIndices.push(`${i}`);
                    selectedQuestions.push(questions[i]);
                    i++;
                }
                break;
            }
            const idx = getRandomIndex(usedIndices, questions.length);
            usedIndices.add(idx);
            newSelectedIndices.push(`${idx}`);
            selectedQuestions.push(questions[idx]);
            i++;
        }
        return { selectedQuestions, usedIndices: newSelectedIndices };
    }
    catch (err) {
        console.log("failed to read file");
        throw err;
    }
}

export default randomQuestions;
