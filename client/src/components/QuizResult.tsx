import { Card, CardContent, CardFooter, CardHeader } from '../@/components/ui/card';
import { CheckedQuestion } from '../types';
import { ArrowLeft, CheckIcon, XIcon } from 'lucide-react';

interface Props {
    checkedQuestions: CheckedQuestion[];
    correctCount: number,
    inCorrectCount: number,
    totalMcqs: number,
}

const QuizResult = ({ checkedQuestions, correctCount, inCorrectCount, totalMcqs }: Props) => {

    const List = () => {
        return (
            <>
                {
                    checkedQuestions.map((obj, idx) =>
                        <Card key={obj.question}>
                            <CardHeader>
                                <div>
                                    Q:{idx + 1}
                                </div>
                                <div>
                                    {obj.question}
                                </div>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <div className='w-fit bg-green-200 p-2 flex flex-row'>
                                    {obj.correctAnswer.option}: {obj.correctAnswer.text} <ArrowLeft /> Correct Answer
                                </div>
                                <div className={
                                    ` ${obj.correctAnswer.option === obj.userAnswer.option ? "bg-green-200" : "bg-red-50"}
                                w-fit bg-green-200 p-2 flex flex-row`
                                } >
                                    {obj.userAnswer.option}: {obj.userAnswer.text}<ArrowLeft /> Your Answer
                                </div>
                            </CardContent>
                            <CardFooter>
                                {obj.userAnswer.option === obj.correctAnswer.option
                                    ? <>
                                        CORRECT
                                        <CheckIcon />
                                    </>
                                    : <>
                                        INCORRECT
                                        <XIcon />
                                    </>
                                }
                            </CardFooter>
                        </Card >
                    )
                }
            </>
        )
    }

    const MetaData = () => {
        return (
            <div className='flex flex-col justify-between sm:flex-row'>
                <div className='flex flex-col text-center items-center p-12 bg-gray-50 text-gray-700 font-bold'>
                    <div className='uppercase'>Total</div>
                    <div>{totalMcqs}</div>
                </div>
                <div className='flex flex-col text-center items-center p-12 bg-green-50 text-green-500 font-bold'>
                    <div className='uppercase'>Correct</div>
                    <div>{correctCount}</div>
                </div>
                <div className='flex flex-col text-center items-center p-12 bg-red-50 text-red-500 font-bold'>
                    <div className='uppercase'>In Correct</div>
                    <div>{inCorrectCount}</div>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col'>
            <MetaData />
            <List />
        </div>
    )
}

export default QuizResult
