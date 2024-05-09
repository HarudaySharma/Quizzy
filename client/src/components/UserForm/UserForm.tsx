import React, {  useState } from 'react'
import { Categories } from '../../types';
import CategoryList from './CategoryList'
import { Button } from '../../@/components/ui/button';
import McqCountField from './McqCountField';
import { UserFormContext } from '../../context/userFormContext';
import { useQuizPageContext } from '../../context/QuizPageContext';

export interface UserFormData {
    category?: Categories
    mcqCount?: number;
}

const UserForm = () => {
    const [formData, setFormData] = useState<UserFormData | undefined>(undefined);
    const {setCategory, setMcqCount} = useQuizPageContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        if(!formData)
            return;
        setCategory(formData.category);
        setMcqCount(formData.mcqCount);
    }

    return (
        <div className=''>
            <h3> Select Category of MCQ's </h3>
            <form
                onSubmit={handleSubmit}
                className='border-2 p-4 flex flex-col gap-2'
            >
                <UserFormContext.Provider value={{ formData, setFormData }}>
                    <CategoryList />
                    <McqCountField />
                </UserFormContext.Provider>
                <Button
                    type='submit'
                    className='bg-sky-100 py-2 px-1 cursor-pointer hover:bg-sky-200'
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default UserForm
