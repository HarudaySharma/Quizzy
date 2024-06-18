import { createContext, useContext } from "react";
import { UserFormData } from "../components/UserForm";

type UserFormContextType = {
    formData: UserFormData | undefined;
    setFormData: React.Dispatch<React.SetStateAction<UserFormData | undefined>>;
}


export const UserFormContext = createContext<UserFormContextType | undefined>(undefined);

export function useUserFormContext() {
    const context = useContext(UserFormContext);

    if (!context || !context.setFormData) {
        throw Error("wtf you doing pass the formData state and its setter in the context provider");
    }

    return { 
        formData: context.formData,
        setFormData: context.setFormData,
    };
}
