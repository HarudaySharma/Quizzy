import clsx from "clsx";
import { useMcqComponentContext } from "../../../../context/McqComponentContext";
import { TbSquareLetterA } from "react-icons/tb";

const AttemptedCount = ({ className }: { className?: string }) => {
    const { attemptedCount } = useMcqComponentContext();

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
                flex 
                flex-row
                size-fit
                gap-2
                relative
            `,
                className
            )}
            title='Attempted'
        >
            <TbSquareLetterA
                className='
                    w-6
                    h-6
                    sm:w-8
                    sm:h-8
                    inline-block
                '
            />
            <span className="relative top-[1px]">{attemptedCount}</span>
        </div>
    )
}

export default AttemptedCount;
