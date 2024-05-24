import React, { ReactNode, useEffect, useState } from 'react'
import { Button } from '../../@/components/ui/button';
import { useMcqComponentContext } from '../../context/McqComponentContext';
import { Options } from '../../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../@/components/ui/card';
import { McqCardContext, useMcqCardContext } from '../../context/MCQCardContext';

interface Props {
    header: ReactNode[];
    footer?: ReactNode;
    options: ReactNode[];
    getCorrectOption: () => Options;
    answerSubmitHandler: (markedOption: Options) => void;
}

const McqCard = ({ getCorrectOption, answerSubmitHandler, header, footer, options }: Props) => {
    const [selectedOption, setSelectedOption] = useState<Options>();
    const [correctOption, setCorrectOption] = useState<Options | undefined>(undefined);

    const { mcq } = useMcqComponentContext();

    const optionChooseHandler = (option: Options): boolean | undefined => {
        const correct = getCorrectOption();
        console.log("correct", correct);

        setSelectedOption(option);
        if (correct) {
            setCorrectOption(correct);
            return correct === option;
        }

        return;
    }

    const onSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedOption) {
            return;
        }
        answerSubmitHandler(selectedOption);
        // clean the coloring state
        setSelectedOption(undefined);
        setCorrectOption(undefined);
    }

    return (
        <McqCardContext.Provider value={{
            question: mcq.question,
            options: {
                A: mcq.A,
                B: mcq.B,
                C: mcq.C,
                D: mcq.D
            },
            optionChooseHandler,
            selectedOption,
            correctOption,
        }} >
            <Card className=''>
                <CardHeader className='flex bg-slate-200 my-2'>
                    {header}
                </CardHeader>
                <form onSubmit={onSubmitHandler} >
                    <CardContent>
                        <div className='my-4'></div>
                        <section className='flex flex-col gap-2'>
                            {options}
                        </section>
                        <div className='my-8'></div>
                    </CardContent>
                    <CardFooter>
                        {footer}
                    </CardFooter>
                </form>
            </Card>
        </McqCardContext.Provider>
    )
}

McqCard.Question = McqQuestion;
McqCard.Option = McqOption;
McqCard.SubmitButton = McqButton;

export default McqCard;

function McqQuestion({ className }: { className?: string }) {
    const { mcq } = useMcqComponentContext();
    return (
        <CardTitle className={`${className}`}>
            {mcq.question}
        </CardTitle>
    )
}

function McqOption({ className, option }: { className?: string, option: 'A' | 'B' | 'C' | 'D' }) {
    const { optionChooseHandler, options, correctOption, selectedOption } = useMcqCardContext();
    const [bgColor, setBgColor] = useState("bg-gray-200");
    const [disable, setDisable] = useState<boolean>(false);

    useEffect(() => {
        // reset to default 
        if (!selectedOption) {
            setBgColor('bg-gray-200');
            setDisable(false);
        }
        // let the user choose only one time
        if (selectedOption && correctOption) {
            setDisable(true);
        }
        // for test questions
        if (!correctOption && selectedOption === option) {
            setBgColor('bg-blue-100');
        }
        // resetting if the user changed the option (only for test question)
        if (!correctOption && selectedOption !== option) {
            setBgColor('bg-gray-100');
        }
        // for quiz questions (after the user has guessed show them the correctOption)
        if (selectedOption && correctOption === option) {
            setBgColor('bg-green-200');
        }
    }, [correctOption, selectedOption]);


    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // getting the particular quetion correct or not status
        const isCorrect = optionChooseHandler(option);

        if (isCorrect === undefined)// must be a Test Question
            return;
        if (isCorrect) {
            setBgColor('bg-green-200');
        }
        else {
            setBgColor('bg-red-200');
        }
        return;
    }

    return (
        <>
            <Button
                key={options[option]}
                onClick={onClickHandler}
                className={`w-full ${bgColor} p-4 rounded-lg shadow text-black font-bold ${className}`}
                disabled={disable}
            >
                {options[option]}
            </Button>
        </>
    )
}

function McqButton({ className }: { className?: string }) {
    const { selectedOption } = useMcqCardContext();
    return (
        Boolean(selectedOption) &&
        <Button className={className} type='submit'>Next</Button>
    )
}
