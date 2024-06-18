import { ReactNode, useCallback, useEffect, useState } from 'react';
import UserForm from '../components/UserForm'
import CompoundMcq from '../components/CompoundMcq';
import { CheckedQuestion, MarkedQuestion, handleFormSubmitParams } from '../types';
import QuizResult from '../components/QuizResult';
import OverButtons from '../components/OverButtons';
import useTestQuestions from '../hooks/useTestQuestions';
import fetchCheckedAnswers from '../utils/fetchCheckedAnswers';
import analyseCheckedQuestions from '../utils/analyseCheckedAnswers';
import { Button } from '../@/components/ui/button';
import changeLayoutColor from '../utils/changeCssVariables';
import clsx from 'clsx';
import LoadingModal from '../components/LoadingModal';

/*
 * responsibility to fetch mcqs
 * and fetch mcq whenever category or mcqCount are changed
 */
export type TestResult = {
    markedQuestions: MarkedQuestion[];
    totalMcqs: number;
    attemptedCount: number;
}

const TestPage = () => {
    const {
        mcqList,
        setCategory,
        setMcqCount,
        category,
        variant,
        isFetching,
        setVariant,
        WithTimer: {
            fetchTimedQuestions,
        }
    } = useTestQuestions({})

    const [renderComponent, setRenderComponent] = useState<ReactNode>()

    const [unvisitedQuestions, setUnvisitedQuestions] = useState<number | undefined>(undefined);
    const [time, setTime] = useState<number | undefined>(undefined);

    const [pageHeight, setPageHeight] = useState('h-screen');

    const handleFormSubmit = useCallback(({ category, mcqCount, requestMode, timer }: handleFormSubmitParams) => {

        setCategory(category);

        if (requestMode === 'TIMER') {
            setVariant('TIMER');
            setTime(timer);
        }
        else {
            setVariant('NO-TIMER');
            setMcqCount(mcqCount);
        }
    }, [setVariant, setCategory, setTime, setMcqCount]);


    const handleRetry = () => {
        setRenderComponent(
            <CompoundMcq
                mcqList={mcqList}
                category={category!}
                meta={<>
                    <CompoundMcq.MetaData>
                        <CompoundMcq.MetaData.TotalMcqs
                            showLoading={isFetching}
                        />
                        <div className='flex flex-row gap-2'>
                            <CompoundMcq.MetaData.AttemptedCount />
                            <CompoundMcq.MetaData.UnAttemptedCount />
                        </div>
                    </CompoundMcq.MetaData>
                    <CompoundMcq.Timer />
                    <CompoundMcq.Category />
                </>}
                onQuizOver={onQuizOver}
                setUnvisitedQuestions={setUnvisitedQuestions}
                variant='TEST'
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

    useEffect(() => {
        changeLayoutColor('white');
    }, []);

    // to fetch more mcqs from the server if having a timed quiz 
    useEffect(() => {

        if (isFetching) {
            return;
        }

        console.log(`unvisitedQuestions :${unvisitedQuestions}`);
        if (unvisitedQuestions && unvisitedQuestions <= 5) {
            fetchTimedQuestions();
        }
    }, [unvisitedQuestions])

    // function to be executed after quiz is over
    // shows the result and reset any state that need to be reset
    const onQuizOver = async ({ markedQuestions, totalMcqs, attemptedCount }: TestResult) => {

        if (!category)
            return;

        setPageHeight('');

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
                        {/*<Button
                            className={`w-fit py-4 px-12`}
                            onClick={() => onQuizOver({ markedQuestions, totalMcqs })}>
                            Retry
                        </Button>*/}
                    </div>
                </div>
            );
            return
        }

        const { correctCount, inCorrectCount } = analyseCheckedQuestions(checkedQuestions);

        setRenderComponent(<>
            <QuizResult
                category={category}
                checkedQuestions={checkedQuestions}
                correctCount={correctCount}
                inCorrectCount={inCorrectCount}
                totalMcqs={totalMcqs}
                attemptedCount={attemptedCount}
            />
            <OverButtons
                className='flex flex-row justify-center gap-x-12'
            >
                <OverButtons.RetryButton
                    className='bg-gray-50 text-black'
                    onClickHandler={handleRetry}
                />
                <OverButtons.ResetButton
                    className='bg-gray-50 text-black'
                    onClickHandler={handleReset}
                />
            </OverButtons >
        </>);
    }

    useEffect(() => {
        if (variant === 'NO-TIMER' && mcqList.length !== 0) {
            setRenderComponent(
                <CompoundMcq
                    mcqList={mcqList}
                    category={category!}
                    meta={<>
                        <CompoundMcq.MetaData>
                            <CompoundMcq.MetaData.TotalMcqs
                                showLoading={isFetching}
                            />
                            <div className='flex flex-row gap-2'>
                                <CompoundMcq.MetaData.AttemptedCount />
                                <CompoundMcq.MetaData.UnAttemptedCount />
                            </div>
                        </CompoundMcq.MetaData>
                        <CompoundMcq.Category />
                    </>}
                    onQuizOver={onQuizOver}
                    variant='TEST'
                    setUnvisitedQuestions={setUnvisitedQuestions}
                />)
            return;
        }
        if (variant === 'TIMER' && mcqList.length !== 0) {
            setRenderComponent(
                <CompoundMcq
                    mcqList={mcqList}
                    category={category!}
                    meta={<>
                        <CompoundMcq.MetaData>
                            <CompoundMcq.MetaData.TotalMcqs
                                showLoading={isFetching}
                            />
                            <div className='flex flex-row gap-2'>
                                <CompoundMcq.MetaData.AttemptedCount />
                                <CompoundMcq.MetaData.UnAttemptedCount />
                            </div>
                        </CompoundMcq.MetaData>
                        <CompoundMcq.Category />
                        <CompoundMcq.Timer />
                    </>}
                    onQuizOver={onQuizOver}
                    variant='TEST'
                    setUnvisitedQuestions={setUnvisitedQuestions}
                    time={time}
                />)
            return;
        }

        // Test Form
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
                {isFetching && <LoadingModal />}
            </>)
        return;
    }, [variant, mcqList, isFetching]);

    return (
        <div className={clsx(`
                w-full  
                flex 
                items-center 
                justify-center
            `,
            `sm:${pageHeight}`
        )}
        >
            <div
                className="
                    flex 
                    flex-col 
                    gap-4
                "
            >
                {renderComponent}
            </div>
        </div >
    )
}

export default TestPage
