import React from "react";
import { useForm } from "react-hook-form";
interface IInputProps {
    name?: string;
    type?: string;
    formcontrol?: any;
}

export const Input = ({ name, type, formcontrol }: IInputProps) => {
    return (
        <input type={type} placeholder={name} className='p-3 bg-slate-200 my-2 mr-2 text-white rounded-md hover:bg-slate-300 focus:outline-none focus:shadow-outline w-full' {...(formcontrol)} />
    )
}