import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./Input";

interface IFormData<T> {
    [key: string]: T;
}

interface IFormDataProps {
    values: any[]
    title?: string
    onSubAction?: () => void
}

export function FormComponents(props: IFormDataProps) {
    const { values, title, onSubAction } = props;
    const { handleSubmit, register } = useForm<IFormData<any>>();

    const onSubmit: SubmitHandler<IFormData<any>> = async (data) => {
        onSubAction?.();
        console.log(data);
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
    }

    const [grid, setGrid] = React.useState(false);

    React.useEffect(() => {
        if (values.length >= 4) {
            setGrid(true);
        }
    }, [grid]);

    return (
        <form onSubmit={handleFormSubmit} className="w-full flex justify-center items-center flex-col z-50 bg-white">
            <h1 className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">{title}</h1>
            <div className={`${grid ? 'grid grid-cols-2 grid-rows-3 -mx-3 mb-6 w-full' : 'w-full'}`}>
                {values.map((value: any, key: number) => {
                    return (
                        <div className="w-full px-3 mb-6 md:mb-0" key={key}>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-firstName">
                                {value.label}
                            </label>
                            <Input type={value.type} formcontrol={register(value.formControlName)} name={value.label} value={value.defaultValue} />
                        </div>
                    )
                }
                )}
            </div>
            <div className={`${grid ? '' : 'mt-5'}`}>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                    Submit
                </button>
            </div>
        </form>
    )
}