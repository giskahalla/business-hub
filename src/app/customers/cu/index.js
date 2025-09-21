'use client';

import { Drawer, Box, FormControl, TextField, Grid, Select, MenuItem, Typography } from "@mui/material"
import { useState } from "react"

import { useDrawer, MainButton } from "@/components";

import { CUSTOMER_STATUS, BTN_STYLE } from "@/constants";

import '../../globals.css';

export default function CustomerCU({ type, customer }) {

    const { toggleDrawer, openDrawer } = useDrawer();

    const [values, setValues] = useState({
        fullName: "",
        company: "",
        email: "",
        contact: "",
        status: "",
        address: "",
    });

     const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("values:", values);
    };

    return (
        <Drawer open={openDrawer} anchor="right">
            <Box
                sx={{ width: 450, p: 3, height: '90%' }}
                >
                    <h2 className="font-bold text-xl">{type === 'edit' ? 'Edit Customer' : 'Add New Customer'}</h2>
                    <p>{type === 'edit' ? `Update details for ${customer?.customer_name}` : 'Add a new customer to your client database' }</p>

                    <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col h-full justify-between mt-8">
                        <Grid container spacing={2}>  
                            <Grid size={12} item>
                                <Typography variant="body2" fontWeight="bold" mb={0.5}>
                                    Full Name
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter customer's full name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    className="bg-gray-50"
                                    // required
                                />
                            </Grid>

                            <Grid size={12} item>
                                <Typography variant="body2" fontWeight="bold" mb={0.5}>
                                    Company
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter company name"
                                    name="company"
                                    value={values.company}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-200 rounded"
                                    // required
                                />
                            </Grid>

                            <Grid size={12} item>
                                <Typography variant="body2" fontWeight="bold" mb={0.5}>
                                    Email Address
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="customer@company.com"
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-200 rounded"
                                    // required
                                />
                            </Grid>

                            <Grid size={6} item>
                                <Typography variant="body2" fontWeight="bold" mb={0.5}>
                                    Phone Number
                                </Typography>
                                <TextField
                                    type="number"
                                    fullWidth
                                    placeholder="621234567"
                                    name="contact"
                                    value={values.contact}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-200 rounded"
                                    // required
                                />
                            </Grid>

                            <Grid size={6} item>
                                <Typography variant="body2" fontWeight="bold" mb={0.5}>
                                    Status
                                </Typography>
                                <FormControl fullWidth 
                                // required
                                >
                                    <Select
                                        name="status"
                                        value={values.status}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-200 rounded"
                                        >
                                            {Object.values(CUSTOMER_STATUS).map((status) => (
                                                <MenuItem key={status.label} value={status.value}>{status.label}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={12} item>
                                <Typography variant="body2" fontWeight="bold" mb={0.5}>
                                    Address
                                </Typography>
                                <TextField
                                    fullWidth
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-200 rounded"
                                    // required
                                    // multiline
                                />
                            </Grid>
                        </Grid>

                        <div style={{ display: 'flex', gap: 10, textAlign: "right", marginTop: 20 }}>
                            <MainButton type="submit" title='Submit' />
                            <MainButton variant="outlined" onClick={toggleDrawer} title='Cancel' style={{...BTN_STYLE.outlined }}/>
                        </div>

                    </form>
                </Box>
        </Drawer>
    )
}