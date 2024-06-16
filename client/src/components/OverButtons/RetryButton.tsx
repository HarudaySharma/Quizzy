import React from 'react'
import { Button } from '../../@/components/ui/button'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClickHandler: () => void;
}

const RetryButton = (props: Props) => {

    const handleOnClick = () => {
        props.onClickHandler();
    }

    return (
        <Button
            {...props}
            onClick={handleOnClick}
            className="
                bg-customGreen
                text-white
                font-bold
                text-lg
                hover:bg-button-green
                md:flex-grow
                xl:flex-grow-0
                tracking-wider
                rounded-lg
                p-4
                hover:bg-customGreen-light1
            "
        >
            Retry
        </Button>
    )
}

export default RetryButton
