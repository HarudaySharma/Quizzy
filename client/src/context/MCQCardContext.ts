import { createContext, useContext } from "react";

type McqComponentContextTypes = {
    question: string,
    options: {
        A: string,
        B: string,
        C: string,
        D: string,
    }
    optionChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const McqCardContext = createContext<McqComponentContextTypes | undefined>(undefined);

export const useMcqCardContext = () => {
    const context = useContext(McqCardContext);
    if (!context) {
        throw new Error('error at McqCardContext');
    }
    return {
        question: context.question,
        options:  context.options,
        optionChangeHandler: context.optionChangeHandler
    }
}

