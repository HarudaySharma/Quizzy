import { useEffect, useMemo, useState } from "react";
import { useMcqCardContext } from "../../../context/MCQCardContext";
import clsx from "clsx";
import { Button } from "../../../@/components/ui/button";
import { OPTIONS } from "../../../types";

type ButtonColors = 'gray' | "blue" | "green" | "red";
type ButtonBoldness = 200 | 100;

function McqOption({ className, option }: { className?: string, option: OPTIONS }) {
    const {
        optionChooseHandler,
        options,
        correctOption,
        selectedOption,
        variant,
    } = useMcqCardContext();

    const [color, setColor] = useState<ButtonColors>("gray");
    const [bold, setBoldness] = useState<ButtonBoldness>(200);
    const [disable, setDisable] = useState<boolean>(false);

    const getClasses = useMemo(() => {
        const baseClasses = `
            w-full
            p-8
            text-gray-900
            font-lg
            leading-6
            tracking-wider
            rounded-lg 
            shadow
            active:outline-none 
            active:ring-4
            disabled:opacity-100
        `;
        const bgClasses = {
            gray: bold === 100 ? 'bg-gray-100' : 'bg-gray-200',
            blue: bold === 100 ? 'bg-blue-100' : 'bg-blue-200',
            green: bold === 100 ? 'bg-green-100' : 'bg-green-200',
            red: bold === 100 ? 'bg-red-100' : 'bg-red-200'
        };
        const hoverClasses = {
            gray: 'hover:bg-gray-400',
            blue: 'hover:bg-blue-200',
            green: 'hover:bg-green-400',
            red: 'hover:bg-red-400'
        };
        const ringClasses = {
            gray: 'active:ring-gray-200',
            blue: 'active:ring-blue-200',
            green: 'active:ring-green-200',
            red: 'active:ring-red-200'
        };

        return clsx(
            baseClasses,
            bgClasses[color],
            hoverClasses[color],
            ringClasses[color],
            className
        );
    }, [bold, color]);

    useEffect(() => {
        // reset to default 
        if (selectedOption === null) {
            setColor('gray');
            setBoldness(200);
            setDisable(false);
            return;
        }

        if (variant === 'TEST') {
            if (selectedOption === option) {
                setColor('blue');
                setBoldness(100);
            }
            // for test questions
            // resetting if the user changed the option (only for test question)
            if (selectedOption !== option) {
                setColor('gray');
                setBoldness(200);
            }
        }

        if (variant === 'QUIZ') {
            // for quiz questions (after the user has guessed show them the correctOption)
            if (selectedOption && correctOption === option) {
                setColor('green');
                setBoldness(200);
            }
            // let the user choose only one option at a time
            if (selectedOption !== null && correctOption !== null) {
                setDisable(true);
            }
        }
        return;
    }, [correctOption, selectedOption, variant]);


    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // getting the particular quetion correct or not status
        const isCorrect = optionChooseHandler(option);

        if (isCorrect === null)// must be a Test Question
            return;

        if (isCorrect) {
            setColor('green');
            setBoldness(200);
        }
        else {
            setColor('red');
            setBoldness(200);
        }
        return;
    }

    return (
        <>
            <Button
                key={options[option]}
                variant={'outline'}
                onClick={onClickHandler}
                className={getClasses}
                disabled={disable}
            >
                {options[option]}
            </Button>
        </>
    )
}

export default McqOption;
