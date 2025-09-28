'use client';

import { Box, Grid }from '@mui/material';
import { Input, Select, Option, Button, Card } from '@mui/joy';
import { Filter, Plus, Building2, Mail, Phone, Download } from 'lucide-react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { MainButton, useDrawer } from '@/components';
import CustomerTable from './table';
import CustomerCU from './cu';

import { CUSTOMER_STATUS, BTN_STYLE, CUSTOMER_COLUMN } from '@/constants';

import { calculateSummary, formatCurrency, tableFilter, handleExportExcel } from '@/handler';

import { customer } from '@/services/redux/actions';

const dataSource = (filteredInfo) => {
  const customers = Object.values(useSelector((state) => state.customer.byID));

  let data = customers
  
  return tableFilter(data, filteredInfo)
}

export default function Customers() {

  const { toggleDrawer } = useDrawer();
  const dispatch = useDispatch();

  const customers = Object.values(useSelector((state) => state.customer.byID));

  const [filteredInfo, setFilteredInfo] = useState({ status: 'all'})

  useEffect(() => {
    dispatch(customer.get_customers_fetch());
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

  const filteredData = dataSource(filteredInfo)

  return (
    <div>
        <Box sx={{ boxShadow: 'none' }} className='p-6'>

                <Grid container justifyContent='space-between' className="mb-4">
                    <div className="py-5">
                        <h2 className="text-[20px] font-bold">Customers</h2>
                        <p className="text-gray-500">Manage client relationships and business development</p>
                    </div>
                      <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                        <MainButton 
                          variant="outlined" 
                          title={'Export'} 
                          startIcon={<Download/>} 
                          style={{...BTN_STYLE.outlined, height: 42 }}
                          onClick={() => handleExportExcel(filteredData, CUSTOMER_COLUMN, 'customers')}
                        />
                        <MainButton title={'Add customer'} startIcon={<Plus/>} onClick={toggleDrawer}/>
                      </Grid>
                </Grid>

                <Grid container spacing={2} className='mb-4'>
                  {cards.map((card, i) => (
                    <Grid key={i} size={4}>
                      <Card orientation="horizontal" variant='outlined' key={i} style={{ boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.1)' }}>
                          <Grid container className="items-center space-x-3">
                              {card.icon}
                              <div>
                                <p className="text-sm text-muted-foreground">{card.title}</p>
                                <p className="text-xl font-semibold text-foreground">{card.description}</p>
                              </div>
                          </Grid>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Card variant='outlined' orientation="horizontal" style={{ marginTop: 20}}>
                       <Input
                          variant="soft"
                          placeholder='Search customers, companies, and emails...'
                          className='w-3xl'
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              setFilteredInfo(prev => ({ ...prev, search: event.target.value }))
                            }
                          }}
                      />
                      <Select
                          indicator={<KeyboardArrowDown />} 
                          variant="plain"
                          className='w-48 px-4'
                          value={filteredInfo.status}
                          onChange={(event, value) => setFilteredInfo(prev => ({ ...prev, status: value }))}
                      >
                        {Object.values(CUSTOMER_STATUS).map((s) => (
                          <Option value={s.value} key={s.value}>{s.label}</Option>
                        ))}
                    </Select>
                    <Button variant="outlined" disabled className='h-10' >
                      <Filter className="h-4 w-4" />
                    </Button>
                </Card>
         </Box>

         <CustomerTable filteredData={filteredData} sort='updatedAt'/>
         <CustomerCU />
    </div>
  );
}