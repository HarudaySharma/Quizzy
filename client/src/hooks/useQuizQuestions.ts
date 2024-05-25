import { useCallback, useEffect, useState } from "react";
import { Categories, MCQ } from "../types";

export type RequestModes = 'TIMER' | 'NO-TIMER';

type useQuizQuestionsParams = {
    defaultCategoryValue?: Categories,
    defaultMCQCount?: number,
    defaultVariant?: RequestModes,
}

const useQuizQuestions = ({ defaultCategoryValue, defaultMCQCount, defaultVariant }: useQuizQuestionsParams) => {
    const [category, setCategory] = useState<Categories | undefined>(defaultCategoryValue);
    const [mcqCount, setMcqCount] = useState<number | undefined>(defaultMCQCount);
    const [mcqList, setMcqList] = useState<MCQ[]>([]);
    const [variant, setVariant] = useState<RequestModes | undefined>(defaultVariant);

    const [initialRequest, setInitialRequest] = useState<boolean>(true);

    const fetchQuestions = useCallback(async () => {
        if (!category || !mcqCount) {
            setMcqList([]);
            return;
        }
        try {
            const res = await fetch('https://quiz-app-server-nine.vercel.app/api/quiz/questions/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category, mcqCount })
            });
            if (!res.ok) {
                console.log("failed");
                return;
            }
            const data = await res.json() as MCQ[];
            console.log(data);
            // set the MCQ LIST state
            setMcqList(data);
        }
        catch (err) {
            console.log(err);
        }
    }, [mcqCount, category])

    const fetchTimedQuestions = useCallback(async () => {
        if (!category || variant !== 'TIMER') {
            setMcqList([]);
            return;
        }
        console.log('fetching timed questions');
        try {
            const res = await fetch('https://quiz-app-server-nine.vercel.app/api/quiz/questions/timer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category, initialRequest: initialRequest })
            });
            if (!res.ok) {
                console.log("failed");
                return;
            }
            const data = await res.json() as MCQ[];
            // set the MCQ LIST state
            if (initialRequest) {
                setInitialRequest(false);
                setMcqList(data);
                return;
            }
            else {
                setMcqList(prev => [...prev, ...data]);
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [variant, category, initialRequest])


    useEffect(() => {
        if (variant === undefined) {
            setInitialRequest(true);
            setMcqList([]);
        }
        if (variant === 'NO-TIMER')
            fetchQuestions();
        if (variant === 'TIMER')
            fetchTimedQuestions();
    }, [variant]);

    return {
        mcqList,
        setCategory,
        setMcqCount,
        variant,
        setVariant,
        timedRequests: {
            fetchTimedQuestions,
        }
    };
}

export default useQuizQuestions;
