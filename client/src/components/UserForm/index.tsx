import React, { ReactNode, useState } from 'react'
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
    category?: Categories;
    mcqCount?: number;
    requestMode?: RequestModes;
    timer?: number;
}

interface Props {
    onSubmit: (params :handleFormSubmitParams) => void;
    children: ReactNode | ReactNode[]
}

// CategoryList and McqCountList 
const UserForm = ({
    onSubmit,
    children,
}: Props) => {

    const [formData, setFormData] = useState<UserFormData | undefined>(undefined);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);
        if (!formData)
            return;
        if (!formData.category || !formData.requestMode || (!formData.timer && !formData.mcqCount)) {
            return;
        }
        console.log('form submitted');
        onSubmit({
            category: formData.category,
            requestMode: formData.requestMode,
            timer: formData.timer,
            mcqCount: formData.mcqCount,
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='max-w-screen-xl mx-auto border-2 p-4 flex flex-col gap-12'
        >
            <UserFormContext.Provider value={{ formData, setFormData }}>
                {children}
            </UserFormContext.Provider>
        </form>
    )
}

UserForm.CategoryList = CategoryList;
UserForm.McqCountField = McqCountField;
UserForm.ChooseButtons = ChooseButtons;
UserForm.SetTimerField = SetTimerField;
UserForm.SubmitBtn = SubmitBtn;

export default UserForm;
