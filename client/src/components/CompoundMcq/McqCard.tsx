import React, { ReactNode, useState } from 'react'
import { Button } from '../../@/components/ui/button';
import { useMcqComponentContext } from '../../context/McqComponentContext';
import { Options } from '../../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../@/components/ui/card';
import { McqCardContext, useMcqCardContext } from '../../context/MCQCardContext';

interface Props {
    question: ReactNode;
    options: ReactNode[];
    submitButton: ReactNode;
    answerSubmitHandler: (markedOption: Options) => void;
}

const McqCard = ({ answerSubmitHandler, question, options, submitButton }: Props) => {
    const [selectedOption, setSelectedOption] = useState<Options>();

    const { mcq } = useMcqComponentContext();

    const optionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value as Options);
    }

    const onSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedOption) {
            return;
        }
        answerSubmitHandler(selectedOption);
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
            optionChangeHandler
        }} >
            <Card>
                <CardHeader>
                    {question}
                </CardHeader>
                <form onSubmit={onSubmitHandler} >
                    <CardFooter>
                        {submitButton}
                    </CardFooter>
                    <CardContent>
                        <div className='my-4'></div>
                        <section className='flex flex-col gap-2'>
                            {options}
                        </section>
                        <div className='my-8'></div>
                    </CardContent>
                </form>
            </Card>
        </McqCardContext.Provider>
    )
}

McqCard.Question = McqQuestion;
McqCard.Option = McqOption;
McqCard.SubmitButton = McqButton;

export default McqCard

function McqQuestion({ className }: { className?: string }) {
    const { mcq } = useMcqComponentContext();
    return (
        <CardTitle className={`${className}`}>
            {mcq.question}
        </CardTitle>
    )
}

function McqOption({ className, option }: { className?: string, option: 'A' | 'B' | 'C' | 'D' }) {
    const { optionChangeHandler, options } = useMcqCardContext();
    return (
        <fieldset className={`${className}flex flex-row gap-2`}>
            <input
                type='radio'
                name='option'
                id={option}
                key={options[option]}
                onChange={optionChangeHandler}
                value={option}
            />
            <label htmlFor={option}>{options[option]}</label>
        </fieldset>
    )
}

function McqButton({ className }: { className?: string }) {
    return (
        <Button className={className} type='submit'>Submit</Button>
    )
}
