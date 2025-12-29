'use client';

import { Grid } from "@mui/material"
import { FormControl, FormLabel, Input, Textarea, Select, Option } from "@mui/joy"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import 'react-international-phone/style.css';
import { KeyboardArrowDown } from '@mui/icons-material';

import { useDrawer, DrawerWrapper } from "@/components";

import { customer } from "@/services/redux/actions";

import '../../globals.css';

export default function CustomerCU() {

    const dispatch = useDispatch()

    const companies = Object.values(useSelector((state) => state.company.byID));

    const { toggleDrawer, data, updateData } = useDrawer();

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

    const handleChangePhone = (value, countryData) => {
        const countryCode = countryData.dialCode;

        if (value) {
        const formattedPhone = `+${countryCode} ${value.slice(countryCode.length)}`;
        setValues({
            ...values,
            contact: formattedPhone,
        });
        } else {
        setValues({
            ...values,
            contact: '',
        });
        }
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
        <DrawerWrapper
            onClose={onClose}
            onSubmit={handleSubmit}
            drawerTitle={
                <div>
                    <h2 className="font-bold text-xl">{action === 'edit' ? 'Edit Customer' : 'Addn New Customer'}</h2>
                    <p className="font-normal text-sm">{action === 'edit' ? `Update details for ${data?.name}` : 'Add a new customer to your client database' }</p>
                </div>
            }
            drawerContent={
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
                                     <Select
                                        indicator={<KeyboardArrowDown />} 
                                        variant="plain"
                                        name="company"
                                        value={values.company}
                                        onChange={(e, val) => {
                                            setValues({ ...values, company: val});
                                        }}
                                    >
                                        {companies.map((s) => (
                                            <Option value={s.id} key={s.id}>{s.name}</Option>
                                        ))}
                                    </Select>
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
                                        inputProps={{ required: true }}
                                        value={values.contact}
                                        onChange={handleChangePhone}
                                        inputStyle={{
                                            height: 50,
                                            width: '100%',
                                            background: '#fbfcfe',
                                            borderColor: '#ebe6e7',
                                        }}
                                        buttonStyle={{
                                            background: '#fbfcfe',
                                            borderColor: '#ebe6e7',
                                        }}
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
                    </form>
            }
        />
    )
}