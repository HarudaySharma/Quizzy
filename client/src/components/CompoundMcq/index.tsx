import { ReactNode, useCallback, useEffect, useState } from 'react'
import McqCard from './McqCard';
import { CompoundMcqContext, CompoundMcqContextType } from '../../context/McqComponentContext';
import { Categories, MCQ, MarkedQuestion, OPTIONS, VARIANT } from '../../types';
import McqComponentMetaData from './McqComponentMetaData';
import QuizTimer from './QuizTimer';
import { Button } from '../../@/components/ui/button';
import Category from './Category';
import shuffleOptions from '../../utils/shuffleOptions';

// will take mcqList, and setter to have all the markedAnswers at last,
// checked Answers
// what to show in QuizResult will be controlled by the Parent component of this one

interface McqComponentProps {
    mcqList: MCQ[];
    categoryKey: keyof typeof Categories;
    meta: ReactNode;
    setUnvisitedQuestions: React.Dispatch<React.SetStateAction<number | undefined>>;
    variant: VARIANT;
    time?: number;
    onQuizOver: (result: any) => void
}

const McqComponent = ({
    mcqList,
    categoryKey,
    meta,
    onQuizOver,
    setUnvisitedQuestions,
    variant,
    time,
}: McqComponentProps) => {

    const [mcqIndex, setMcqIndex] = useState(0);
    const [attempted, setAttempted] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [inCorrectCount, setInCorrectCount] = useState(0);
    const [markedQuestions, setMarkedQuestions] = useState<MarkedQuestion[]>([]);
    const [timer, setTimer] = useState(time ? time : null);
    const [selectedOptions, setSelectedOptions] = useState<(OPTIONS | null)[]>([]);

    const [options, setOptions] = useState<OPTIONS[]>(['A', 'B', 'C', 'D']);

    // if quiz is a timed one
    useEffect(() => {
        if (timer === null) {
            return;
        }

        if (timer === 0) {
            if (variant === 'TEST') {
                onQuizOver({
                    markedQuestions,
                    totalMcqs: mcqList.length,
                    attemptedCount: attempted
                })
            }
            if (variant === 'QUIZ') {
                onQuizOver({
                    markedQuestions,
                    correctCount,
                    inCorrectCount,
                    totalMcqs: mcqList.length,
                    attemptedCount: attempted
                });
            }
        }

    }, [timer, variant]);

    useEffect(() => {

        setUnvisitedQuestions(mcqList.length - attempted);

        if (attempted === mcqList.length) {
            if (variant === 'QUIZ') {
                onQuizOver({
                    markedQuestions,
                    correctCount,
                    inCorrectCount,
                    totalMcqs: mcqList.length,
                    attemptedCount: attempted
                });
            }
            if (variant === 'TEST') {
                onQuizOver({
                    markedQuestions,
                    totalMcqs: mcqList.length,
                    attemptedCount: attempted
                });
            }
        }
        return;
    }, [attempted])

    const getCorrectOption = useCallback(() => {
        return mcqList[mcqIndex].answer;
    }, [mcqList, mcqIndex]);

    function prevButtonClickHandler() {
        if (mcqIndex === 0) {
            return;
        }
        setMcqIndex(prev => prev - 1);
    }

    //checks each submitted answer and saves it
    function answerSubmitHandler(markedOption: OPTIONS) {

        // if previously not marked
        if (markedQuestions.length === mcqIndex) {
            // new Question
            setAttempted(prev => prev + 1);

            const markedQuestion: MarkedQuestion = {
                question: mcqList[mcqIndex].question,
                image: mcqList[mcqIndex].image,
                correctAnswer: {
                    option: mcqList[mcqIndex].answer,
                    text: mcqList[mcqIndex][mcqList[mcqIndex].answer],
                },
                userAnswer: {
                    option: markedOption,
                    text: mcqList[mcqIndex][markedOption],
                },
            };

            setMarkedQuestions([...markedQuestions, markedQuestion]);
        }
        else {
            // update the previously answered question
            // {Exclusive for Test questions}
            const userAnswer = {
                option: markedOption,
                text: mcqList[mcqIndex][markedOption],
            }

            setMarkedQuestions(markedQuestions.map((obj, idx) => {
                return (
                    idx === mcqIndex
                        ? { ...obj, userAnswer: userAnswer }
                        : obj
                )
            }))

        }

        if (mcqIndex < mcqList.length - 1) {
            setMcqIndex(prev => prev + 1);
            // shuffle options
            setOptions(prev => [...shuffleOptions(prev, options.length)]);
        }

        if (variant === 'TEST') {
            // save marked option
            if (mcqIndex >= selectedOptions.length) {
                setSelectedOptions(prev => [...prev, markedOption]);
            }
            else {
                setSelectedOptions(prev =>
                    prev.map((option, index) =>
                        index === mcqIndex ? markedOption : option
                    )
                );
            }
            return;
        }

        // for simple quiz
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
                totalMcqs: mcqList.length,
                attemptedCount: attempted
            });
        }
        if (variant === 'QUIZ') {
            onQuizOver({
                markedQuestions,
                correctCount,
                inCorrectCount,
                totalMcqs: mcqList.length,
                attemptedCount: attempted
            });
        }
    }

    const contextValues: CompoundMcqContextType = {
        mcq: mcqList[mcqIndex],
        categoryKey: categoryKey,
        timer: timer,
        setTimer: setTimer,
        totalMcqs: mcqList.length,
        markedAnswers: markedQuestions,
        correctCount: correctCount,
        inCorrectCount: inCorrectCount,
        attemptedCount: attempted,
        variant: variant,
    }

    useEffect(() => {
        console.log(selectedOptions);
    }, [selectedOptions])

    useEffect(() => {
        console.log(markedQuestions);
    }, [markedQuestions])

    return (
        <div
            className={`
                flex
                flex-col
                content-center
                items-center
                bg-transparent 
                max-w-[90vw]
                sm:max-w-xl
                w-auto
                mx-auto 
                gap-4
            `}
        >
            <CompoundMcqContext.Provider value={contextValues}>
                {meta}
                <McqCard
                    key={mcqList[mcqIndex].question}
                    answerSubmitHandler={answerSubmitHandler}
                    defaultSelectedOption={
                        selectedOptions[mcqIndex]
                            ? selectedOptions[mcqIndex]
                            : null
                    }
                    prevButtonClickHandler={prevButtonClickHandler}
                    getCorrectOption={getCorrectOption}
                    header={<>
                        <McqCard.Question />
                        <McqCard.Image />
                    </>}
                    options={<>
                        <McqCard.Option option={options[0]} />
                        <McqCard.Option option={options[1]} />
                        <McqCard.Option option={options[2]} />
                        <McqCard.Option option={options[3]} />
                    </>}
                    footer={<div className='flex flex-col gap-2 w-full '>
                        <McqCard.NextButton />
                        <McqCard.PrevButton
                            show={Boolean(variant === 'TEST' && mcqIndex > 0)}
                        />
                    </div>}
                />
                <Button
                    onClick={handleQuizTerminate}
                    variant={'destructive'}
                    className={`
                            w-fit 
                            tracking-wider
                            text-lg
                            p-4
                        `}
                >
                    Terminate Quiz
                </Button>
            </CompoundMcqContext.Provider>
        </div >
    )
}

McqComponent.MetaData = McqComponentMetaData;
McqComponent.Category = Category;
McqComponent.Timer = QuizTimer;

export default McqComponent
