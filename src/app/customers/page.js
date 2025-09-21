'use client';

import { Card, Box, TextField, InputAdornment, Select, MenuItem, CardContent, Button }from '@mui/material';
import { Search, Filter, Plus, Building2, Mail, Phone } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { MainButton, useDrawer } from '@/components';
import CustomerTable from './table';
import CustomerCU from './cu';

import { CUSTOMER_STATUS } from '@/constants';

import { calculateSummary, formatCurrency } from '@/handler';

import { customer } from '@/services/redux/actions';

export default function Customers() {

  const { toggleDrawer } = useDrawer();
  const dispatch = useDispatch();
  const { all: customers } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(customer.get_customer_fetch());
  }, [dispatch]);

  const cards = [
    {
      id: 1,
      title: 'Active Customers',
      description: calculateSummary(customers).active_customers,
      icon: (
        <div className="row-span-3 p-3 bg-green-100 rounded-lg w-11">
          <Building2 className="size-5 text-green-700" />
        </div>
      ),
    },
    {
      id: 2,
      title: 'Total Revenue',
      description: formatCurrency(calculateSummary(customers).total_revenue),
      icon:(
        <div className="row-span-3 p-3 bg-blue-100 rounded-lg">
          <Mail className="size-5 text-blue-700" />
        </div>
      )
    },
    {
      id: 3,
      title: 'Average Spend',
      description: formatCurrency(calculateSummary(customers).average_spend),
      icon: (
        <div className="row-span-3 p-3 bg-purple-100 rounded-lg">
          <Phone className="size-5 text-purple-700"/>
        </div>
      )
    },
  ];

  return (
    <div>
      
        <div className="flex justify-between border-b border-gray-200">
            <div className="px-6 py-4">
                <h2 className="text-[20px] font-bold">Customers</h2>
                <p className="text-gray-500">Manage client relationships and business development</p>
            </div>
        </div>

        <Box sx={{ boxShadow: 'none' }} className='p-6'>
                <div className="flex justify-between mb-4 w-full">
                      <h2 className="card-title">Showing</h2>
                      <MainButton variant="contained" title={'Add customer'} startIcon={<Plus/>} onClick={toggleDrawer}/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4 h-20'>
                  {cards.map((card, i) => (
                    <Card key={i} style={{ borderRadius: '10px', boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.3)' }} sx={{ boxShadow: 'none' }}>
                        <CardContent sx={{ height: '100%' }}>
                          <div className="flex items-center space-x-3">
                            {card.icon}
                            <div>
                              <p className="text-sm text-muted-foreground">{card.title}</p>
                              <p className="text-xl font-semibold text-foreground">{card.description}</p>
                            </div>
                          </div>
                        </CardContent>
                    </Card>
                  ))}
                </div>

                <Card variant='outlined' style={{ borderRadius: '10px', backgroundColor: '#ececf033' }} sx={{ boxShadow: 'none' }} className='flex items-center justify-between p-4 mb-4'>
                      <TextField
                          slotProps={{
                              input: {
                                  startAdornment: (
                                  <InputAdornment position="start">
                                      <Search />
                                  </InputAdornment>
                                  ),
                              },
                          }}
                          className='bg-white border-0 w-3xl'
                          placeholder='Search customers, companies, and emails...'
                          size="small"
                          variant="outlined"
                      />
                      <Select
                          size='small'
                          className='w-48 px-4'
                          style={{ backgroundColor: '#ececf033' }}
                          sx={{
                            "& fieldset": { border: "none" }, 
                          }}
                          defaultValue={'all'}
                      >
                        {Object.values(CUSTOMER_STATUS).map((s) => (
                          <MenuItem value={s.value} key={s.value}>{s.label}</MenuItem>
                        ))}
                    </Select>
                    <Button variant="outlined" disabled className='h-10' style={{ backgroundColor: 'white' }}>
                      <Filter className="h-4 w-4" />
                    </Button>
                </Card>
         </Box>

         <CustomerTable customers={customers}/>
         <CustomerCU />
    </div>
  );
}