import UserForm from '../components/UserForm'
import useQuizQuestions, { RequestModes } from '../hooks/useQuizQuestions';
import { ReactNode, useEffect, useState } from 'react';
import CompoundMcq from '../components/CompoundMcq';
import { Categories, MarkedQuestion } from '../types';
import QuizResult from '../components/QuizResult';
import markedToCheckedQuestions from '../utils/markedToCheckedQuestions';
import OverButtons from '../components/OverButtons';
import { TestResult } from './TestPage';


/*
 * responsibility to fetch mcqs
 * and fetch mcq whenever category or mcqCount are changed
 */
export type SimpleResult = {
    markedQuestions: MarkedQuestion[],
    correctCount: number,
    inCorrectCount: number,
    totalMcqs: number,

}

export type handleFormSubmitParams = {
    category: Categories;
    mcqCount?: number;
    variant: RequestModes;
    timer?: number;
}

const QuizPage = () => {
    const { mcqList, setCategory, setMcqCount, variant, setVariant, timedRequests } = useQuizQuestions({})
    const { fetchTimedQuestions } = timedRequests;
    const [renderComponent, setRenderComponent] = useState<ReactNode>()
    const [unvisitedQuestions, setUnvisitedQuestions] = useState<number | undefined>(undefined);
    const [time, setTime] = useState<number | undefined>(undefined);


    // after user submits the form
    const handleFormSubmit = ({ category, mcqCount, variant, timer }: handleFormSubmitParams) => {
        setCategory(category);
        if (variant === 'TIMER') {
            console.log("timer", timer);
            setVariant('TIMER');
            setTime(timer);
        }
        else {
            setVariant('NO-TIMER');
            setMcqCount(mcqCount);
        }
    }

    // after the quiz has ended 
    // and user want's to retry with same questions
    const handleRetry = () => {
        setRenderComponent(
            <CompoundMcq
                mcqList={mcqList}
                meta={<CompoundMcq.MetaData
                    children={[
                        <CompoundMcq.MetaData.TotalMcqs key={"total mcq"} />,
                        <div className='flex flex-row gap-2'>
                            <CompoundMcq.MetaData.CorrectCount key={"correct count"} />
                            <CompoundMcq.MetaData.InCorrectCount key={"incorrect count"} />
                        </div>
                    ]}
                />}
                onQuizOver={onQuizOver}
                includeCount={true}
                setUnvisitedQuestions={setUnvisitedQuestions}
                time={time}
            />)
    }

    // user want to retake form
    const handleReset = () => {
        setCategory(undefined);
        if (variant === 'TIMER') {
            setTime(undefined);
        }
        if (variant === 'NO-TIMER') {
            setMcqCount(undefined);
        }
        setVariant(undefined);
    }

    // to fetch more mcqs from the server if having a timed quiz 
    useEffect(() => {
        console.log(`unvisitedQuestions :${unvisitedQuestions}`);
        if (unvisitedQuestions && unvisitedQuestions <= 5) {
            fetchTimedQuestions();
        }
    }, [unvisitedQuestions])

    // function to be executed after quiz is over
    // shows the result and reset any state that need to be reset
    const onQuizOver = (result: SimpleResult | TestResult) => {
        //setInitialRequest(true);
        if ('correctCount' in result && 'inCorrectCount' in result) {
            const { correctCount, inCorrectCount, totalMcqs, markedQuestions } = result;
            setRenderComponent(<>
                <QuizResult
                    checkedQuestions={markedToCheckedQuestions(markedQuestions)}
                    correctCount={correctCount}
                    inCorrectCount={inCorrectCount}
                    totalMcqs={totalMcqs}
                />
                <OverButtons
                    className='flex flex-row justify-center gap-x-12'
                    children={[
                        <OverButtons.RetryButton
                            className='bg-gray-50 text-black'
                            onClickHandler={handleRetry}
                        />,
                        <OverButtons.ResetButton
                            className='bg-gray-50 text-black'
                            onClickHandler={handleReset}
                        />
                    ]} />
            </>);
        }
    }

    // what UI to render 
    useEffect(() => {
        if (variant === undefined) {
            setRenderComponent(
                <>
                    <h1 className="text-3xl text-center font-bold">
                        Take a QUIZ
                    </h1>
                    <UserForm
                        onSubmit={handleFormSubmit}
                    >
                        <UserForm.CategoryList />
                        <UserForm.ChooseButtons />
                        <UserForm.McqCountField />
                        <UserForm.SetTimerField />
                        <UserForm.SubmitBtn />
                    </UserForm>
                </>)
        }
        if (variant === 'NO-TIMER' && mcqList.length !== 0) {
            setRenderComponent(
                <CompoundMcq
                    mcqList={mcqList}
                    meta={<CompoundMcq.MetaData
                        className={'justify-between px-4 py-2'}
                        children={[
                            <CompoundMcq.MetaData.TotalMcqs key={"total mcq"} />,
                            <div className='flex flex-row gap-2'>
                                <CompoundMcq.MetaData.CorrectCount key={"correct count"} />
                                <CompoundMcq.MetaData.InCorrectCount key={"incorrect count"} />
                            </div>
                        ]}
                    />}
                    onQuizOver={onQuizOver}
                    includeCount={true}
                    setUnvisitedQuestions={setUnvisitedQuestions}
                />)
        }
        if (variant === 'TIMER' && mcqList.length !== 0) {
            setRenderComponent(
                <>
                    <CompoundMcq
                        mcqList={mcqList}
                        meta={<CompoundMcq.MetaData
                            children={[
                                <CompoundMcq.MetaData.TotalMcqs key={"total mcq"} />,
                                <div className='flex flex-row gap-2'>
                                    <CompoundMcq.MetaData.CorrectCount key={"correct count"} />
                                    <CompoundMcq.MetaData.InCorrectCount key={"incorrect count"} />
                                </div>
                            ]}
                        />}
                        onQuizOver={onQuizOver}
                        includeCount={true}
                        setUnvisitedQuestions={setUnvisitedQuestions}
                        time={time}
                    />
                </>
            )
        }
    }, [variant, mcqList]);

    return (
        <div className="grid  mx-auto">
            <div className="flex flex-col gap-4">
                {renderComponent}
            </div>
        </div >
    )
}

export default QuizPage
