import { createContext, useContext } from "react";
import { Options } from "../types";

type McqComponentContextTypes = {
    question: string,
    options: {
        A: string,
        B: string,
        C: string,
        D: string,
    }
    selectedOption: Options | undefined;
    correctOption?: Options;
    optionChoosed?: Options;
    optionChooseHandler: (option: Options) => boolean | undefined;
}

export const McqCardContext = createContext<McqComponentContextTypes | undefined>(undefined);

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
        correctOption: context.correctOption,
    }
}

