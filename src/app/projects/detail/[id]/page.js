'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, Mail, Phone, MapPin, Calendar, Edit, Tag, User } from 'lucide-react';
import { Card, Divider, Grid, Stack } from "@mui/material";
import { Chip } from '@mui/joy';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { MainButton, useDrawer } from '@/components';
import CustomerCU from '../../cu';

import { PROJECT_STATUS, PROJECT_PRIORITY, BTN_STYLE } from '@/constants';

import { formatCurrency } from '@/handler';

export default function ProjectDetail() {

    const { byID: projects } = useSelector((state) => state.project);
    const companies = useSelector((state) => state.company.byID);
    const teams = useSelector((state) => state.team.byID);

    const param = useParams();  
    const { id } = param
    const { toggleDrawer } = useDrawer();

    const project = projects[id]

  return (
     <div>
        <div className="flex items-center px-6 py-8 ">
            <div className='w-14 flex items-center'>
                <Link href='/projects'>
                    <MainButton variant='outlined' icon={<ArrowLeft size={16}/>} style={{ minWidth: 40, height: 40, padding: '0 2px', ...BTN_STYLE.outlined }}/>
                </Link>
            </div>
            <div className='flex-auto'>
                <h1 className="font-bold text-[22px]">{project?.name}</h1>
                <span className=''>Project details</span>
            </div>
            <MainButton startIcon={<Edit size={16}/>} onClick={() => {toggleDrawer(); updateData({...project, action: 'edit'})}} title='Edit Customer'/>
        </div>
        
        <Grid container >
            <Grid size={8}>
                <Stack>
                    <Card variant='outlined' style={{ boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="mx-6 p-6">
                            <h2 className="text-lg font-semibold mb-4">Project Overview</h2>

                            <Grid container spacing={2}>
                                <Grid size={12}>
                                    <span className='text-gray-500'>Description</span>
                                    <p>{project?.desc}</p>
                                </Grid>
                                <Grid size={6}>
                                    <span className='text-gray-500'>Status</span>
                                    <p>
                                        <Chip variant='soft' sx={{ ...PROJECT_STATUS?.[project?.status]?.style }}>
                                            {PROJECT_STATUS?.[project?.status]?.label}
                                        </Chip>
                                    </p>
                                </Grid>
                                <Grid size={6}>
                                    <span className='text-gray-500 2'>Priority</span>
                                    <p>
                                        <Chip variant='soft' sx={{ ...PROJECT_PRIORITY?.[project?.priority]?.style }}>
                                            {PROJECT_PRIORITY?.[project?.priority]?.label}
                                        </Chip>
                                    </p>
                                </Grid>
                                <Grid size={12}>
                                    <span className='text-gray-500'>Progress</span>
                                    <p>{project?.desc}</p>
                                </Grid>
                            </Grid>
                    </Card>

                    <Card variant='outlined' style={{ boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="m-6 p-6">
                            <h2 className="text-lg font-semibold mb-4">Pending Tasks</h2>

                            <Stack spacing={2}>
                                <Grid container className="flex items-center">
                                    <Mail className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500'>Email</span>
                                        <p>{project?.email}</p>
                                    </div>
                                </Grid>
                                <Grid container className="flex items-center" >
                                    <Phone className="mr-5 size-5 text-gray-500"/>
                                    <div>  
                                        <span className='text-gray-500'>Phone</span>
                                        <p>{project?.contact}</p>
                                    </div>
                                </Grid>
                            </Stack>
                    </Card>
                </Stack>
            </Grid>

            <Grid size={4}>
                <Stack>
                    <Card variant='outlined' style={{ boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="mb-6 mr-6 p-6">
                            <h2 className="text-lg font-semibold mb-4">Project Information</h2>
                            <Stack spacing={2}>
                                <Grid container className="items-center">
                                    <Calendar className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500'>Start Date</span>
                                        <p>{project?.start_date}</p>
                                    </div>
                                </Grid>
                                <Grid container className="items-center">
                                    <Clock className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500'>Due Date</span>
                                        <p>{project?.due_date}</p>
                                    </div>
                                </Grid>
                            
                                <Divider sx={{ margin: '18px 0'}}/>

                                <Grid container className="items-center">
                                    <User className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500'>Assignee</span>
                                        <p>{teams[project?.assignee]?.name}</p>
                                    </div>
                                </Grid>
                                <Grid container className="items-center">
                                    <Tag className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500'>Client</span>
                                        <p>{companies[project?.client]?.name}</p>
                                    </div>
                                </Grid>
                            </Stack>
                    </Card>
                    <Card variant='outlined' style={{  boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="mr-6 p-6">
                            <h2 className="text-lg font-semibold mb-4">Budget</h2>

                            <Stack spacing={2}>
                                <Grid container justifyContent='space-between'>
                                    <span>Total Budget</span>
                                    <p>{formatCurrency(project?.budget?.total)}</p>
                                </Grid>
                                <Grid container justifyContent='space-between'>
                                    <span>Spent</span>
                                    <p>{formatCurrency(project?.budget?.used)}</p>
                                </Grid>
                                <Grid container justifyContent='space-between'>
                                    <span>Remaining</span>
                                    <p>{formatCurrency((project?.budget?.total - project?.budget?.used) || 0)}</p>
                                </Grid>
                            </Stack>
                    </Card>
                </Stack>
            </Grid>
        </Grid>

        <CustomerCU />
    </div>
  );
}
