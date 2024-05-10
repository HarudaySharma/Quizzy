import { ReactNode, useEffect, useState } from 'react'
import McqCard from './McqCard';
import { McqComponentContext } from '../../context/McqComponentContext';
import { MCQ, MarkedQuestion, Options } from '../../types';
import McqComponentMetaData, { CorrectCount, InCorrectCount, TotalMcqs } from './McqComponentMetaData';
import { SimpleResult } from '../../pages/QuizPage';
import { TestResult } from '../../pages/TestPage';

// will take mcqList, and setter to have all the markedAnswers at last,
// checked Answers
// what to show in QuizResult will be controlled by the Parent component of this one

interface BaseProps<T> {
    mcqList: MCQ[];
    meta: ReactNode;
    onQuizOver: (result: T) => void
    includeCount: boolean;
}

interface TestProps extends BaseProps<TestResult> { }
interface SimpleProps extends BaseProps<SimpleResult | Omit<SimpleResult, 'correctCount' | 'inCorrectCount'>> { }

type Props = SimpleProps | TestProps;

const McqComponent = ({
    mcqList,
    meta,
    onQuizOver,
    includeCount,
}: Props) => {

    const [mcqIndex, setMcqIndex] = useState(0);

    const [attempted, setAttempted] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [inCorrectCount, setInCorrectCount] = useState(0);
    const [markedQuestions, setMarkedQuestions] = useState<MarkedQuestion[]>([]);

    useEffect(() => {
        console.log(attempted);
        if (attempted === mcqList.length) {
            if (includeCount) {
                onQuizOver({
                    markedQuestions,
                    correctCount,
                    inCorrectCount,
                    totalMcqs: mcqList.length
                });
            } else {
                onQuizOver({
                    markedQuestions,
                    totalMcqs: mcqList.length
                });
            }
        }
        return;
    }, [attempted])

    //checks each submitted answer and saves it
    const answerSubmitHandler = (markedOption: Options) => {
        setAttempted(prev => prev + 1);
        const markedAnswer: MarkedQuestion = {
            question: mcqList[mcqIndex].question,
            correctAnswer: {
                option: mcqList[mcqIndex].answer,
                text: mcqList[mcqIndex][mcqList[mcqIndex].answer],
            },
            userAnswer: {
                option: markedOption,
                text: mcqList[mcqIndex][markedOption],
            }
        };
        if (mcqIndex < mcqList.length - 1) {
            setMcqIndex(prev => prev + 1);
        }
        setMarkedQuestions([...markedQuestions, markedAnswer]);

        if (!includeCount) {
            return;
        }
        if (markedOption === mcqList[mcqIndex].answer) {
            setCorrectCount(prev => prev + 1);
        } else {
            setInCorrectCount(prev => prev + 1);
        }
    }

    return (
        <div className="m-4 bg-transparent">
            <h3 className="text-md uppercase "> Questions </h3>
            <McqComponentContext.Provider value={{ mcq: mcqList[mcqIndex], totalMcqs: mcqList.length, markedAnswers: markedQuestions, correctCount, inCorrectCount }}>
                {meta}
                <div className='my-6'></div>
                <McqCard answerSubmitHandler={answerSubmitHandler} />
            </McqComponentContext.Provider>
        </div >
    )
}

McqComponent.MetaData = McqComponentMetaData;
McqComponent.TotalMcqs = TotalMcqs;
McqComponent.CorrectCount = CorrectCount;
McqComponent.InCorrectCount = InCorrectCount;

export default McqComponent
