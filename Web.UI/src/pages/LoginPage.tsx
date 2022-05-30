import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from "../components/Input";
// use React-Hook-Form and tailwindcss
interface ILoginForm {
    username: string;
    password: string;
}

const LoginPage = () => {
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<ILoginForm>();

    const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
        console.log(data);
        localStorage.setItem('token', 'token');
        navigate('/FirstPage');
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[url('./assets/img/bg-login.jpeg')] bg-cover">
            <form onSubmit={handleFormSubmit} className="w-full max-w-sm shadow-xl p-5 rounded-md flex justify-center items-center flex-col z-50 bg-white">
                <h1 className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">Login</h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-Username">
                            Username
                        </label>
                        <Input type="text" formcontrol={register('username')} name='Username' />
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Password
                        </label>
                        <Input type="password" formcontrol={register('password')} name='Password' />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">GO</button>
                </div>
                <Link to={'/register'} className="text-center text-gray-500 text-xs mt-5">
                    Vous n'avez pas de compte ?
                </Link>
            </form>
        </div>
    )

}

export default LoginPage;