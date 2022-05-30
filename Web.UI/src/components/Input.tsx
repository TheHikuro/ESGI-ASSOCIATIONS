import React from "react";
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
    value?: any[];
}

export const Input = ({ name, type, formcontrol }: IInputProps) => {
    return (
        <input type={type} placeholder={name} className='p-3 bg-slate-200 my-2 mr-2 text-black rounded-md hover:bg-slate-300 focus:outline-none focus:shadow-outline w-full' {...(formcontrol)} />
    )
}

export const Dropdown = ({ name, formcontrol, value }: IInputProps) => {
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
                        {value?.map((item: any, index: number) => {
                            return <MenuItem value={item} key={index}>{item}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
        </>
    )
}