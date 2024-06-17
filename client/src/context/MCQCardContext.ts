import { createContext, useContext } from "react";
import { OPTIONS, VARIANT } from "../types";

export type McqCardContextTypes = {
    question: string,
    options: {
        A: string,
        B: string,
        C: string,
        D: string,
    }
    selectedOption: OPTIONS | null;
    correctOption: OPTIONS | null;
    optionChoosed: OPTIONS | null;
    optionChooseHandler: (option: OPTIONS) => boolean | null;
    prevButtonClickHandler: () => void;
    variant: VARIANT;
}

export const McqCardContext = createContext<McqCardContextTypes | undefined>(undefined);

export const useMcqCardContext = () => {
    const context = useContext(McqCardContext);
    if (!context) {
        throw new Error('error at McqCardContext');
    }
    return {
        question: context.question,
        options: context.options,
        selectedOption: context.selectedOption,
        optionChooseHandler: context.optionChooseHandler,
        prevButtonClickHandler: context.prevButtonClickHandler,
        correctOption: context.correctOption,
        variant: context.variant,
    }
}

