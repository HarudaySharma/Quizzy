import React, { ReactNode, useEffect, useState } from 'react'
import { useMcqComponentContext } from '../../../context/McqComponentContext';
import { OPTIONS } from '../../../types';
import { Card, CardContent, CardFooter, CardHeader } from '../../../@/components/ui/card';
import { McqCardContext, McqCardContextTypes } from '../../../context/MCQCardContext';
import McqQuestion from './McqQuestion';
import McqOption from './McqOption';
import McqNextButton from './McqNextButton';
import McqPrevButton from './McqPrevButton';
import McqImage from './McqImage';

interface Props {
    header: ReactNode;
    footer?: ReactNode;
    options: ReactNode;
    defaultSelectedOption: OPTIONS | null;
    getCorrectOption?: () => OPTIONS;
    answerSubmitHandler: (markedOption: OPTIONS) => void;
    prevButtonClickHandler: () => void;
}

const McqCard = ({
    getCorrectOption,
    answerSubmitHandler,
    prevButtonClickHandler,
    defaultSelectedOption,
    header,
    footer,
    options,
}: Props) => {

    const [selectedOption, setSelectedOption] = useState<OPTIONS | null>(defaultSelectedOption);
    const [correctOption, setCorrectOption] = useState<OPTIONS | null>(null);

    const {
        mcq,
        variant,
    } = useMcqComponentContext();

    useEffect(() => {
        setSelectedOption(defaultSelectedOption);
    }, [defaultSelectedOption]);

    const optionChooseHandler = (option: OPTIONS): boolean | null => {
        if (variant === 'TEST' || !getCorrectOption) {
            setSelectedOption(option);
            return null;
        }

        const correct = getCorrectOption();

        setCorrectOption(correct);
        setSelectedOption(option);

        return correct === option;
    }

    const onSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedOption) {
            return;
        }

        answerSubmitHandler(selectedOption);

        // clean the coloring state
        setSelectedOption(null);
        setCorrectOption(null);
    }

    const contextValues: McqCardContextTypes = {
        question: mcq.question,
        image: mcq.image,
        options: {
            A: mcq.A,
            B: mcq.B,
            C: mcq.C,
            D: mcq.D
        },
        optionChooseHandler,
        prevButtonClickHandler,
        selectedOption,
        optionChoosed: null,
        correctOption,
        variant: variant,
    }

    return (
        <McqCardContext.Provider value={contextValues} >
            <Card
                className='
                    flex
                    flex-col
                '
            >
                <CardHeader className='flex'>
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
McqCard.Image = McqImage;
McqCard.Option = McqOption;
McqCard.NextButton = McqNextButton;
McqCard.PrevButton = McqPrevButton;

export default McqCard;



