import clsx from "clsx";
import { useMcqComponentContext } from "../../../../context/McqComponentContext";
import { GoCheckCircle } from "react-icons/go";

const CorrectCount = ({ className }: { className?: string }) => {
    const { correctCount, variant } = useMcqComponentContext();

    if (variant === 'TEST') {
        return null;
    }

    return (
        <div
            className={clsx(`
                p-2
                sm:p-4 
                bg-green-50
                rounded-md
                outline
                size-fit
                outline-1
                outline-green-400
                flex 
                flex-row
                gap-2
            `,
                className
            )}
            title='Correct Count'
        >
            <GoCheckCircle
                className='
                    text-green-700
                    inline-block
                    w-6
                    h-6
                    sm:w-8
                    sm:h-8
                '
            />
            <span>{correctCount}</span>
        </div>
    )
}

export default CorrectCount;
