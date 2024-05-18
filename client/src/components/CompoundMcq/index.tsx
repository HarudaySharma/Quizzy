import { ReactNode, useEffect, useState } from 'react'
import McqCard from './McqCard';
import { CompoundMcqContext } from '../../context/McqComponentContext';
import { MCQ, MarkedQuestion, Options } from '../../types';
import McqComponentMetaData from './McqComponentMetaData';
import { SimpleResult } from '../../pages/QuizPage';
import { TestResult } from '../../pages/TestPage';
import QuizTimer from './QuizTimer';
import { Button } from '../../@/components/ui/button';
//import QuizTimer from './QuizTimer';

// will take mcqList, and setter to have all the markedAnswers at last,
// checked Answers
// what to show in QuizResult will be controlled by the Parent component of this one

interface BaseProps<T> {
    mcqList: MCQ[];
    meta: ReactNode;
    onQuizOver: (result: T) => void
    includeCount: boolean;
    setUnvisitedQuestions: React.Dispatch<React.SetStateAction<number | undefined>>;
    time?: number;
}

interface TestProps extends BaseProps<TestResult> { }
interface SimpleProps extends BaseProps<SimpleResult | Omit<SimpleResult, 'correctCount' | 'inCorrectCount'>> { }

type Props = SimpleProps | TestProps;

const McqComponent = ({
    mcqList,
    meta,
    onQuizOver,
    includeCount,
    setUnvisitedQuestions,
    time
}: Props) => {

    const [mcqIndex, setMcqIndex] = useState(0);

    const [attempted, setAttempted] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [inCorrectCount, setInCorrectCount] = useState(0);
    const [markedQuestions, setMarkedQuestions] = useState<MarkedQuestion[]>([]);
    const [timer, setTimer] = useState(time ? time : null);

    // if quiz is a timed one
    useEffect(() => {
        if (timer === null) {
            return;
        }
        if (timer === 0) {
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
    }, [timer]);

    useEffect(() => {
        setUnvisitedQuestions(mcqList.length - attempted);
        console.log(`mcqList-Len : ${mcqList.length}`);
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

    const handleQuizTerminate = () => {
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

    const contextValues = {
        mcq: mcqList[mcqIndex],
        timer: timer,
        setTimer: setTimer,
        totalMcqs: mcqList.length,
        markedAnswers: markedQuestions,
        correctCount: correctCount,
        inCorrectCount: inCorrectCount
    }

    return (
        <div className="m-4 bg-transparent">
            <h3 className="text-md uppercase "> Questions </h3>
            <CompoundMcqContext.Provider value={contextValues}>
                <QuizTimer />
                {meta}
                <div className='my-6'></div>
                <McqCard
                    answerSubmitHandler={answerSubmitHandler}
                    header={[<McqCard.Question />]}
                    options={[
                        <McqCard.Option option='A' />,
                        <McqCard.Option option='B' />,
                        <McqCard.Option option='C' />,
                        <McqCard.Option option='D' />,
                    ]}
                    footer={[<McqCard.SubmitButton />]}
                />
                <Button
                    className='bg-red-50 text-red-500 hover:bg-red-50 hover:text-black'
                    onClick={handleQuizTerminate}
                >
                    Terminate Quiz
                </Button>
            </CompoundMcqContext.Provider>
        </div >
    )
}

McqComponent.MetaData = McqComponentMetaData;

export default McqComponent
