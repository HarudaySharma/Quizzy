import { CheckedQuestion, MarkedQuestion } from "../types";

// to be used by Quiz Page only 
const markedToCheckedQuestions = (markedQuestions: MarkedQuestion[]): CheckedQuestion[] => {
    return markedQuestions.map(({ correctAnswer, userAnswer, question, image }) => {
        if(!correctAnswer) {
            throw Error("failed to convert MarkedQuestion[] to CheckedQuestion[], ***correctAnswer Undefined***");
        }
        return {
            question,
            image,
            correctAnswer,
            userAnswer,
        }
    })
}
export default markedToCheckedQuestions;
