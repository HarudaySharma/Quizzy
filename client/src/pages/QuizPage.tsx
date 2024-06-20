import UserForm from '../components/UserForm'
import useQuizQuestions from '../hooks/useQuizQuestions';
import { ReactNode, useEffect, useState, useCallback } from 'react';
import CompoundMcq from '../components/CompoundMcq';
import { Categories, VARIANT, handleFormSubmitParams } from '../types';
import QuizResult from '../components/QuizResult';
import markedToCheckedQuestions from '../utils/markedToCheckedQuestions';
import OverButtons from '../components/OverButtons';
import changeLayoutColor from '../utils/changeCssVariables';
import clsx from 'clsx';
import LoadingModal from '../components/LoadingModal';


/*
 * responsibility to fetch mcqs
 * and fetch mcq whenever category or mcqCount are changed
 */

const QuizPage = () => {

    const {
        mcqList,
        setCategory,
        setMcqCount,
        variant,
        setVariant,
        isFetching,
        timedRequests: {
            fetchTimedQuestions
        } } = useQuizQuestions({});

    const [renderComponent, setRenderComponent] = useState<ReactNode>()
    const [unvisitedQuestions, setUnvisitedQuestions] = useState<number | undefined>(undefined);
    const [time, setTime] = useState<number | undefined>(undefined);

    const [pageHeight, setPageHeight] = useState('h-screen');

    const [categoryKey, setCategoryKey] = useState<keyof typeof Categories | undefined>(undefined);

    useEffect(() => {
        changeLayoutColor('white');
    }, []);

    // after user submits the form
    const handleFormSubmit = useCallback(({ categoryKey: categoryKey, mcqCount, requestMode, timer }: handleFormSubmitParams) => {
        console.log({ categoryKey, mcqCount, requestMode, timer });

        setCategory(Categories[categoryKey]);
        setCategoryKey(categoryKey);

        if (requestMode === 'TIMER') {
            setVariant('TIMER');
            setTime(timer);
        }
        else {
            setVariant('NO-TIMER');
            setMcqCount(mcqCount);
        }
    }, [setVariant, setCategory, setTime, setMcqCount]);


    // after the quiz has ended 
    // and user want's to retry with same questions
    const handleRetry = () => {
        setRenderComponent(
            <CompoundMcq
                mcqList={mcqList}
                categoryKey={categoryKey!}
                meta={<>
                    <CompoundMcq.MetaData>
                        <CompoundMcq.MetaData.TotalMcqs
                            showLoading={isFetching}
                        />
                        <div className='flex flex-row gap-2'>
                            <CompoundMcq.MetaData.CorrectCount />
                            <CompoundMcq.MetaData.InCorrectCount />
                        </div>
                    </CompoundMcq.MetaData >
                    <CompoundMcq.Timer />
                    <CompoundMcq.Category />
                </>}
                onQuizOver={onQuizOver}
                setUnvisitedQuestions={setUnvisitedQuestions}
                time={time}
                variant='QUIZ'
            />)
    }

    // user want to retake form
    const handleReset = () => {
        // reset all the states
        setCategory(undefined);
        setUnvisitedQuestions(undefined);
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
        if (isFetching) {
            return;
        }

        if (unvisitedQuestions && unvisitedQuestions <= 5) {
            fetchTimedQuestions();
        }
    }, [unvisitedQuestions])

    // function to be executed after quiz is over
    // shows the result and reset any state that need to be reset
    const onQuizOver = (result: any) => {
        //setInitialRequest(true);

        setPageHeight('');

        if (result.variant as VARIANT === 'TEST')
            return null;

        const {
            correctCount,
            inCorrectCount,
            attemptedCount,
            totalMcqs,
            markedQuestions
        } = result;

        setRenderComponent(<>
            <QuizResult
                categoryKey={categoryKey!}
                checkedQuestions={markedToCheckedQuestions(markedQuestions)}
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

    // what UI to render 
    useEffect(() => {
        if (variant === 'NO-TIMER' && mcqList.length !== 0) {

            setPageHeight('h-screen');

            setRenderComponent(
                <CompoundMcq
                    mcqList={mcqList}
                    categoryKey={categoryKey!}
                    meta={<>
                        <CompoundMcq.MetaData>
                            <CompoundMcq.MetaData.TotalMcqs
                                showLoading={isFetching}
                            />
                            <div className='flex flex-wrap justify-center flex-row gap-2'>
                                <CompoundMcq.MetaData.CorrectCount />
                                <CompoundMcq.MetaData.InCorrectCount />
                            </div>
                        </CompoundMcq.MetaData>
                        <CompoundMcq.Category />
                    </>}
                    onQuizOver={onQuizOver}
                    setUnvisitedQuestions={setUnvisitedQuestions}
                    variant='QUIZ'
                />)
            return;
        }
        if (variant === 'TIMER' && mcqList.length !== 0) {

            setRenderComponent(
                <CompoundMcq
                    mcqList={mcqList}
                    categoryKey={categoryKey!}
                    meta={<>
                        <CompoundMcq.MetaData>
                            <>
                                <CompoundMcq.MetaData.TotalMcqs
                                    showLoading={isFetching}
                                />
                                <div className='flex flex-row gap-2'>
                                    <CompoundMcq.MetaData.CorrectCount />
                                    <CompoundMcq.MetaData.InCorrectCount />
                                </div>
                            </>
                        </CompoundMcq.MetaData>
                        <CompoundMcq.Timer />
                        <CompoundMcq.Category />
                    </>}
                    onQuizOver={onQuizOver}
                    variant='QUIZ'
                    setUnvisitedQuestions={setUnvisitedQuestions}
                    time={time}
                />)
            return;
        }

        if ((variant === undefined && mcqList.length === 0)
            || (unvisitedQuestions === undefined && mcqList.length === 0)) {
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
                    {isFetching && <LoadingModal />}
                </>)
            return;
        }
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
        </div>
    )
}

export default QuizPage

