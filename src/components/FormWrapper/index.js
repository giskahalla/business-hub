'use client'

import { FormControl, OutlinedInput, Select, Typography } from "@mui/material"

import '../../app/globals.css';

export const FormWrapper = (props) => {

    const  { label, type, name, menuItems, values } = props;

    return (
        <>
            <FormControl fullWidth required>
                <Typography variant="body2" fontWeight="bold" mb={0.5}>
                    {label}
                </Typography>
                {type === 'input' &&
                    <OutlinedInput
                        name={name}
                        className="bg-gray-100 border border-gray-200 rounded"
                        value={values?.[name]}
                        {...props}
                    />
                }                    
                {type === 'select' && 
                    <Select
                        name={name}
                        value={values?.[name]}
                        displayEmpty
                        {...props}
                        >
                        {menuItems}
                    </Select>
                }
            </FormControl>
        </> 

    )
}