import clsx from "clsx";
import { useMcqComponentContext } from "../../../../context/McqComponentContext";
import Loader from "../../../ui/Loader";

interface TotalMcqsProps {
    showLoading?: boolean;
    className?: string;
}

const TotalMcqs = ({ showLoading, className }: TotalMcqsProps) => {
    const { totalMcqs } = useMcqComponentContext();

    return (
        <div className="
                flex 
                flex-wrap 
                justify-center
                items-center
                flex-col
                sm:flex-row
                gap-2
                relative
            "
        >
            <div
                className={clsx(`
                p-2
                sm:p-4
                bg-gray-50
                rounded-md
                outline
                outline-1
                outline-gray-400
                size-fit

            `,
                    className
                )}
            >
                Total MCQs: {totalMcqs}
            </div>
            {showLoading &&
                <Loader
                    className="
                        relative
                        top-[1px]
                        sm:top-3
                    "
                />
            }
        </div>
    )
}

export default TotalMcqs;
