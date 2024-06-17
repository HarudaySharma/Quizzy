import { Card, CardContent, CardHeader } from '../@/components/ui/card';
import { CheckedQuestion } from '../types';
import { LayoutListIcon } from 'lucide-react';
import { Categories } from '../types/index';
import clsx from 'clsx';
import { BiCategory } from 'react-icons/bi';
import { GoCheckCircle, GoXCircle } from 'react-icons/go';
import {
    TbSquareLetterA,
    TbSquareLetterU,
} from 'react-icons/tb';

import { useState } from 'react';
import ToolTip from './ToolTip';
import { ImCross } from 'react-icons/im';
import { TiTick } from 'react-icons/ti';

interface Props {
    checkedQuestions: CheckedQuestion[];
    correctCount: number;
    inCorrectCount: number;
    totalMcqs: number;
    attemptedCount?: number;
    category: Categories;
}

const QuizResult = ({
    checkedQuestions,
    category,
    correctCount,
    inCorrectCount,
    totalMcqs,
    attemptedCount,
}: Props) => {

    const [tooltip, setTooltip] = useState({ visible: false, title: '', x: 0, y: 0 });

    const handleTap = (event: React.TouchEvent<HTMLDivElement>, title: string) => {

        if (!event.touches || !Boolean(event.touches.length)) {
            return;
        }

        // For touch events
        let x = event.touches[0].clientX;
        let y = event.touches[0].clientY;

        setTooltip({ visible: true, title, x, y });
    };


    const handleHide = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    const List = () => {
        return (
            <div
                className='
                    flex 
                    flex-col
                    max-h-[94vh]
                    max-w-[98vw]
                    sm:max-w-xl
                    overflow-scroll
                    gap-2
                    p-1
                '
            >
                {
                    checkedQuestions.map((obj, idx) =>
                        <Card
                            key={idx}
                            className='
                                border-gray-300
                                border-2
                                rounded-2xl
                                flex
                                flex-col
                                items-center
                                tracking-wider
                            '
                        >
                            <CardHeader
                                className='
                                    flex 
                                    flex-col
                                    w-fit 
                                '
                            >
                                <div className='w-fit font-bold self-center'>
                                    {idx + 1}.
                                </div>
                                {Boolean(obj.question) && <div
                                    className='
                                        w-fit 
                                        flex-start
                                        p-2
                                        rounded-lg
                                        outline
                                        outline-2
                                        outline-gray-400
                                    '
                                >
                                    {obj.question}
                                </div>}
                                {Boolean(obj.image) &&
                                    <img
                                        src={`http://localhost:3000${obj.image}`}
                                        alt="image"
                                        className="
                                            w-[16em]
                                            h-[8em]
                                            sm:w-[24em]
                                            sm:h-[12em]
                                            outline
                                            outline-1
                                            outline-gray-400
                                            rounded-md
                                            p-2
                                        "
                                    />}
                            </CardHeader>
                            <CardContent
                                className='
                                    flex 
                                    flex-col 
                                    gap-2
                                    items-center
                                    justify-center
                                    w-fit
                                '
                            >
                                <div
                                    className='
                                        w-fit 
                                        p-2
                                        flex 
                                        flex-row 
                                        relative
                                        gap-2
                                    '
                                >
                                    <div
                                        className={clsx(`
                                            p-2
                                            rounded-md
                                            font-semibold
                                            w-fit
                                         `,
                                            obj.correctAnswer.option === obj.userAnswer.option
                                                ? 'bg-green-200'
                                                : 'bg-red-200'
                                        )}
                                    >
                                        {obj.userAnswer.text}
                                    </div>
                                    {obj.correctAnswer.option === obj.userAnswer.option
                                        ? <TiTick size={24} className='absolute -right-4 top-4 text-green-600' />
                                        : <ImCross size={16} className='absolute -right-4 top-5 text-red-600' />
                                    }
                                </div>
                                {obj.correctAnswer.option !== obj.userAnswer.option &&
                                    <div
                                        className='
                                            w-fit
                                            bg-green-200
                                            rounded-md
                                            p-2
                                            flex
                                            flex-row
                                            self-center
                                            font-semibold
                                        '
                                    >
                                        {obj.correctAnswer.text}
                                    </div>
                                }

                            </CardContent>
                        </Card >
                    )
                }
            </div>
        )
    }

    const MetaData = () => {
        return (
            <div
                className='
                    flex
                    flex-col
                    gap-2
                    items-center
                    sm:flex-row
                '
            >
                <div
                    className={clsx(`
                            p-4
                            w-fit
                            bg-gray-50
                            rounded-md
                            outline
                            outline-1
                            outline-gray-400
                            flex
                            flex-row 
                            gap-2
                        `,
                    )}
                    title='Total MCQs'
                    onTouchStart={(event) => handleTap(event, 'Total MCQs')}
                >
                    <LayoutListIcon className='inline-block' />
                    <span>{totalMcqs}</span>
                </div>
                <div
                    className='
                        flex 
                        flex-row
                        gap-2
                        text-center
                        justify-evenly
                        w-fit
                        sm:flex-col
                    '
                >
                    <div
                        className={clsx(`
                            p-4 
                            bg-green-50
                            rounded-md
                            outline
                            outline-1
                            outline-green-400
                            flex
                            flex-row 
                            gap-2
                            w-fit
                        `,
                        )}
                        title='Correct'
                        onTouchStart={(event) => handleTap(event, 'Correct')}
                    >
                        <GoCheckCircle size={24} className='text-green-700 inline-block' />
                        <span>{correctCount}</span>
                    </div>
                    <div
                        className={clsx(`
                            p-4
                            bg-red-50
                            rounded-md
                            outline
                            outline-1
                            outline-red-400
                            flex 
                            flex-row
                            gap-2
                        `,
                        )}
                        title='In-Correct'
                        onTouchStart={(event) => handleTap(event, 'In-Correct')}
                    >
                        <GoXCircle size={24} className='text-red-700 inline-block' />
                        <span>{inCorrectCount}</span>
                    </div>
                </div>
                <div
                    className='
                        flex 
                        flex-row
                        gap-2
                        text-center
                        justify-evenly
                        w-fit
                        sm:flex-col
                    '
                >
                    {attemptedCount &&
                        <div
                            className={clsx(`
                                    p-4
                                    bg-sky-100
                                    rounded-md
                                    outline
                                    outline-1
                                    outline-sky-400
                                    w-fit
                                    flex 
                                    flex-row
                                    gap-2
                                `,
                            )}
                            title='Attempted'
                            onTouchStart={(event) => handleTap(event, 'Attempted')}
                        >
                            <TbSquareLetterA size={24} className='inline-block' />
                            <span>{attemptedCount}</span>
                        </div>
                    }
                    {attemptedCount &&
                        <div
                            className={clsx(`
                                    p-4
                                    bg-sky-100
                                    rounded-md
                                    outline
                                    outline-1
                                    outline-sky-400
                                    w-fit
                                    flex 
                                    flex-row
                                    gap-2
                                `,
                            )}
                            title='Un-Attempted'
                            onTouchStart={(event) => handleTap(event, 'Un-Attempted')}
                        >
                            <TbSquareLetterU size={24} className='inline-block' />
                            <span>{totalMcqs - +(attemptedCount)}</span>
                        </div>
                    }
                </div>
                <div
                    className='
                        p-2
                        rounded-md
                        outline
                        outline-1
                        outline-violet-400
                        backdrop-blur-md 
                        flex
                        flex-row
                        gap-2
                        w-fit
                        tracking-widest
                    '
                    title='Category'
                    onTouchStart={(event) => handleTap(event, 'Category')}
                >
                    <BiCategory size={24} className='inline-block' />
                    <span>{category.toLocaleLowerCase()}</span>
                </div>
                <ToolTip
                    title={tooltip.title}
                    x={tooltip.x}
                    y={tooltip.y}
                    visible={tooltip.visible}
                />
            </div>
        )
    }

    return (
        <div
            onClick={handleHide}
            className='
                flex
                flex-col
                items-center
                gap-2
            '
        >
            <MetaData />
            <div className='
                '
            >
                <List />
            </div>
        </div>
    )
}

export default QuizResult
