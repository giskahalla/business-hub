'use client';

import { Grid, Divider } from "@mui/material"
import { FormControl, FormLabel, Input } from "@mui/joy"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import 'react-international-phone/style.css';

import { useDrawer, DrawerWrapper } from "@/components";

import { company } from "@/services/redux/actions";

import '../../globals.css';

export default function CompanyCU() {

    const dispatch = useDispatch()

    const { toggleDrawer, data, updateData } = useDrawer();

    const { action } = data || {}

    const [values, setValues] = useState({
        name: "",
        industry: "",
        address: "",
        yop: "",
        contact_person: "",
        contact_email: "",
        contact_phone: "",
    });

    const handleEmpty = () => {
        setValues({ name: "", industry: "", address: "", yop: "", contact_person: "", contact_email: "", contact_phone: ""}); 
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
            contact_phone: formattedPhone,
        });
        } else {
        setValues({
            ...values,
            contact_phone: '',
        });
        }
    };

     const handleDateChange = (newValue) => {
        setValues({ ...values, yop: newValue ? newValue.year() : '' });
    };

    const onClose =  () => {
        updateData(null)
        handleEmpty()
        toggleDrawer();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { action, contact_email, contact_person, contact_phone, ...rest } = values
        const newVal = {
            ...rest,
            ...(contact_email || contact_person || contact_phone ? {
                contact: {
                    ...(contact_person && { person: contact_person }),
                    ...(contact_email && { email: contact_email }),
                    ...(contact_phone && { phone: contact_phone }),
                }
            } : {})
        }
        if(action === 'edit'){
            dispatch(company.update_company_request(newVal))
        } else {
            dispatch(company.create_company_request(newVal))
        }
        onClose()
    };

    return (
        <DrawerWrapper
            onClose={onClose}
            onSubmit={handleSubmit}
            drawerTitle={
                <div>
                    <h2 className="font-bold text-xl">{action === 'edit' ? 'Edit Company' : 'Add New Company'}</h2>
                    <p>{action === 'edit' ? `Update details for ${data?.name}` : 'Fill out the details to add a new company' }</p>
                </div>
            }
            drawerContent={
                <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col h-full mt-8">
                        <div className="mb-10">
                            <h2>Company Information</h2>
                            <Divider sx={{ margin: '7px 0 15px 0'}}/>

                            <Grid container spacing={2}>  
                                <Grid size={12} item>
                                    <FormControl required>
                                        <FormLabel sx={{ fontWeight: 600 }}>Company Name</FormLabel>
                                        <Input
                                            variant="plain"
                                            value={values.name}
                                            onChange={handleChange}
                                            name="name"
                                            className="border border-gray-200"
                                            sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                        />
                                    </FormControl>
                                </Grid>

                                 <Grid size={12} item>
                                    <FormControl required>
                                        <FormLabel sx={{ fontWeight: 600 }}>Industry</FormLabel>
                                        <Input
                                            variant="plain"
                                            value={values.industry}
                                            onChange={handleChange}
                                            name="industry"
                                            className="border border-gray-200"
                                            sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid size={6} item>
                                    <FormControl required>
                                        <FormLabel sx={{ fontWeight: 600 }}>Address</FormLabel>
                                        <Input
                                            variant="plain"
                                            placeholder="Jakarta, Indonesia"
                                            name="address"
                                            value={values.address}
                                            onChange={handleChange}
                                            className="border border-gray-200"
                                            sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid size={6} item>
                                    <FormControl required>
                                        <FormLabel sx={{ fontWeight: 600 }}>Established Year</FormLabel>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker views={['year']} openTo="year" onChange={handleDateChange}/>
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>

                        <div>
                            <h2>Contact Information</h2>
                            <Divider sx={{ margin: '7px 0 15px 0'}}/>

                            <Grid container spacing={2}>  
                                <Grid size={12} item>
                                    <FormControl>
                                        <FormLabel sx={{ fontWeight: 600 }}>Contact Person</FormLabel>
                                        <Input
                                            variant="plain"
                                            value={values.contact_person}
                                            onChange={handleChange}
                                            name="contact_person"
                                            className="border border-gray-200"
                                            sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid size={6} item>
                                    <FormControl>
                                        <FormLabel sx={{ fontWeight: 600 }}>Email</FormLabel>
                                        <Input
                                            variant="plain"
                                            placeholder="example@company.com"
                                            type="email"
                                            name="contact_email"
                                            value={values.contact_email}
                                            onChange={handleChange}
                                            className="border border-gray-200"
                                            sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid size={6} item>
                                    <FormControl>
                                        <FormLabel sx={{ fontWeight: 600 }}>Phone</FormLabel>
                                        <PhoneInput
                                            inputProps={{
                                                required: true
                                            }}
                                            value={values.contact_phone}
                                            onChange={handleChangePhone}
                                            inputStyle={{ height: 50, width: '100%', background: '#fbfcfe', borderColor: '#ebe6e7' }}
                                            buttonStyle={{ background: '#fbfcfe', borderColor: '#ebe6e7' }}
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