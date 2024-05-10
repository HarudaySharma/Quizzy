import React, { ReactNode, useState } from 'react'
import { Categories } from '../../types';
import CategoryList from './CategoryList'
import McqCountField from './McqCountField';
import { UserFormContext } from '../../context/userFormContext';
import { UserFormButton } from './UserFormButton';

export interface UserFormData {
    category?: Categories
    mcqCount?: number;
}

interface Props {
    onSubmit: (category: Categories, mcqCount: number) => void;
    categoryList: ReactNode;
    mcqCountField: ReactNode;
    button: ReactNode;
}

// CategoryList and McqCountList 
const UserForm = ({
    onSubmit,
    categoryList,
    mcqCountField,
    button,
}: Props) => {
    
    const [formData, setFormData] = useState<UserFormData | undefined>(undefined);
    //const { setCategory, setMcqCount } = useQuizPageContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        if (!formData)
            return;
        if (!formData.category || !formData.mcqCount) {
            return;
        }
        onSubmit(formData.category, formData.mcqCount);
    }

    return (
        <div className=''>
            <h3> Select Category of MCQ's </h3>
            <form
                onSubmit={handleSubmit}
                className='border-2 p-4 flex flex-col gap-2'
            >
                <UserFormContext.Provider value={{ formData, setFormData }}>
                    {categoryList}
                    {mcqCountField}
                </UserFormContext.Provider>
                {button}
            </form>
        </div>
    )
}

UserForm.CategoryList = CategoryList;
UserForm.McqCountField = McqCountField;
UserForm.Button = UserFormButton;

export default UserForm;
