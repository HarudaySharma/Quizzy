import clsx from "clsx";
import { Button } from "../../../@/components/ui/button";
import { useMcqCardContext } from "../../../context/MCQCardContext";
import { FaArrowLeft } from "react-icons/fa6";

function McqPrevButton({ className, show }: { className?: string, show?: boolean }) {
    const { prevButtonClickHandler } = useMcqCardContext();

    return (
        show &&
        <Button
            type='button'
            onClick={prevButtonClickHandler}
            className={clsx(`
                flex
                flex-row
                text-lg
                font-semibold
                relative
                gap-2
                w-full
                p-4
                text-gray-900
                bg-sky-300
                hover:bg-sky-200
            `,
                className
            )}
        >
            <FaArrowLeft
                size={16}
                className="
                    relative
                    top-[1px]
                "
            />
            <span>Prev</span>
        </Button>
    )
}

export default McqPrevButton;
