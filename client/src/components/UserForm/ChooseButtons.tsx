import { useUserFormContext } from '../../context/userFormContext'
import { Button } from '../../@/components/ui/button';
import { Label } from '../../@/components/ui/label';

const ChooseButtons = () => {
    const { formData, setFormData } = useUserFormContext();

    return (
        <div className='flex flex-col gap-2'>
            <fieldset id={'ChooseButtons'} className={'self-center flex flex-row flex-wrap gap-4 w-fit mx-auto'}>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        setFormData({ ...formData, variant: "TIMER" })
                    }}

                >
                    Set A Timer ?
                </Button>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        setFormData({ ...formData, variant: "NO-TIMER" })
                    }}
                >
                    Set No. of Mcqs ?
                </Button>
            </fieldset>
            <Label className={"self-center"} htmlFor="ChooseButtons"> choose either "MCQ Count" or "Timer" option</Label>
        </div>
    )
}

export default ChooseButtons;
