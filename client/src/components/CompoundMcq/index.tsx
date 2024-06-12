import { ReactNode, useCallback, useEffect, useState } from 'react'
import McqCard from './McqCard';
import { CompoundMcqContext } from '../../context/McqComponentContext';
import { MCQ, MarkedQuestion, OPTIONS, VARIANT } from '../../types';
import McqComponentMetaData from './McqComponentMetaData';
//import { SimpleResult } from '../../pages/QuizPage';
//import { TestResult } from '../../pages/TestPage';
import QuizTimer from './QuizTimer';
import { Button } from '../../@/components/ui/button';

// will take mcqList, and setter to have all the markedAnswers at last,
// checked Answers
// what to show in QuizResult will be controlled by the Parent component of this one


interface McqComponentProps {
    mcqList: MCQ[];
    meta: ReactNode;
    setUnvisitedQuestions: React.Dispatch<React.SetStateAction<number | undefined>>;
    variant: VARIANT;
    time?: number;
    onQuizOver: (result: any) => void
}

const McqComponent = ({
    mcqList,
    meta,
    onQuizOver,
    setUnvisitedQuestions,
    variant,
    time
}: McqComponentProps) => {

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
            if (variant === 'TEST') {
                onQuizOver({
                    markedQuestions,
                    totalMcqs: mcqList.length
                })
            }
            if (variant === 'QUIZ') {
                onQuizOver({
                    markedQuestions,
                    correctCount,
                    inCorrectCount,
                    totalMcqs: mcqList.length
                });
            }
        }

    }, [timer, variant]);

    useEffect(() => {

        setUnvisitedQuestions(mcqList.length - attempted);
        console.log(`mcqList-Len : ${mcqList.length}`);

        if (attempted === mcqList.length) {
            if (variant === 'QUIZ') {
                onQuizOver({
                    markedQuestions,
                    correctCount,
                    inCorrectCount,
                    totalMcqs: mcqList.length
                });
            }
            if (variant === 'TEST') {
                onQuizOver({
                    markedQuestions,
                    totalMcqs: mcqList.length
                });
            }
        }
        return;
    }, [attempted])

    const getCorrectOption = useCallback(() => {
        return mcqList[mcqIndex].answer;
    }, [mcqList, mcqIndex]);

    //checks each submitted answer and saves it
<<<<<<< HEAD
    function answerSubmitHandler(markedOption: Options) {
=======
    function answerSubmitHandler(markedOption: OPTIONS) {

>>>>>>> dev
        setAttempted(prev => prev + 1);

        const markedQuestion: MarkedQuestion = {
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

        setMarkedQuestions([...markedQuestions, markedQuestion]);

        if (variant === 'TEST') {
            return;
        }

        if (markedOption === mcqList[mcqIndex].answer) {
            setCorrectCount(prev => prev + 1);
        } else {
            setInCorrectCount(prev => prev + 1);
        }
    }

    const handleQuizTerminate = () => {
        if (variant === 'TEST') {
            onQuizOver({
                markedQuestions,
                totalMcqs: mcqList.length
            });
        }
        if (variant === 'QUIZ') {
            onQuizOver({
                markedQuestions,
                correctCount,
                inCorrectCount,
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
        inCorrectCount: inCorrectCount,
        attemptedCount: attempted,
        variant: variant,
    }

    //<h3 className="text-md uppercase "> Questions </h3>
    return (
        <div
            className={`
                flex
                flex-col
                gap-2
                content-center
                items-center
                bg-transparent 
                sm:max-w-xl
                w-11/12
                mx-auto 
                //border-2 
                //border-black
            `}
        >
            <CompoundMcqContext.Provider value={contextValues}>
                {meta}
                <McqCard
                    key={mcqList[mcqIndex].question}
                    answerSubmitHandler={answerSubmitHandler}
                    getCorrectOption={getCorrectOption}
                    header={<>
                        <McqCard.Question />
                    </>}
                    options={<>
                        <McqCard.Option option='A' />
                        <McqCard.Option option='B' />
                        <McqCard.Option option='C' />
                        <McqCard.Option option='D' />
                    </>}
                    footer={<>
                        <McqCard.SubmitButton />
                    </>}
                />
                <Button
                    onClick={handleQuizTerminate}
                    variant={'destructive'}
                >
                    Terminate Quiz
                </Button>
            </CompoundMcqContext.Provider>
        </div >
    )
}

McqComponent.MetaData = McqComponentMetaData;
McqComponent.Timer = QuizTimer;

export default McqComponent
