import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CheckIcon } from "@heroicons/react/outline";
import { Roles } from "../utils/helpers/enums";
interface IInputProps {
    name?: string;
    type?: string;
    formcontrol?: any;
    arr?: any[];
    value?: any
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    handlePressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    _key?: number
}

export const Input = ({ name, type, formcontrol, _key, value }: IInputProps) => {
    return (
        <input type={type} placeholder={name} className='p-3 bg-slate-200 my-2 mr-2 text-black rounded-md hover:bg-slate-300 focus:outline-none focus:shadow-outline w-full' {...(formcontrol)} key={_key} defaultValue={value} />
    )
}

export const SoloInput = ({ name, type, onChange, value, required, handlePressEnter }: IInputProps) => {
    return (
        <input type={type} placeholder={name} className='p-3 bg-slate-200 my-2 mr-2 text-black rounded-md hover:bg-slate-300 focus:outline-none focus:shadow-outline w-full' onKeyPress={handlePressEnter} value={value} onChange={onChange} required={required} />
    )
}

export const Dropdown = ({ name, formcontrol, arr, _key, value }: IInputProps) => {
    const [section, setSection] = React.useState(value);

    const handleChange = (event: any) => {
        setSection(event.target.dataset.value);
    };
    return (
        <>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="select-section">{name}</InputLabel>
                    <Select
                        labelId="select-section"
                        id="selectRegister"
                        value={section}
                        label="Section"
                        onClick={handleChange}
                        {...(formcontrol)}
                        className='bg-slate-200 my-2 mr-2 text-black rounded-md hover:bg-slate-300 focus:outline-none focus:shadow-outline w-full h-12'
                        key={_key}
                    >
                        {arr?.map((item: any, index: number) => {
                            return <MenuItem value={item.value} defaultValue={item.value} key={index}>{item.label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
        </>
    )
}

interface ICodeInputProps {
    length: number;
    loading: boolean;
    onComplete: (arg: any) => void;
}

export const CodeInputs = ({ length, loading, onComplete }: ICodeInputProps) => {
    const [code, setCode]: any[] = React.useState([...Array(length)].map(() => ""))
    const inputs = React.useRef<(HTMLInputElement | null)[]>([])

    const processInputs = (e: React.ChangeEvent<HTMLInputElement>, slot: number) => {
        const num = e.target.value
        if (/[^0-9]/.test(num)) return
        const newCode = [...code]
        newCode[slot] = num
        setCode(newCode)
        if (slot !== length - 1) {
            inputs.current[slot + 1]!?.focus()
        }
        if (newCode.every(num => num !== "")) {
            onComplete(newCode.join(""))
        }
    }

    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, slot: number) => {
        if (e.key === 'Backspace' && !code[slot] && slot !== 0) {
            const newCode = [...code];
            newCode[slot - 1] = "";
            setCode(newCode);
            inputs.current[slot - 1]!?.focus()
        }
    };


    return (
        <>
            <div className='flex flex-col'>
                <div className='flex flex-row'>
                    {code.map((item: number, index: number) => {
                        return (
                            <div className='flex flex-col' key={index}>
                                <input
                                    ref={(input) => inputs.current.push(input)}
                                    type='text'
                                    className='p-3 bg-slate-200 my-2 mr-2 text-black rounded-md hover:bg-slate-300 focus:outline-none focus:shadow-outline w-12 h-12 text-center'
                                    onChange={(e) => processInputs(e, index)}
                                    onKeyUp={(e) => onKeyUp(e, index)}
                                    maxLength={1}
                                    autoFocus={!code[0].length && index === 0}
                                    value={item}
                                    inputMode='numeric'
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export const LabelComposant = ({ formcontrol, value }: IInputProps) => {
    const arrOfRoles = [Roles.ADMIN, Roles.USER]
    const [initialValues, setInitialValues] = React.useState(
        arrOfRoles?.map((item: any) => {
            return {
                isChecked: JSON.parse(value).includes(item),
                value: item
            }
        })
    )

    const handleCheck = (id: number) => {
        setInitialValues(
            initialValues.map((role: any, index: number) => {
                if (index === id) {
                    return {
                        ...role,
                        isChecked: !role.isChecked
                    }
                }
                return role
            })
        )
    }

    // create input for register react hook form to send initialValues.value
    return (
        <div>
            {initialValues.map((item: any, index: number) => {
                return (
                    <div className={`w-fit bg-slate-300 rounded-full py-1 px-2 hover:cursor-pointer`} key={index}>
                        <div className="flex items-center justify-between" onClick={() => handleCheck(index)} {...(formcontrol)}>
                            <div>{item.isChecked ? <CheckIcon className="h-5 w-5 text-green-500" /> : ''}</div>
                            <input type="checkbox" className="hidden" id={item.value} defaultChecked={item.isChecked} value={item.value} />
                            <div className="text-sm text-gray-700">{item.value}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}