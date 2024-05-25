import { ReactNode, useEffect, useState } from 'react';
import UserForm from '../components/UserForm'
import CompoundMcq from '../components/CompoundMcq';
import { CheckedQuestion, MarkedQuestion } from '../types';
import QuizResult from '../components/QuizResult';
import OverButtons from '../components/OverButtons';
import useTestQuestions from '../hooks/useTestQuestions';
import fetchCheckedAnswers from '../utils/fetchCheckedAnswers';
import analyseCheckedQuestions from '../utils/analyseCheckedAnswers';
import { handleFormSubmitParams } from './QuizPage';
import { Button } from '../@/components/ui/button';


/*
 * responsibility to fetch mcqs
 * and fetch mcq whenever category or mcqCount are changed
 */
export type TestResult = {
    markedQuestions: MarkedQuestion[],
    totalMcqs: number,
}

const TestPage = () => {
    const { mcqList, setCategory, setMcqCount, category, variant, setVariant, WithTimer } = useTestQuestions({})
    const { fetchTimedQuestions } = WithTimer;

    const [renderComponent, setRenderComponent] = useState<ReactNode>()

    const [unvisitedQuestions, setUnvisitedQuestions] = useState<number | undefined>(undefined);
    const [time, setTime] = useState<number | undefined>(undefined);


    const handleFormSubmit = ({ category, mcqCount, variant, timer }: handleFormSubmitParams) => {
        setVariant(variant);
        setCategory(category);
        if (variant === 'TIMER') {
            setVariant('TIMER');
            setTime(timer);
        }
        else {
            setVariant('NO-TIMER');
            setMcqCount(mcqCount);
        }
    }


    const handleRetry = () => {
        setRenderComponent(
            <CompoundMcq
                mcqList={mcqList}
                meta={<CompoundMcq.MetaData
                    children={[
                        <CompoundMcq.MetaData.TotalMcqs />,
                    ]}
                />}
                onQuizOver={onQuizOver}
                includeCount={false}
                setUnvisitedQuestions={setUnvisitedQuestions}
                time={time}
            />)
    }

    const handleReset = () => {
        if (variant === 'TIMER') {
            setTime(undefined);
        }
        if (variant === 'NO-TIMER') {
            setMcqCount(undefined);
        }
        setCategory(undefined);
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
    const onQuizOver = async ({ markedQuestions, totalMcqs }: TestResult) => {
        if (!category)
            return;
        let checkedQuestions: CheckedQuestion[];
        try {
            checkedQuestions = await fetchCheckedAnswers(category, markedQuestions);
        }
        catch (err) {
            console.log(err);
            // show retry connection btn
            setRenderComponent(() =>
                <div className='h-screen grid justify-center items-center'>
                    <div>
                        <div className='text-red-400 bold'> failed to fetch result</div>
                        <Button
                            className={`w-fit py-4 px-12`}
                            onClick={() => onQuizOver({ markedQuestions, totalMcqs })}>
                            Retry
                        </Button>
                    </div>
                </div>
            );
            return
        }
        const { correctCount, inCorrectCount } = analyseCheckedQuestions(checkedQuestions);
        setRenderComponent(<>
            <QuizResult
                checkedQuestions={checkedQuestions}
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

    useEffect(() => {
        if (variant === undefined) {
            setRenderComponent(
                <>
                    <h1 className="text-3xl text-center font-bold">
                        Take a TEST
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
                        children={[
                            <CompoundMcq.MetaData.TotalMcqs />,
                            <CompoundMcq.MetaData.AttemptedCount />
                        ]}
                    />}
                    onQuizOver={onQuizOver}
                    includeCount={false}
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
                                <CompoundMcq.MetaData.TotalMcqs />,
                                <CompoundMcq.MetaData.AttemptedCount />
                            ]}
                        />}
                        onQuizOver={onQuizOver}
                        includeCount={false}
                        setUnvisitedQuestions={setUnvisitedQuestions}
                        time={time}
                    />
                </>
            )
        }
    }, [variant, mcqList]);

    return (
        <div className="grid max-w-screen-2xl bg-sky-50 mx-auto">
            <div className="flex flex-col gap-4">
                {renderComponent}
            </div>
        </div >
    )
}

export default TestPage
