import clsx from "clsx";
import { Button } from "../../../@/components/ui/button";
import { useMcqCardContext } from "../../../context/MCQCardContext";
import { FaArrowRight } from "react-icons/fa6";

function McqButton({ className }: { className?: string }) {
    const { selectedOption } = useMcqCardContext();
    return (
        Boolean(selectedOption) &&
        <Button
            type='submit'
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
                bg-lime-500
            `,
                className
            )}
        >
            <span>Next</span>
            <FaArrowRight
                size={16}
                className="
                    relative
                    top-[1px]
                "
            />
        </Button>
    )
}

export default McqButton;
