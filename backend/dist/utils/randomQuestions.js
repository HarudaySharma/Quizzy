import getRandomIndex from '../utils/getRandomIndex.js';
import { Categories } from '../utils/categories.js';
import getAllQuestions from "./getAllQuestions.js";
const randomQuestions = async (category, mcqCount, indicesUsed) => {
    try {
        const questions = await getAllQuestions(Categories[category]);
        let selectedQuestions = [];
        let usedIndices = new Set();
        const newSelectedIndices = [];
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
};
export default randomQuestions;
