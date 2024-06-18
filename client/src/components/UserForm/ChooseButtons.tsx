import { useUserFormContext } from '../../context/userFormContext'
import { Button } from '../../@/components/ui/button';
import { Label } from '../../@/components/ui/label';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ChooseButtons = () => {
    const { formData, setFormData } = useUserFormContext();

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        formData?.category ? setDisabled(false) : setDisabled(true);
    }, [formData?.category])

    const setMcqCountBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (disabled) {
            toast.error('please select a category first');
            return;
        }
        setFormData({ ...formData, requestMode: "NO-TIMER" })
    }

    const setTimerBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (disabled) {
            toast.error('please select a category first');
            return;
        }
        setFormData({ ...formData, requestMode: "TIMER" })
    }

    return (
        <div
            className='
                flex 
                flex-col 
                gap-2
                flex-wrap
            '
        >
            <fieldset
                id={'ChooseButtons'}
                className={`
                    self-center 
                    flex 
                    flex-row 
                    flex-wrap 
                    gap-4
                    w-fit 
                    mx-auto
                    justify-center
                `}
            >
                <Button
                    onClick={setMcqCountBtnClickHandler}
                    className='
                        bg-customGreen-dark1
                        font-bold
                        tracking-wider
                        outline-none
                        hover:bg-customGreen
                        focus:bg-customGreen
                    '
                >
                    Set No. of Mcqs ?
                </Button>
                <Button
                    onClick={setTimerBtnClickHandler}
                    className='
                        bg-customGreen-dark1
                        outline-none
                        font-bold
                        tracking-wider
                        hover:bg-customGreen
                        focus:bg-customGreen
                    '

                >
                    Set A Timer ?
                </Button>
            </fieldset>
            <Label
                htmlFor="ChooseButtons "
                className={`
                    self-center
                    font-light
                    tracking-wider
                    text-wrap
                    text-center
                `}
            >
                choose either
                <span
                    className="
                        underline
                        decoration-customGreen
                        mx-1
                    "
                >
                    "MCQ Count"
                </span>
                or
                <span
                    className="
                        underline
                        decoration-customGreen
                        mx-1
                    "
                >
                    "Timer"
                </span>
                option
            </Label>
        </div>
    )
}

export default ChooseButtons;
