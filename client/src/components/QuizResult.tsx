import { CheckedQuestion } from '../types';

interface Props {
    checkedQuestions: CheckedQuestion[];
    correctCount: number,
    inCorrectCount: number,
    totalMcqs: number,
}

const QuizResult = ({ checkedQuestions, correctCount, inCorrectCount, totalMcqs}: Props) => {

    const List = () => {
        return (
            <div>
                {
                    checkedQuestions.map(obj =>
                        <div key={obj.question}>
                            <p>{obj.question}</p>
                            <div>
                                {obj.correctAnswer.option}: {obj.correctAnswer.text}
                            </div>
                            <div>
                                {obj.userAnswer.option}: {obj.userAnswer.text}
                            </div>
                            <div>
                                {obj.userAnswer.option === obj.correctAnswer.option
                                    ? "CORRECT"
                                    : "INCORRECT"}
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }

    const MetaData = () => {
        return (
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col items-center p-12 bg-gray-50 text-gray-700 font-bold'>
                    <div className='uppercase'>Total</div>
                    <div>{totalMcqs}</div>
                </div>
                <div className='flex flex-col items-center p-12 bg-green-50 text-green-500 font-bold'>
                    <div className='uppercase'>Correct</div>
                    <div>{correctCount}</div>
                </div>
                <div className='flex flex-col items-center p-12 bg-red-50 text-red-500 font-bold'>
                    <div className='uppercase'>In Correct</div>
                    <div>{inCorrectCount}</div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <MetaData />
            <List />
        </div>
    )
}

export default QuizResult
