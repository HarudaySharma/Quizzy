import React, { useEffect, useState } from 'react'
import { useUserFormContext } from '../../context/userFormContext';
import { Input } from '../../@/components/ui/input';
import { Label } from '../../@/components/ui/label';

const SetTimerField = () => {
    const { formData, setFormData } = useUserFormContext();
    const [seconds, setSeconds] = useState('');
    const [minutes, setMinutes] = useState('');

    //ui states
    const [showMinutesLabel, setShowMintuesLabel] = useState(false);
    const [showSecondsLabel, setShowSecondsLabel] = useState(false);

    useEffect(() => {
        const time = Number(minutes) * 60 + Number(seconds)
        setFormData({ ...formData, timer: time });
    }, [seconds, minutes])

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let s = e.target.value;
        s = Number(s).toFixed(0);
        if (Number(s) < 0)
            s = '0';
        if (Number(s) > 60)
            s = '60';
        setSeconds(s);
    }

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let m = e.target.value;
        m = Number(m).toFixed(0);
        if (Number(m) < 0)
            m = '0';
        if (Number(m) > 2)
            m = '2';
        setMinutes(m);
    }

    if (formData?.variant === 'TIMER') {
        return (
            <fieldset className='flex flex-col w-fit mx-auto gap-4'>
                <fieldset className='flex flex-col w-fit mx-auto'>
                    {showMinutesLabel &&
                        <Label
                            className='w-fit mx-auto py-2 relative top-4 bg-white px-6'
                            htmlFor='mcqCount'>
                            Minutes (0-2)
                        </Label>
                    }
                    <Input
                        type='number'
                        min={'0'}
                        max={'2'}
                        id={'timer-minutes'}
                        placeholder={showMinutesLabel ? "" : "Minutes (0-2)"}
                        value={minutes}
                        onBlur={() => setShowMintuesLabel(false)}
                        onFocus={() => setShowMintuesLabel(true)}
                        onChange={handleMinutesChange}
                        className='p-4 mx-auto w-96 font-mono'
                    />
                </fieldset>
                <fieldset className='flex flex-col w-fit mx-auto'>
                    {showSecondsLabel &&
                        <Label
                            className='w-fit mx-auto py-2 relative top-4 bg-white px-6'
                            htmlFor='mcqCount'
                        >
                            Seconds (0-60)
                        </Label>
                    }
                    <Input
                        type='number'
                        min={'0'}
                        max={'60'}
                        id={'timer-seconds'}
                        placeholder={showSecondsLabel ? "" : "Seconds (0-60)"}
                        value={seconds}
                        onBlur={() => setShowSecondsLabel(false)}
                        onFocus={() => setShowSecondsLabel(true)}
                        onChange={handleSecondsChange}
                        className='p-4 mx-auto w-96 font-mono'
                    />
                </fieldset>
            </fieldset>
        )
    }
}

export default SetTimerField;
