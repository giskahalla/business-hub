'use client';

import { Box, Grid } from "@mui/material"
import { FormControl, FormLabel, Input, Textarea, Drawer } from "@mui/joy"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
// import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import { useDrawer, MainButton } from "@/components";

import { BTN_STYLE } from "@/constants";

import { customer } from "@/services/redux/actions";

import '../../globals.css';

export default function CustomerCU() {

    const dispatch = useDispatch()

    const { toggleDrawer, openDrawer, data, updateData } = useDrawer();

    const { action } = data || {}

    const [values, setValues] = useState({
        name: "",
        company: "",
        email: "",
        contact: "",
        status: "",
        address: "",
    });

    const handleEmpty = () => {
        setValues({ name: "", company: "", email: "", contact: "", address: ""}); 
    }

    useEffect(() => {
        if(action === 'edit' && data){
            setValues(data)
        } else {
            handleEmpty()
        }
    }, [action, data])

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value});
    };

    const handleChangePhone = (val) => {
        setValues({ ...values, contact: val});
    };

    const onClose =  () => {
        updateData(null)
        handleEmpty()
        toggleDrawer();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { action, ...rest } = values
        if(action === 'edit'){
            dispatch(customer.update_customer_request(rest))
        } else {
            dispatch(customer.create_customer_request(rest))
        }
        onClose()
    };

    return (
        <Drawer open={openDrawer} anchor="right" onClose={onClose}>
            <Box
                sx={{ width: 450, p: 3, height: '90%' }}
                >
                    <h2 className="font-bold text-xl">{action === 'edit' ? 'Edit Customer' : 'Add New Customer'}</h2>
                    <p>{action === 'edit' ? `Update details for ${data?.name}` : 'Add a new customer to your client database' }</p>

                    <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col h-full justify-between mt-8">

                        <Grid container spacing={2}>  
                            <Grid size={12} item>
                                <FormControl required>
                                    <FormLabel sx={{ fontWeight: 600 }}>Name</FormLabel>
                                    <Input
                                        variant="plain"
                                        value={values.name}
                                        onChange={handleChange}
                                        placeholder="Enter customer's full name"
                                        name="name"
                                        className="border border-gray-200"
                                        sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid size={12} item>
                                <FormControl required>
                                    <FormLabel sx={{ fontWeight: 600 }}>Company</FormLabel>
                                    <Input
                                        variant="plain"
                                        placeholder="Enter company name"
                                        name="company"
                                        value={values.company}
                                        onChange={handleChange}
                                        className="border border-gray-200"
                                        sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid size={12} item>
                                <FormControl required>
                                    <FormLabel sx={{ fontWeight: 600 }}>Email Address</FormLabel>
                                    <Input
                                        variant="plain"
                                        placeholder="customer@company.com"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        className="border border-gray-200"
                                        sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid size={12} item>
                                <FormControl required>
                                    <FormLabel sx={{ fontWeight: 600 }}>Phone Number</FormLabel>
                                    <PhoneInput
                                        inputProps={{
                                            required: true
                                        }}
                                        value={values.contact}
                                        onChange={handleChangePhone}
                                        inputStyle={{ height: 50, width: '100%', background: '#fbfcfe', borderColor: '#ebe6e7' }}
                                        buttonStyle={{ background: '#fbfcfe', borderColor: '#ebe6e7' }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid size={12} item>
                                <FormControl required>
                                    <FormLabel sx={{ fontWeight: 600 }}>Address</FormLabel>
                                    <Textarea
                                        variant="plain"
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        className="border border-gray-200"
                                        minRows={2}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <div style={{ display: 'flex', gap: 10, textAlign: "right", marginTop: 20 }}>
                            <MainButton type="submit" title='Submit' />
                            <MainButton variant="outlined" onClick={onClose} title='Cancel' style={{...BTN_STYLE.outlined }}/>
                        </div>

                    </form>
                </Box>
        </Drawer>
    )
}