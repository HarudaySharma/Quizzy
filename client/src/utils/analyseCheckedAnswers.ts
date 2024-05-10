import { CheckedQuestion } from "../types";

const analyseCheckedQuestions = (checkedQuestions: CheckedQuestion[]) => {
    let correctCount = 0;
    let inCorrectCount = 0;
    checkedQuestions.forEach(({correctAnswer, userAnswer}) => {
        if(correctAnswer.option === userAnswer.option) {
            correctCount += 1;
        } else {
            inCorrectCount += 1;
        }
    })
    return {correctCount, inCorrectCount};
}

export default analyseCheckedQuestions;
