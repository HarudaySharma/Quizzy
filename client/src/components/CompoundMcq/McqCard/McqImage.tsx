import clsx from "clsx";
import { useMcqCardContext } from "../../../context/MCQCardContext";

function McqImage({ className }: { className?: string }) {
    const { image } = useMcqCardContext();

    if (!image) {
        return null;
    }

    return (
        <img
            src={`http://localhost:3000${image}`}
            alt="image"
            className={clsx(`
                    w-[16em]
                    h-[8em]
                    sm:w-[24em]
                    sm:h-[12em]
                    outline
                    outline-1
                    outline-gray-400
                    rounded-md
                    p-2
                `,
                className
            )}
        />
    )
}

export default McqImage;
