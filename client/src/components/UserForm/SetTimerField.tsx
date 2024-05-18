import React, { useEffect, useState } from 'react'
import { useUserFormContext } from '../../context/userFormContext';
import { Input } from '../../@/components/ui/input';
import { Label } from '../../@/components/ui/label';

const SetTimerField = () => {
    const { formData, setFormData } = useUserFormContext();
    const [seconds, setSeconds] = useState('');
    const [minutes, setMinutes] = useState('');

    useEffect(() => {
        const time = Number(minutes) * 60 + Number(seconds)
        setFormData({ ...formData, timer: time });
    }, [seconds, minutes])

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let s = e.target.value;
        if (Number(s) < 0)
            s = '0';
        if (Number(s) > 60)
            s = '60';
        setSeconds(s);
    }

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let m = e.target.value;
        if (Number(m) < 0)
            m = '0';
        if (Number(m) > 2)
            m = '2';
        setMinutes(m);
    }

    if (formData?.variant === 'TIMER') {
        return (
            <>
                <Label className='py-2' htmlFor='mcqCount'>Set Time</Label>
                <Input
                    type='number'
                    min={'0'}
                    max={'2'}
                    id={'timer-minutes'}
                    placeholder={"minutes (0-2)"}
                    value={minutes}
                    onChange={handleMinutesChange}
                />
                <Input
                    type='number'
                    min={'0'}
                    max={'60'}
                    id={'timer-seconds'}
                    placeholder={"seconds (0-60)"}
                    value={seconds}
                    onChange={handleSecondsChange}
                />
            </>
        )
    }
}

export default SetTimerField;
