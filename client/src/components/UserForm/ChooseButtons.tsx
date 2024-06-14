import { useUserFormContext } from '../../context/userFormContext'
import { Button } from '../../@/components/ui/button';
import { Label } from '../../@/components/ui/label';

const ChooseButtons = () => {
    const { formData, setFormData } = useUserFormContext();

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
                    onClick={(e) => {
                        e.preventDefault();
                        setFormData({ ...formData, requestMode: "NO-TIMER" })
                    }}
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
                    onClick={(e) => {
                        e.preventDefault();
                        setFormData({ ...formData, requestMode: "TIMER" })
                    }}
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
                    "
                >
                    "MCQ Count"
                </span>
                or
                <span
                    className="
                        underline
                        decoration-customGreen
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
