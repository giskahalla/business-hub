'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, Building2, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';
import { Avatar, Divider, Grid, Stack } from "@mui/material";
import { Card, Chip } from '@mui/joy';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { MainButton, useDrawer } from '@/components';
import CustomerCU from '../../cu';

import { CUSTOMER_STATUS, BTN_STYLE } from '@/constants';

import { getInitials, formatCurrency } from '@/handler';

export default function CustomerDetail() {
    
    const { byID: customers} = useSelector((state) => state.customer);

    const param = useParams();  
    const { id } = param
    const { toggleDrawer, updateData } = useDrawer();

    const customer = customers[id]

  return (
    <div>
        <div className="flex items-center px-6 py-8 ">
            <div className='w-30 flex items-center'>
                <Link href='/customers'>
                    <MainButton variant='outlined' icon={<ArrowLeft size={16}/>} style={{ minWidth: 40, height: 40, padding: '0 2px', ...BTN_STYLE.outlined }}/>
                </Link>
                <Avatar sx={{ width: 56, height: 56, margin: '0 10px' }}>{getInitials(customer?.name)} </Avatar>
            </div>
            <div className='flex-auto'>
                <h1 className="font-bold text-[22px]">{customer?.name}</h1>
                <span className=''>{customer?.company}</span>
            </div>
            <MainButton startIcon={<Edit size={16}/>} onClick={() => {toggleDrawer(); updateData({...customer, action: 'edit'})}} title='Edit Customer'/>
        </div>
        
        <Grid container>
            <Grid size={8}>
                <Card variant='outlined' style={{ boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="mx-6 p-6">
                        <h2 className="text-xl font-bold mb-2">Customer Overview</h2>

                        <Grid container spacing={2}>
                            <Grid size={6} className="flex items-center">
                                <Mail className="mr-5 size-5 text-gray-500"/>
                                <div>
                                    <span className='text-gray-500'>Email</span>
                                    <p>{customer?.email}</p>
                                </div>
                            </Grid>
                            <Grid size={6} className="flex items-center" >
                                <Phone className="mr-5 size-5 text-gray-500"/>
                                <div>  
                                    <span className='text-gray-500'>Phone</span>
                                    <p>{customer?.contact}</p>
                                </div>
                            </Grid>
                            <Grid size={6} className="flex items-center">
                                <MapPin className="mr-5 size-5 text-gray-500"/>
                                <div>
                                    <span className='text-gray-500 2'>Address</span>
                                    <p>{customer?.address}</p>
                                </div>
                            </Grid>
                        </Grid>

                        <Divider sx={{ margin: '18px 0'}}/>

                        <Grid container spacing={3}>
                            <Grid size={4} className='bg-gray-100 h-20 flex flex-col justify-center items-center'>
                                <span className='font-bold text-xl'>{formatCurrency(customer?.summary?.total_spent)}</span>
                                <p>Total Spent</p>
                            </Grid>
                            <Grid size={4} className='bg-gray-100 rh-20 flex flex-col justify-center items-center'>
                                <span className='font-bold text-xl'>{customer?.summary?.total_projects}</span>
                                <p>Projects</p>
                            </Grid>
                            <Grid size={4} className='bg-gray-100 h-20 flex flex-col justify-center items-center'>
                                <span className='font-bold text-xl'>{formatCurrency(customer?.summary?.total_spent)}</span>
                                <p>Average Project Value</p>
                            </Grid>
                        </Grid>
                </Card>
            </Grid>

            <Grid size={4}>
                <Card style={{ boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="mr-6 p-6">
                        <h2 className="text-xl font-bold mb-2">Customer Information</h2>
                        <Stack spacing={2}>
                            <Grid container className="items-center">
                                <Building2 className="mr-5 size-5 text-gray-500"/>
                                <div>
                                    <span className='text-gray-500'>Company</span>
                                    <p>{customer?.company}</p>
                                </div>
                            </Grid>
                            <Grid container className="items-center">
                                <Calendar className="mr-5 size-5 text-gray-500"/>
                                <div>
                                    <span className='text-gray-500'>Last Update</span>
                                    <p>{customer?.updatedAt}</p>
                                </div>
                            </Grid>
                        
                            <Divider sx={{ margin: '18px 0'}}/>

                            <Grid container justifyContent='space-between'>
                                <span>Customer ID</span>
                                <p>{customer?.id}</p>
                            </Grid>
                            <Grid container justifyContent='space-between'>
                                <span>Status</span>
                                <Chip variant='soft' sx={{ ...CUSTOMER_STATUS?.[customer?.status]?.style }}>
                                    {CUSTOMER_STATUS?.[customer?.status]?.label}
                                </Chip>
                            </Grid>
                        </Stack>
                </Card>
            </Grid>
        </Grid>

        <Grid container className="mt-8">
            <Grid size={8}>
                <Card style={{ boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="mx-6 p-6">
                        <h2 className="text-xl font-bold mb-2">Recent Activity</h2>

                        <Stack spacing={2}>
                            <Grid container className="flex items-center">
                                <Mail className="mr-5 size-5 text-gray-500"/>
                                <div>
                                    <span className='text-gray-500'>Email</span>
                                    <p>{customer?.email}</p>
                                </div>
                            </Grid>
                            <Grid container className="flex items-center" >
                                <Phone className="mr-5 size-5 text-gray-500"/>
                                <div>  
                                    <span className='text-gray-500'>Phone</span>
                                    <p>{customer?.contact}</p>
                                </div>
                            </Grid>
                            <Grid container className="flex items-center">
                                <MapPin className="mr-5 size-5 text-gray-500"/>
                                <div>
                                    <span className='text-gray-500 2'>Address</span>
                                    <p>{customer?.address}</p>
                                </div>
                            </Grid>
                        </Stack>
                </Card>
            </Grid>

            <Grid size={4}>
                <Card style={{  boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="mr-6 p-6">
                        <h2 className="text-xl font-bold mb-2">Project Summary</h2>

                        <Stack spacing={2}>
                            <Grid container justifyContent='space-between'>
                                <span>Total Projects</span>
                                <p>{customer?.summary?.total_projects}</p>
                            </Grid>
                            <Grid container justifyContent='space-between'>
                                <span>Total Value</span>
                                <p>{formatCurrency(customer?.summary?.total_spent)}</p>
                            </Grid>
                            <Grid container justifyContent='space-between'>
                                <span>Active Projects</span>
                                <p>{customer?.summary?.active_projects}</p>
                            </Grid>
                        </Stack>
                </Card>
            </Grid>
        </Grid>

        <CustomerCU />
    </div>
  );
}
