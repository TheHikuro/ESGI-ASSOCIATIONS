import React from "react"
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Dropdown, Input } from "../components/Input";

interface IRegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
    section: string;
}

interface IRegisterPageProps {
    _label: string;
    formControlName: any
    _key?: number;
    type?: string;
}

const InputsAreaRegister = ({ _label, formControlName, _key, type }: IRegisterPageProps) => {
    return (
        <div className="w-full px-3 mb-6 md:mb-0" key={_key}>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-firstName">
                {_label}
            </label>
            <Input type={type ? 'password' : 'text'} formcontrol={formControlName} name={_label} />
        </div>
    )
}

const RegisterPage = () => {
    const [error, setError] = React.useState('');

    const { handleSubmit, register } = useForm<IRegisterForm>();

    const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
        console.log('data', data);
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
    }

    const inputsArea = [
        { label: 'Prénom', formControlName: 'firstName' },
        { label: 'Nom', formControlName: 'lastName' },
        { label: 'Email', formControlName: 'email' },
        { label: 'Mot de passe', formControlName: 'password', type: 'password' },
        { label: 'Pseudo', formControlName: 'username' },
        { label: 'Section', formControlName: 'section', options: ['IW1', 'IW2', 'IW3'] },
    ]

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-[url('./assets/img/bg-login.jpeg')] bg-cover">
            <form onSubmit={handleFormSubmit} className="w-7/12 shadow-xl p-5 rounded-md flex justify-center items-center flex-col z-50 bg-white">
                <h1 className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">Register</h1>
                <div className="grid grid-cols-2 grid-rows-3 -mx-3 mb-6 w-full">
                    {inputsArea.map((input: any, index: number) => {
                        return input.options ? (
                            <>
                                <div className="w-full px-3 mb-6 md:mb-0" key={index}>
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-firstName">
                                        Section
                                    </label>
                                    <Dropdown name={input.label} formcontrol={register(input.formControlName)} value={input.options} key={index} />
                                </div>
                            </>
                        ) : (
                            <InputsAreaRegister _label={input.label} formControlName={register(input.formControlName)} _key={index} type={input.type} />
                        )
                    })}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Register
                    </button>
                </div>
                <Link to="/login" className="text-center text-gray-500 text-xs mt-5">
                    Vous avez deja un compte ?
                </Link>
            </form>
            {error && <p className="text-center text-red-500 text-xs">{error}</p>}
        </div>
    )
}

export default RegisterPage
