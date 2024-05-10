import { CheckedQuestion, MarkedQuestion } from "../types";

// to be used by Quiz Page only 
const markedToCheckedQuestions = (markedQuestions: MarkedQuestion[]): CheckedQuestion[] => {
    return markedQuestions.map(({ correctAnswer, userAnswer, question }) => {
        if(!correctAnswer) {
            throw Error("failed to convert MarkedQuestion[] to CheckedQuestion[], ***correctAnswer Undefined***");
        }
        return {
            question,
            correctAnswer,
            userAnswer,
        }
    })
}
export default markedToCheckedQuestions;
