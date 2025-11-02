'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, Mail, Phone, MapPin, Edit } from 'lucide-react';
import { Avatar, Grid, Stack } from "@mui/material";
import { Card, Chip, LinearProgress } from '@mui/joy';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import dayjs from 'dayjs';

import { MainButton, useDrawer } from '@/components';
import CustomerCU from '../../cu';

import { CUSTOMER_STATUS } from '@/constants';

import { getInitials, formatCurrency } from '@/handler';

import { project } from '@/services/redux/actions';

export default function CustomerDetail() {

    const dispatch = useDispatch();
    
    const { byID: customers } = useSelector((state) => state.customer);
    const { byUserID: projects } = useSelector((state) => state.project);

    const param = useParams();  
    const { id } = param
    const { toggleDrawer, updateData } = useDrawer();

    const customer = customers[id]

    useEffect(() => {
        dispatch(project.get_project_thru_userId_request(id));
    }, [dispatch]);

  return (
    <div>
        <div className="flex items-center justify-between px-6 py-8 ">
            <Link href='/customer'>
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
                                    <p className='font-medium'>{customer?.company}</p>
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
                                        <p className='font-medium'>{customer?.email}</p>
                                    </div>
                                </Grid>
                                <Grid className="flex items-center" >
                                    <Phone className="mr-5 size-5 text-gray-500"/>
                                    <div>  
                                        <span className='text-gray-500'>Phone</span>
                                        <p className='font-medium'>{customer?.contact}</p>
                                    </div>
                                </Grid>
                                <Grid className="flex items-center">
                                    <MapPin className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500 2'>Address</span>
                                        <p className='font-medium'>{customer?.address}</p>
                                    </div>
                                </Grid>
                            </Stack>
                    </Card>

                    <Card style={{  boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="m-6 p-6" sx={{ backgroundColor: 'white'}} invertedColors>
                            <h2 className="text-lg font-semibold mb-2">Statistics</h2>

                            <Stack spacing={2}>
                                <Grid container justifyContent='space-between'>
                                    <span>Total Projects</span>
                                    <p className='font-medium'>{projects?.length || 0}</p>
                                </Grid>
                                <Grid container justifyContent='space-between'>
                                    <span>Active Projects</span>
                                    <p className='font-medium'>{projects?.filter(p => [1, 2].includes(p.status))?.length || 0}</p>
                                </Grid>
                                <Grid container justifyContent='space-between'>
                                    <span>Completed Projects</span>
                                    <p className='font-medium'>{projects?.filter(p => [4].includes(p.status))?.length || 0}</p>
                                </Grid>

                                <Grid container justifyContent='space-between'>
                                    <span>Total Value</span>
                                    <p className='font-medium'>{formatCurrency(customer?.spent)}</p>
                                </Grid>
                            </Stack>
                    </Card>
                </Stack>
            </Grid>

            <Grid size={7}>
                <Card style={{ boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="mr-6 p-6">
                        <h2 className="text-lg font-semibold mb-2">Projects ({projects?.length || 0})</h2>
                        <Stack spacing={2}>
                            {projects?.map((p) => {
                                const done = p?.tasks?.filter(task => task.status)?.length || 0
                                const total = p?.tasks?.length || 0
                                const progress = total > 0 ? (done / total) * 100 : 0
                                return (
                                    <Card key={p.id} variant='outlined' style={{ boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.1)' }} className="p-4" sx={{ backgroundColor: 'white'}} invertedColors>
                                        <Grid container justifyContent='space-between' alignItems='center'>
                                            <h3 className="font-semibold text-md">{p.name}</h3>
                                            <Chip variant='soft' size='sm' sx={{ ...CUSTOMER_STATUS?.[p.status]?.style }}>
                                                {CUSTOMER_STATUS?.[p.status]?.label}
                                            </Chip>
                                        </Grid>
                                        <Grid>
                                            <div className='w-full flex justify-between gap-2'>
                                                <p className='text-base text-gray-500'>Progress: {Math.round(progress)}%</p>
                                                <p className='text-base text-gray-500'>
                                                    {p?.budget?.estimated ? formatCurrency(p?.budget?.estimated) : 0}
                                                </p>
                                            </div>
                                            <LinearProgress determinate value={progress} color="neutral" sx={{ width: '100%', marginTop: 1 }} />
                                            <div className='w-full flex justify-between mt-4'>
                                                <p className='text-base text-gray-500'>Start date: {dayjs(p.start_date).format('MMM D, YYYY')}</p>
                                                <p className='text-base text-gray-500'>Due date: {dayjs(p.due_date).format('MMM D, YYYY')}</p>
                                            </div>
                                        </Grid>
                                    </Card>
                                )}
                            )}
                        </Stack>
                </Card>
            </Grid>
        </Grid>

        <CustomerCU />
    </div>
  );
}
