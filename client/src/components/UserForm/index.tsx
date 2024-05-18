import React, {  ReactNode, useState } from 'react'
import { Categories } from '../../types';
import CategoryList from './CategoryList'
import McqCountField from './McqCountField';
import { UserFormContext } from '../../context/userFormContext';
import { handleFormSubmitParams } from '../../pages/QuizPage';
import { RequestModes } from '../../hooks/useQuizQuestions';
import SubmitBtn from './SubmitBtn';
import ChooseButtons from './ChooseButtons';
import SetTimerField from './SetTimerField';

export interface UserFormData {
    category?: Categories
    mcqCount?: number;
    variant?: RequestModes;
    timer?: number;
}

interface Props {
    onSubmit: ({ category, mcqCount, variant, timer }: handleFormSubmitParams) => void;
    children: ReactNode | ReactNode[]
}

// CategoryList and McqCountList 
const UserForm = ({
    onSubmit,
    children,
}: Props) => {
    
    const [formData, setFormData] = useState<UserFormData | undefined>(undefined);
    //const { setCategory, setMcqCount } = useQuizPageContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        if (!formData)
            return;
        if (!formData.category || !formData.variant || (!formData.timer && !formData.mcqCount)) {
            return;
        }
        onSubmit({
                category: formData.category,
                variant: formData.variant,
                timer: formData.timer,
                mcqCount: formData.mcqCount,
            });
    }

    return (
        <div className=''>
            <h3> Select Category of MCQ's </h3>
            <form
                onSubmit={handleSubmit}
                className='border-2 p-4 flex flex-col gap-2'
            >
                <UserFormContext.Provider value={{ formData, setFormData }}>
                {children}
                </UserFormContext.Provider>
            </form>
        </div>
    )
}

UserForm.CategoryList = CategoryList;
UserForm.McqCountField = McqCountField;
UserForm.ChooseButtons = ChooseButtons;
UserForm.SetTimerField = SetTimerField;
UserForm.SubmitBtn = SubmitBtn;

export default UserForm;
