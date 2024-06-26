import { useCallback, useEffect, useRef, useState } from "react";
import { Categories, MCQ, RequestModes } from "../types";
import toast from "react-hot-toast";

const notify = (message: string) => (toast.error(message, {
    style: {
        textAlign: 'center'
    }
}))

const API_URL = import.meta.env.VITE_API_URL;

type useTestQuestionsParams = {
    defaultCategoryValue?: Categories,
    defaultMCQCount?: number,
    defaultVariant?: RequestModes,
};

const useTestQuestions = ({ defaultCategoryValue, defaultMCQCount, defaultVariant }: useTestQuestionsParams) => {
    const [category, setCategory] = useState<Categories | undefined>(defaultCategoryValue);
    const [mcqCount, setMcqCount] = useState<number | undefined>(defaultMCQCount);
    const [mcqList, setMcqList] = useState<MCQ[]>([]);
    const [variant, setVariant] = useState<RequestModes | undefined>(defaultVariant);

    const [initialRequest, setInitialRequest] = useState(true);

    const [isFetching, setIsFetching] = useState(false);
    const timerReqAbortRef = useRef<AbortController | null>(null);

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
            const res = await fetch(`${API_URL}/api/quiz/test/questions/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category, mcqCount }),
                credentials: 'include'
            });
            if (!res.ok) {
                console.log("failed");
                notify(`error getting questions \n please try again`);
                setVariant(undefined);
                return;
            }
            const data = await res.json() as MCQ[];
            // console.log(data);
            // set the MCQ LIST state
            setMcqList(data);
        }
        catch (err) {
            console.log(err);
            notify(`error getting questions \n please try again`);
            setVariant(undefined);
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

        if (isFetching || timerReqAbortRef.current) {
            return;
        }

        timerReqAbortRef.current = new AbortController();
        const signal = timerReqAbortRef.current.signal;

        let isAborted = false;

        try {
            setIsFetching(true);
            const res = await fetch(`${API_URL}/api/quiz/test/questions/timer`, {
                method: 'POST',
                signal: signal,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category, initialRequest: initialRequest }),
                credentials: 'include'
            });
            if (!res.ok) {
                console.log("failed");
                notify(`error getting questions \n please try again`);
                setVariant(undefined);
                return;
            }
            const data = await res.json() as MCQ[];
            // set the MCQ LIST state
            if (initialRequest) {
                setInitialRequest(false);
                setMcqList(data);
                return;
            }
            setMcqList(prev => [...prev, ...data]);
        }
        catch (err) {
            console.log(err);
            if (err.name === 'AbortError') {
                isAborted = true;
                return;
            }
            notify(`error getting questions \n please try again`);
            setVariant(undefined);
        }
        finally {
            if (isAborted) {
                timerReqAbortRef.current = null;
                return;
            }
            timerReqAbortRef.current = null;
            setIsFetching(false);
        }
    }, [variant, category, initialRequest])

    useEffect(() => {
        if (variant === undefined) {
            setInitialRequest(true);
            setMcqList([]);
            setIsFetching(false);
        }
        if (variant === 'NO-TIMER')
            fetchQuestions();
        if (variant === 'TIMER')
            fetchTimedQuestions();
    }, [variant]);

    return {
        mcqList,
        category,
        variant,
        setCategory,
        setMcqCount,
        setVariant,
        isFetching,
        setIsFetching,
        WithTimer: {
            fetchTimedQuestions,
            timerReqAbortRef,
        }
    };
}

export default useTestQuestions;
