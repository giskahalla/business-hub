'use client';

import { Grid, Divider } from "@mui/material"
import { FormControl, FormLabel, Input } from "@mui/joy"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import 'react-international-phone/style.css';

import { useDrawer, DrawerWrapper } from "@/components";

import { customer } from "@/services/redux/actions";

import '../../globals.css';

export default function MemberCU() {

    const dispatch = useDispatch()

    const { toggleDrawer, data, updateData } = useDrawer();

    const { action } = data || {}

    const [values, setValues] = useState({
        name: "",
        email: "",
        contact: "",
        role: "",
        department: "",
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
        <DrawerWrapper
            onClose={onClose}
            onSubmit={handleSubmit}
            drawerTitle={
                <div>
                    <h2 className="font-bold text-xl">{action === 'edit' ? 'Edit Member' : 'Add New Member'}</h2>
                    <p>{action === 'edit' ? `Update details for ${data?.name}` : 'Add a new member to your team' }</p>
                </div>
            }
            drawerContent={
                <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col h-full justify-between mt-8">
                        <div>
                            <h2>Personal Information</h2>
                            <Divider sx={{ margin: '7px 0 15px 0'}}/>

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
                            </Grid>
                        </div>

                        <div>
                            <h2>Work Information</h2>
                            <Divider sx={{ margin: '7px 0 15px 0'}}/>

                            <Grid container spacing={2}>  
                                <Grid size={12} item>
                                    <FormControl>
                                        <FormLabel sx={{ fontWeight: 600 }}>Role</FormLabel>
                                        <Input
                                            variant="plain"
                                            value={values.role}
                                            onChange={handleChange}
                                            name="role"
                                            className="border border-gray-200"
                                            sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid size={12} item>
                                    <FormControl>
                                        <FormLabel sx={{ fontWeight: 600 }}>Department</FormLabel>
                                        <Input
                                            variant="plain"
                                            name="department"
                                            value={values.department}
                                            onChange={handleChange}
                                            className="border border-gray-200"
                                            sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>

                </form>
            }
        />
    )
}