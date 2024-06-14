import { useCallback, useEffect, useState } from "react";
import { Categories, MCQ, RequestModes } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

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

    const [isFetching, setIsFetching] = useState<boolean>(false);


    const fetchQuestions = useCallback(async () => {
        if (!category || !mcqCount) {
            setMcqList([]);
            return;
        }

        if (isFetching) {
            return;
        }

        try {
            setIsFetching(true);
            const res = await fetch(`${API_URL}/api/quiz/questions/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category, mcqCount }),
                credentials: 'include'
            });
            if (!res.ok) {
                console.log("failed");
                return;
            }
            const data = await res.json() as MCQ[];
            //console.log(data);

            // set the MCQ LIST state
            setMcqList(data);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsFetching(false);
        }
    }, [mcqCount, category])

    const fetchTimedQuestions = useCallback(async () => {
        if (!category || variant !== 'TIMER') {
            setMcqList([]);
            return;
        }

        if (isFetching) {
            return;
        }

        console.log('fetching timed questions');
        try {
            setIsFetching(true);
            const res = await fetch(`${API_URL}/api/quiz/questions/timer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category, initialRequest: initialRequest }),
                credentials: 'include'
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
        finally {
            setIsFetching(false);
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
        isFetching,
        timedRequests: {
            fetchTimedQuestions,
        }
    };
}

export default useQuizQuestions;
