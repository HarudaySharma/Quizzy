import React, { useEffect, useState } from 'react'
import { useUserFormContext } from '../../context/userFormContext';
import { Input } from '../../@/components/ui/input';
import { Label } from '../../@/components/ui/label';
import toast from 'react-hot-toast';

const SetTimerField = () => {
    const { formData, setFormData } = useUserFormContext();
    const [seconds, setSeconds] = useState('');
    const [minutes, setMinutes] = useState('');

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (!formData?.category) {
            setSeconds('');
            setMinutes('');
        }

        formData?.category ? setDisabled(false) : setDisabled(true);

    }, [formData?.category])

    useEffect(() => {
        const time = Number(minutes) * 60 + Number(seconds)
        setFormData({ ...formData, timer: time });
    }, [seconds, minutes])

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) {
            toast.error('please select a category first');
            return;
        }

        let s = e.target.value;
        s = Number(s).toFixed(0);
        if (Number(s) < 0)
            s = '0';
        if (Number(s) > 60)
            s = '60';
        setSeconds(s);
    }

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) {
            toast.error('please select a category first');
            return;
        }

        let m = e.target.value;
        m = Number(m).toFixed(0);
        if (Number(m) < 0)
            m = '0';
        if (Number(m) > 2)
            m = '2';
        setMinutes(m);
    }

    if (formData?.requestMode === 'TIMER') {
        return (
            <fieldset className='flex flex-col w-full mx-auto gap-4'>
                <fieldset className='flex flex-col w-full gap-1  mx-auto'>
                    <Label
                        className='w-fit py-2'
                        htmlFor='mcqCount'>
                        Minutes (0-2)
                    </Label>
                    <Input
                        type='number'
                        min={'0'}
                        max={'2'}
                        id={'timer-minutes'}
                        value={minutes}
                        onChange={handleMinutesChange}
                        className='
                            p-4 
                            mx-auto 
                            basis-11/12 
                            font-mono
                        '
                    />
                </fieldset>
                <fieldset className='flex flex-col w-full gap-1 mx-auto'>
                    <Label
                        className='w-fit py-2'
                        htmlFor='mcqCount'
                    >
                        Seconds (0-60)
                    </Label>
                    <Input
                        type='number'
                        min={'0'}
                        max={'60'}
                        id={'timer-seconds'}
                        value={seconds}
                        onChange={handleSecondsChange}
                        className='
                            p-4 
                            mx-auto 
                            basis-11/12 
                            font-mono
                        '
                    />
                </fieldset>
            </fieldset>
        )
    }
}

export default SetTimerField;
