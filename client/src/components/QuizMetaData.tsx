import { useMcqComponentContext } from "../context/McqComponentContext";

const QuizMetaData = () => {
    const {totalMcqs, correctCount, inCorrectCount} = useMcqComponentContext();

    return (
        <div className='flex flex-row gap-4'>
        <div>Total MCQs: {totalMcqs}</div>
        <div>Correct: {correctCount}</div>
        <div>InCorrect: {inCorrectCount}</div>
        </div>
    );
}
export default QuizMetaData;
