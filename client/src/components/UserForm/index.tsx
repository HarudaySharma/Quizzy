import React, { ReactNode, useState } from 'react'
import { Categories, RequestModes, handleFormSubmitParams } from '../../types';
import CategoryList from './CategoryList'
import McqCountField from './McqCountField';
import { UserFormContext } from '../../context/userFormContext';
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
    onSubmit: (params: handleFormSubmitParams) => void;
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

        console.log({ formData });
        if (!formData)
            return;
        if (!formData.category || !formData.requestMode || (!formData.timer && !formData.mcqCount)) {
            return;
        }

        onSubmit({
            category: formData.category,
            requestMode: formData.requestMode,
            timer: formData.timer,
            mcqCount: formData.mcqCount,
        });
    }

    return (
        <div
            className='
                flex
            '
        >
            <form
                onSubmit={handleSubmit}
                className='
                    mx-auto
                    p-4 
                    flex 
                    flex-col 
                    basis-full
                    flex-grow
                    flex-wrap
                    gap-12
                    max-w-full
                    m-2
                    rounded-lg
                    outline
                    outline-2
                    outline-gray-200
                '
            >
                <UserFormContext.Provider value={{ formData, setFormData }}>
                    {children}
                </UserFormContext.Provider>
            </form>
        </div>
    )
}

UserForm.CategoryList = CategoryList;
UserForm.ChooseButtons = ChooseButtons;
UserForm.McqCountField = McqCountField;
UserForm.SetTimerField = SetTimerField;
UserForm.SubmitBtn = SubmitBtn;

export default UserForm;
