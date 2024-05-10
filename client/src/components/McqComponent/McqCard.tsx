import React, { useState } from 'react'
import { Button } from '../../@/components/ui/button';
import { useMcqComponentContext } from '../../context/McqComponentContext';
import { Options } from '../../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../@/components/ui/card';

interface Props {
    answerSubmitHandler: (markedOption: Options) => void;
}

const McqCard = ({ answerSubmitHandler }: Props) => {
    const [selectedOption, setSelectedOption] = useState<Options>();

    const { mcq } = useMcqComponentContext();

    const optionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value as Options);
    }

    const onSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedOption) {
            return;
        }
        answerSubmitHandler(selectedOption);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{mcq.question}</CardTitle>
            </CardHeader>
            <form onSubmit={onSubmitHandler} >
                <CardContent>
                    <div className='my-4'></div>
                    <section className='flex flex-col gap-2'>
                        <fieldset className='flex flex-row gap-2'>
                            <input
                                type='radio'
                                name='option'
                                id='A'
                                key={mcq.A}
                                onChange={optionChangeHandler}
                                value={'A'}
                            />
                            <label htmlFor='A'>{mcq.A}</label>
                        </fieldset>

                        <fieldset className='flex flex-row gap-2'>
                            <input
                                type='radio'
                                name='option'
                                id='B'
                                key={mcq.B}
                                onChange={optionChangeHandler}
                                value={'B'}
                            />
                            <label htmlFor='B'>{mcq.B}</label>
                        </fieldset>

                        <fieldset className='flex flex-row gap-2'>
                            <input
                                type='radio'
                                name='option'
                                id='C'
                                key={mcq.C}
                                onChange={optionChangeHandler}
                                value={'C'}
                            />
                            <label htmlFor='C'>{mcq.C}</label>
                        </fieldset>

                        <fieldset className='flex flex-row gap-2'>
                            <input
                                type='radio'
                                name='option'
                                id='D'
                                key={mcq.D}
                                onChange={optionChangeHandler}
                                value={'D'}
                            />
                            <label htmlFor='D'>{mcq.D}</label>
                        </fieldset>
                    </section>
                    <div className='my-8'></div>
                </CardContent>
                <CardFooter>
                    <Button type='submit'>Submit</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default McqCard
