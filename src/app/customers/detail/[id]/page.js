'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, Building2, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';
import { Avatar, Card, Divider } from "@mui/material";
import Link from 'next/link';

import { MainButton, TagLabel, useDrawer } from '@/components';
import CustomerCU from '../../cu';

import { CUSTOMER_STATUS, BTN_STYLE } from '@/constants';
import { customers } from '@/dummyData';

import { getInitials, formatCurrency } from '@/handler';

export default function CustomerDetail() {

    const param = useParams();  
    const { id } = param
    const { toggleDrawer } = useDrawer();

    const customer = customers.find(c => c.id.toString() === id);

  return (
    <div>
        <div className="flex items-center px-6 py-8 ">
            <div className='w-30 flex-none flex items-center row-span-2 '>
                <Link href='/customers'>
                    <MainButton variant='outlined' icon={<ArrowLeft size={16}/>} style={{ minWidth: 40, height: 40, padding: '0 2px', ...BTN_STYLE.outlined }}/>
                </Link>
                <Avatar sx={{ width: 56, height: 56, margin: '0 10px' }}>{getInitials(customer?.customer_name)} </Avatar>
            </div>
            <div className='flex-auto'>
                <h1 className="font-bold text-[22px]">{customer?.customer_name}</h1>
                <span className=''>{customer?.company}</span>
            </div>
            <MainButton startIcon={<Edit size={16}/>} onClick={toggleDrawer} title='Edit Customer'/>
        </div>
        
        <div className="grid grid-cols-8">
            <Card style={{ borderRadius: '10px', boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.3)' }} sx={{ boxShadow: 'none' }} className="col-span-5 mx-6 p-6">
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Customer Overview</h2>
                        <div className='flex grid grid-cols-2 gap-4 my-6'>
                            <div className="flex w-64 items-center">
                                <Mail className="mr-5 size-5 text-gray-500"/>
                                <div>
                                    <span className='text-gray-500'>Email</span>
                                    <p>{customer?.email}</p>
                                </div>
                            </div>
                            <div className="flex w-64 items-center" >
                                <Phone className="mr-5 size-5 text-gray-500"/>
                                <div>  
                                    <span className='text-gray-500'>Phone</span>
                                    <p>{customer?.contact}</p>
                                </div>
                            </div>
                            <div className="flex w-64 items-center">
                                <MapPin className="mr-5 size-5 text-gray-500"/>
                                <div>
                                    <span className='text-gray-500 2'>Address</span>
                                    <p>{customer?.address}</p>
                                </div>
                            </div>
                        </div>

                        <Divider sx={{ margin: '18px 0'}}/>

                        <div className='grid grid-cols-3 gap-x-6'>
                            <div className='bg-gray-100 rounded-md h-20 flex flex-col justify-center items-center'>
                                <span className='font-bold text-xl'>{formatCurrency(customer?.summary?.total_spent)}</span>
                                <p>Total Spent</p>
                            </div>
                            <div className='bg-gray-100 rounded-md h-20 flex flex-col justify-center items-center'>
                                <span className='font-bold text-xl'>{customer?.summary?.total_projects}</span>
                                <p>Projects</p>
                            </div>
                            <div className='bg-gray-100 rounded-md h-20 flex flex-col justify-center items-center'>
                                <span className='font-bold text-xl'>{formatCurrency(customer?.summary?.total_spent)}</span>
                                <p>Average Project Value</p>
                            </div>
                        </div>
                </div>
            </Card>
            <Card style={{ borderRadius: '10px', boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.3)' }} sx={{ boxShadow: 'none' }} className="col-span-3 mr-6 p-6">
                <div>
                    <h2 className="text-xl font-bold mb-2">Customer Information</h2>
                    <div className='my-6'>
                        <div className="flex w-64 items-center mb-3">
                            <Building2 className="mr-5 size-5 text-gray-500"/>
                            <div>
                                <span className='text-gray-500'>Company</span>
                                <p>{customer?.company}</p>
                            </div>
                        </div>
                        <div className="flex w-64 items-center">
                            <Calendar className="mr-5 size-5 text-gray-500"/>
                            <div>
                                <span className='text-gray-500'>Last Update</span>
                                <p>{customer?.updatedAt}</p>
                            </div>
                        </div>
                    </div>
                    
                    <Divider sx={{ margin: '18px 0'}}/>

                    <div className='flex justify-between mb-2'>
                        <span>Customer ID</span>
                        <p>{customer?.id}</p>
                    </div>
                    <div className='flex justify-between'>
                        <span>Status</span>
                        <TagLabel label={CUSTOMER_STATUS?.[customer?.status]?.label} className={CUSTOMER_STATUS?.[customer?.status]?.className} />
                    </div>
                </div>
            </Card>
        </div>

        <div className='grid grid-cols-8 mt-6'>
            <Card style={{ borderRadius: '10px', boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.3)' }} sx={{ boxShadow: 'none' }} className="col-span-5 mx-6 p-6">
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Recent Activity</h2>
                        <div className='grid grid-rows-3 gap-4 my-6'>
                            <div className="flex w-64 items-center">
                                <Mail className="mr-5 size-5 text-gray-500"/>
                                <div>
                                    <span className='text-gray-500'>Email</span>
                                    <p>{customer?.email}</p>
                                </div>
                            </div>
                            <div className="flex w-64 items-center" >
                                <Phone className="mr-5 size-5 text-gray-500"/>
                                <div>  
                                    <span className='text-gray-500'>Phone</span>
                                    <p>{customer?.contact}</p>
                                </div>
                            </div>
                            <div className="flex w-64 items-center">
                                <MapPin className="mr-5 size-5 text-gray-500"/>
                                <div>
                                    <span className='text-gray-500 2'>Address</span>
                                    <p>{customer?.address}</p>
                                </div>
                            </div>
                        </div>
                </div>
            </Card>
            <Card style={{ borderRadius: '10px', boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.3)' }} sx={{ boxShadow: 'none' }} className="col-span-3 mr-6 p-6">
                <div>
                    <h2 className="text-xl font-bold mb-2">Project Summary</h2>

                    <div className='flex justify-between mb-2'>
                        <span>Total Projects</span>
                        <p>{customer?.summary?.total_projects}</p>
                    </div>
                    <div className='flex justify-between mb-2'>
                        <span>Total Value</span>
                        <p>{formatCurrency(customer?.summary?.total_spent)}</p>
                    </div>
                    <div className='flex justify-between mb-2'>
                        <span>Active Projects</span>
                        <p>{customer?.summary?.active_projects}</p>
                    </div>
                </div>
            </Card>
        </div>

        <CustomerCU type='edit' customer={customer}/>
    </div>
  );
}
