import React, { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStoreContext } from "../utils/context/StoreContext";
import { Dropdown, Input, LabelComposant, TextAreaInput } from "./Input";
import { useModalContext } from "./modal";

interface IFormData<T> {
    [key: string]: T;
}
interface IFormDataProps {
    values: any[]
    title?: string
    submitButtonText?: string
    id?: number
    action: Function
    actionWithoutDispatch?: Function
    textOnSubmit?: string
}

export function FormComponents(props: IFormDataProps) {
    const { values, title, submitButtonText, id, action } = props;
    const { handleSubmit, register } = useForm<IFormData<any>>();
    const { dispatch } = useStoreContext()
    const { closeModal } = useModalContext()

    const onSubmit: SubmitHandler<IFormData<any>> = async (data: any) => {

        const updatedValues: any = {}
        const prevValues = values.reduce((acc, value) => {
            acc[value.formControlName] = value.defaultValue;
            return acc;
        }, {})

        for (const key in data)
            if (JSON.stringify(data[key]) !== JSON.stringify(prevValues[key]))
                updatedValues[key] = data[key];

        id && action(dispatch, updatedValues, id)
        closeModal()
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
                                <Dropdown name={value.label} formcontrol={register(value.formControlName, { value: value.defaultValue })} arr={value.options} value={value.defaultValue} key={key} />
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className="w-full px-3 mb-6 md:mb-0" key={key}>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-firstName">
                                    {value.label}
                                </label>
                                {value.isArray ? (
                                    <LabelComposant formcontrol={register(value.formControlName, { value: value.defaultValue })} value={value.defaultValue} />
                                ) : (
                                    <Input type={value.type} formcontrol={register(value.formControlName, { value: value.defaultValue })} name={value.label} value={value.defaultValue} />
                                )}
                            </div>
                        </Fragment>
                    )

                })}

            </div>
            <div className={`${grid ? '' : 'mt-5'}`}>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                    {submitButtonText}
                </button>
            </div>
        </form>
    )
}

export function FormComponentCreate(props: IFormDataProps) {
    const { values, title, submitButtonText, action, actionWithoutDispatch, textOnSubmit, id } = props;
    const { handleSubmit, register } = useForm<IFormData<any>>();
    const { dispatch } = useStoreContext()
    const { closeModal } = useModalContext()

    const onSubmit: SubmitHandler<IFormData<any>> = async (data: any) => {
        actionWithoutDispatch ? actionWithoutDispatch(data) : id ? action(dispatch, data, id) : action(dispatch, data)
        closeModal()
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
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className="w-full px-3 mb-6 md:mb-0" key={key}>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-firstName">
                                    {value.label}
                                </label>
                                {value.type === 'textarea' ? (
                                    <TextAreaInput formcontrol={register(value.formControlName, { value: value.defaultValue })} name={value.label} value={value.defaultValue} />
                                ) : (
                                    <Input type={value.type} formcontrol={register(value.formControlName, { value: value.defaultValue })} />
                                )}
                            </div>
                        </Fragment>
                    )
                })}
            </div>
            <div className={`${grid ? '' : 'mt-5'}`}>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                    {submitButtonText}
                </button>
            </div>
        </form>
    )

}
