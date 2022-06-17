import React, { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateUserActions } from "../utils/context/actions/user";
import { UsersDetails } from "../utils/context/reducers/admin";
import { useStoreContext } from "../utils/context/StoreContext";
import { Dropdown, Input } from "./Input";

interface IFormData<T> {
    [key: string]: T;
}
interface IFormDataProps {
    values: any[]
    title?: string
    submitButtonText?: string
}

export function FormComponents(props: IFormDataProps) {
    const { values, title, submitButtonText } = props;
    const { handleSubmit, register } = useForm<IFormData<any>>();
    const { dispatch } = useStoreContext()

    const onSubmit: SubmitHandler<IFormData<any>> = async (data: any) => {

        const prevValues = values.reduce((acc, value) => {
            acc[value.formControlName] = value.defaultValue;
            return acc;
        }, {})

        const newValues = Object.keys(data).reduce((acc, key) => {
            if (data[key] !== prevValues[key]) {
                acc[key] = data[key];
            }
            return acc;
        }, {
            [values[0].formControlName]: values[0].defaultValue
        })

        console.log(newValues);

        //updateUserActions(dispatch, data)
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
                    return value.dropdown ? (
                        <Fragment key={key}>
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-firstName">
                                    Section
                                </label>
                                <Dropdown name={value.label} formcontrol={register(value.formControlName)} arr={value.options.value} value={value.defaultValue} key={key} />
                            </div>
                        </Fragment>
                    ) : (
                        value.display === false ? (
                            <div className="hidden ">
                                <Input formcontrol={register(value.formControlName)} value={value.defaultValue} key={key} />
                            </div>
                        ) : (
                            <>
                                <div className="w-full px-3 mb-6 md:mb-0" key={key}>
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-firstName">
                                        {value.label}
                                    </label>
                                    <Input type={value.type} formcontrol={register(value.formControlName)} name={value.label} value={value.defaultValue} />
                                </div>
                            </>
                        )
                    )
                }
                )}
            </div>
            <div className={`${grid ? '' : 'mt-5'}`}>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                    {submitButtonText}
                </button>
            </div>
        </form>
    )
}

