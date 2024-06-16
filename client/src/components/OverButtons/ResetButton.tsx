import React from 'react'
import { Button } from '../../@/components/ui/button'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClickHandler: () => void;
}

const ResetButton = (props: Props) => {

    const handleOnClick = () => {
        props.onClickHandler();
    }

    return (
        <Button
            {...props}
            onClick={handleOnClick}
            value={'Retry'}
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
            Reset
        </Button>

    )
}

export default ResetButton
