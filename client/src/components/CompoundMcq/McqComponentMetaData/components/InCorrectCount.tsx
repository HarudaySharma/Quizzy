import clsx from "clsx";
import { useMcqComponentContext } from "../../../../context/McqComponentContext";
import { GoXCircle } from "react-icons/go";

const InCorrectCount = ({ className }: { className?: string }) => {
    const { inCorrectCount, variant } = useMcqComponentContext();

    if (variant === 'TEST') {
        return null;
    }

    return (
        <div
            className={clsx(`
                p-2
                sm:p-4
                bg-red-50
                rounded-md
                outline
                size-fit
                outline-1
                outline-red-400
                flex 
                flex-row
                gap-2
            `,
                className
            )}
            title='In-Correct Count'
        >
            <GoXCircle
                className='
                    text-red-700
                    inline-block
                    w-6
                    h-6
                    sm:w-8
                    sm:h-8
                '
            />
            <span>{inCorrectCount}</span>
        </div>
    )
}

export default InCorrectCount;
