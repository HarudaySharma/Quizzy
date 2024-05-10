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
        <Button {...props} onClick={handleOnClick} value={'Retry'}>
            Reset
        </Button>

    )
}

export default ResetButton
