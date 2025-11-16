'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Edit, Tag, User } from 'lucide-react';
import { Card, Divider, Grid, Stack, Typography, Badge } from "@mui/material";
import { Chip, LinearProgress } from '@mui/joy';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { MainButton, useDrawer } from '@/components';
import CustomerCU from '../../cu';

import { PROJECT_STATUS, PROJECT_PRIORITY, BTN_STYLE } from '@/constants';

import { formatCurrency } from '@/handler';

export default function ProjectDetail() {

    const { byID: projects } = useSelector((state) => state.project);
    const customers = useSelector((state) => state.customer.byID);
    const teams = useSelector((state) => state.team.byID);

    const param = useParams();  
    const { id } = param
    const { toggleDrawer } = useDrawer();

    const project = projects[id]

    const done = project?.tasks?.filter(task => task.status)?.length || 0
    const total = project?.tasks?.length || 0
    const progress = total > 0 ? (done / total) * 100 : 0

  return (
     <div>
        <div className="flex items-center px-6 py-8 ">
            <div className='w-14 flex items-center'>
                <Link href='/project'>
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
                                    <div>
                                        <Chip variant='soft' sx={{ ...PROJECT_STATUS?.[project?.status]?.style }}>
                                            {PROJECT_STATUS?.[project?.status]?.label}
                                        </Chip>
                                    </div>
                                </Grid>
                                <Grid size={6}>
                                    <span className='text-gray-500 2'>Priority</span>
                                    <div>
                                        <Chip variant='soft' sx={{ ...PROJECT_PRIORITY?.[project?.priority]?.style }}>
                                            {PROJECT_PRIORITY?.[project?.priority]?.label}
                                        </Chip>
                                    </div>
                                </Grid>
                                <Grid size={12}>
                                     <div className='w-full flex justify-between gap-2'>
                                        <Typography>Progress</Typography>
                                        <Typography color='text.secondary'>
                                            {Math.round(progress)}% Complete ({done}/{total} tasks)
                                        </Typography>
                                    </div>
                                        <LinearProgress determinate value={progress} color="neutral" sx={{ width: '100%' }} />
                                </Grid>
                            </Grid>
                    </Card>

                    <Card variant='outlined' style={{ boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="m-6 p-6">
                            <h2 className="text-lg font-semibold mb-4">Pending Tasks ({ project?.tasks?.filter(p => !p.status)?.length || 0})</h2>

                                {project?.tasks?.filter(p => !p.status).map((p, i) => {
                                    return (
                                        <Card key={i} variant='plain' className="p-4">
                                            <Grid container alignItems='center'>
                                                <Badge color='warning' variant="dot"></Badge>
                                                <span className="text-md ml-4">{p.title}</span>
                                            </Grid>
                                        </Card>
                                    )}
                                )}
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
                                        <p className='font-medium'>{dayjs(project?.start_date).format('DD/MM/YYYY')}</p>
                                    </div>
                                </Grid>
                                <Grid container className="items-center">
                                    <Clock className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500'>Due Date</span>
                                        <p className='font-medium'>{dayjs(project?.end_date).format('DD/MM/YYYY')}</p>
                                    </div>
                                </Grid>
                            
                                <Divider sx={{ margin: '18px 0'}}/>

                                <Grid container className="items-center">
                                    <User className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500'>Assignee</span>
                                        <p className='font-medium'>{teams[project?.assignee]?.name}</p>
                                    </div>
                                </Grid>
                                <Grid container className="items-center">
                                    <Tag className="mr-5 size-5 text-gray-500"/>
                                    <div>
                                        <span className='text-gray-500'>Client</span>
                                        <p className='font-medium'>{customers[project?.client]?.name}</p>
                                    </div>
                                </Grid>
                            </Stack>
                    </Card>
                    <Card variant='outlined' style={{  boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)' }} className="mr-6 p-6">
                            <h2 className="text-lg font-semibold mb-4">Budget</h2>

                            <Stack spacing={2}>
                                <Grid container justifyContent='space-between'>
                                    <span className='text-gray-500'>Total Budget</span>
                                    <p className='font-medium'>{formatCurrency(project?.budget?.estimated)}</p>
                                </Grid>
                                <Grid container justifyContent='space-between'>
                                    <span className='text-gray-500'>Spent</span>
                                    <p className='font-medium'>{formatCurrency(project?.budget?.used)}</p>
                                </Grid>
                                <Grid container justifyContent='space-between'>
                                    <span className='text-gray-500'>Remaining</span>
                                    <p className='font-medium'>{formatCurrency((project?.budget?.estimated - project?.budget?.used) || 0)}</p>
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
