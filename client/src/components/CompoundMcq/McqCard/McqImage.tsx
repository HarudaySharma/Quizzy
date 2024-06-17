import clsx from "clsx";
import { useMcqCardContext } from "../../../context/MCQCardContext";

const API_URL = import.meta.env.VITE_API_URL;

function McqImage({ className }: { className?: string }) {
    const { image } = useMcqCardContext();

    if (!image) {
        return null;
    }

    return (
        <img
            src={`${API_URL}${image}`}
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
