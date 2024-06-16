import clsx from "clsx";
import { useMcqComponentContext } from "../../../../context/McqComponentContext";
import { TbSquareLetterU } from "react-icons/tb";

const UnAttemptedCount = ({ className }: { className?: string }) => {
    const { totalMcqs, attemptedCount } = useMcqComponentContext();

    if (!attemptedCount) {
        return null;
    }

    return (
        <div
            className={clsx(`
                    p-2
                    sm:p-4
                    bg-sky-100
                    rounded-md
                    outline
                    outline-1
                    outline-sky-400
                    size-fit
                    w-fit
                    flex 
                    flex-row
                    gap-2
                    relative
                `,
                className
            )}
            title='Un-Attempted'
        >
            <TbSquareLetterU 
                className='
                    w-6
                    h-6
                    sm:w-8
                    sm:h-8
                    inline-block
                '
            />
            <span className="relative top-[1px] ">{totalMcqs - attemptedCount}</span>
        </div>
    )
}

export default UnAttemptedCount;
