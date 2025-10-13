'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, Building2, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';
import { Avatar, Divider, Grid, Stack } from "@mui/material";
import { Card, Chip } from '@mui/joy';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { MainButton, useDrawer } from '@/components';
import CustomerCU from '../../cu';

import { CUSTOMER_STATUS } from '@/constants';

import { getInitials, formatCurrency } from '@/handler';

export default function CustomerDetail() {
    
    const { byID: customers} = useSelector((state) => state.customer);

    const param = useParams();  
    const { id } = param
    const { toggleDrawer, updateData } = useDrawer();

    const customer = customers[id]

  return (
    <div>
        <div className="flex items-center justify-between px-6 py-8 ">
            <Link href='/customers'>
                <MainButton variant='plain' icon={<ArrowLeft size={16}/>} style={{ minWidth: 40, height: 40, padding: '0 2px' }}/>
                <span>Back to customers</span>
            </Link>
            <MainButton startIcon={<Edit size={16}/>} onClick={() => {toggleDrawer(); updateData({...customer, action: 'edit'})}} title='Edit Customer'/>
        </div>

        <Grid container>
            <Grid size={5}>
                <Stack>
                    <Card variant='outlined' style={{ boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="mx-6 p-6" sx={{ backgroundColor: 'white'}} invertedColors>
                            <div className="flex items-center py-3">
                                <div className='w-20 flex items-center'>
                                    <Avatar sx={{ width: 56, height: 56, margin: '0 10px' }}>{getInitials(customer?.name)} </Avatar>
                                </div>
                                <div className='flex-auto'>
                                    <h1 className="font-bold text-[22px]">{customer?.name}</h1>
                                    <p className=''>{customer?.company}</p>
                                    <Chip variant='soft' sx={{ ...CUSTOMER_STATUS?.[customer?.status]?.style, margin: '5px 0' }}>
                                    {CUSTOMER_STATUS?.[customer?.status]?.label}
                                </Chip>
                                </div>
                            </div>

                            <Stack spacing={2} style={{ padding: 6 }}>
                                <Grid className="flex items-center">
                                    <Mail className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500'>Email</span>
                                        <p>{customer?.email}</p>
                                    </div>
                                </Grid>
                                <Grid className="flex items-center" >
                                    <Phone className="mr-5 size-5 text-gray-500"/>
                                    <div>  
                                        <span className='text-gray-500'>Phone</span>
                                        <p>{customer?.contact}</p>
                                    </div>
                                </Grid>
                                <Grid className="flex items-center">
                                    <MapPin className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500 2'>Address</span>
                                        <p>{customer?.address}</p>
                                    </div>
                                </Grid>
                                <Grid container className="items-center">
                                    <Building2 className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500'>Company</span>
                                        <p>{customer?.company}</p>
                                    </div>
                                </Grid>
                            </Stack>
                    </Card>

                    <Card style={{  boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="m-6 p-6" sx={{ backgroundColor: 'white'}} invertedColors>
                            <h2 className="text-lg font-semibold mb-2">Statistics</h2>

                            <Stack spacing={2}>
                                <Grid container justifyContent='space-between'>
                                    <span>Total Projects</span>
                                    <p>{customer?.summary?.total_projects}</p>
                                </Grid>
                                <Grid container justifyContent='space-between'>
                                    <span>Active Projects</span>
                                    <p>{customer?.summary?.active_projects}</p>
                                </Grid>
                                <Grid container justifyContent='space-between'>
                                    <span>Completed Projects</span>
                                    <p>{customer?.summary?.completed_projects || 0}</p>
                                </Grid>

                                <Divider sx={{ margin: '18px 0'}}/>

                                <Grid container justifyContent='space-between'>
                                    <span>Total Value</span>
                                    <p>{formatCurrency(customer?.summary?.total_spent)}</p>
                                </Grid>
                            </Stack>
                    </Card>
                </Stack>
            </Grid>

            <Grid size={7}>
                <Card style={{ boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="mr-6 p-6">
                        <h2 className="text-lg font-semibold mb-2">Projects</h2>
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
                
                        </Stack>
                </Card>
            </Grid>
        </Grid>

        <CustomerCU />
    </div>
  );
}
