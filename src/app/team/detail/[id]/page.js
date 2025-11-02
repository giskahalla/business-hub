'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar1, Mail, Phone, Calendar, Edit } from 'lucide-react';
import { Avatar,  Grid, Stack } from "@mui/material";
import { Card, Chip, LinearProgress } from '@mui/joy';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { MainButton, useDrawer } from '@/components';
import CustomerCU from '../../cu';

import { CUSTOMER_STATUS } from '@/constants';

import { getInitials, formatCurrency } from '@/handler';

import { project } from '@/services/redux/actions';

export default function UserDetail() {

    const dispatch = useDispatch();
    
    const { byID: team } = useSelector((state) => state.team);
    const { byUserID: projects } = useSelector((state) => state.project);

    const param = useParams();  
    const { id } = param
    const { toggleDrawer, updateData } = useDrawer();

    const user = team[id]

    useEffect(() => {
        dispatch(project.get_project_thru_userId_request(id));
    }, [dispatch]);

  return (
    <div>
        <div className="flex items-center justify-between px-6 py-8 ">
            <Link href='/team'>
            <div className="flex items-center py-3">

                <MainButton variant='plain' icon={<ArrowLeft size={16}/>} style={{ minWidth: 40, height: 40, padding: '0 2px' }}/>
                <div className='w-20 flex items-center'>
                    <Avatar sx={{ width: 56, height: 56, margin: '0 10px' }}>{getInitials(user?.name)} </Avatar>
                </div>
                <div className='flex-auto'>
                    <h1 className="font-bold text-[22px]">{user?.name}</h1>
                    <p className=''>{user?.role} . {user?.department}</p>
                </div>

            </div>
            </Link>
            <MainButton startIcon={<Edit size={16}/>} onClick={() => {toggleDrawer(); updateData({...user, action: 'edit'})}} title='Edit User'/>
        </div>

        <Grid container>
            <Grid size={8}>
                <Stack>
                    <Card variant='outlined' style={{ boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="mx-6 p-6" sx={{ backgroundColor: 'white'}} invertedColors>
                            <h2 className="text-lg font-semibold mb-2">User Information</h2>

                            <Grid container spacing={2} style={{ padding: 6 }}>
                                <Grid size={6} className="flex items-center">
                                    <Mail className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500'>Email</span>
                                        <p className='font-medium'>{user?.email}</p>
                                    </div>
                                </Grid>
                                <Grid size={6} className="flex items-center" >
                                    <Phone className="mr-5 size-5 text-gray-500"/>
                                    <div>  
                                        <span className='text-gray-500'>Phone</span>
                                        <p className='font-medium'>{user?.contact}</p>
                                    </div>
                                </Grid>
                                <Grid size={6} className="flex items-center">
                                    <Calendar1 className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500'>Join Date</span>
                                        <p className='font-medium'>{dayjs(user?.joinedAt).format('DD/MM/YYYY')}</p>
                                    </div>
                                </Grid>
                            </Grid>
                    </Card>
                </Stack>
            </Grid>

            <Grid size={4}>
                <Card style={{ boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} sx={{ backgroundColor: 'white'}} className="mr-6 p-6">
                        <h2 className="text-lg font-semibold mb-2">Project Statics</h2>
                        <Stack spacing={2}>
                            <Grid container className="items-center">
                                <Calendar1 className="mr-5 size-5 text-gray-500"/>
                                <div>
                                    <span className='text-gray-500'>Company</span>
                                    <p>{user?.company}</p>
                                </div>
                            </Grid>
                            <Grid container className="items-center">
                                <Calendar className="mr-5 size-5 text-gray-500"/>
                                <div>
                                    <span className='text-gray-500'>Last Update</span>
                                    <p>{user?.updatedAt}</p>
                                </div>
                            </Grid>
                
                        </Stack>
                </Card>
            </Grid>
        </Grid>

        <Card style={{ boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="m-6 p-6">
                <h2 className="text-lg font-semibold mb-2">Projects ({projects?.length || 0})</h2>
                <Stack spacing={2}>
                    {projects
                    ?.filter(p => [1,2].includes(p.status))
                    ?.map((p) => {
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

        <CustomerCU />
    </div>
  );
}
