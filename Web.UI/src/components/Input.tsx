import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface IInputProps {
    name?: string;
    type?: string;
    formcontrol?: any;
    arr?: any[];
    value?: any
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    handlePressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = ({ name, type, formcontrol }: IInputProps) => {
    return (
        <input type={type} placeholder={name} className='p-3 bg-slate-200 my-2 mr-2 text-black rounded-md hover:bg-slate-300 focus:outline-none focus:shadow-outline w-full' {...(formcontrol)} />
    )
}

export const SoloInput = ({ name, type, onChange, value, required, handlePressEnter }: IInputProps) => {
    return (
        <input type={type} placeholder={name} className='p-3 bg-slate-200 my-2 mr-2 text-black rounded-md hover:bg-slate-300 focus:outline-none focus:shadow-outline w-full' onKeyPress={handlePressEnter} value={value} onChange={onChange} required={required} />
    )
}

export const Dropdown = ({ name, formcontrol, arr }: IInputProps) => {
    const [section, setSection] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSection(event.target.value as string);
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
                        onChange={handleChange}
                        {...(formcontrol)}
                        className='bg-slate-200 my-2 mr-2 text-black rounded-md hover:bg-slate-300 focus:outline-none focus:shadow-outline w-full h-12'
                    >
                        {arr?.map((item: any, index: number) => {
                            return <MenuItem value={item} key={index}>{item}</MenuItem>
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
        if (slot === length - 1) {
            onComplete(''.concat(...code))
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