'use client';

import { Box, Grid, Stack }from '@mui/material';
import { Input, Select, Option, Card } from '@mui/joy';
import { DollarSign, RefreshCw, Plus, Download } from 'lucide-react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { MainButton, useDrawer, ModalStatus } from '@/components';
import CustomerTable from './table';
import CustomerCU from './cu';

import { CUSTOMER_STATUS, BTN_STYLE, CUSTOMER_COLUMN } from '@/constants';

import { calculateSummary, formatCurrency, tableFilter, handleExportExcel } from '@/handler';

import { customer, company } from '@/services/redux/actions';

const dataSource = (filteredInfo) => {
  const customers = Object.values(useSelector((state) => state.customer.byID));
  const company = useSelector((state) => state.company.byID)

  if (customers?.length === 0) {
    return []; 
  }

  let data = customers.map((cust) => ({
    ...cust,
    company_name: company?.[cust.company]?.name || '-',
  }));
  
  return tableFilter(data, filteredInfo)
}

export default function Customers() {

  const { toggleDrawer } = useDrawer();
  const dispatch = useDispatch();

  const customers = Object.values(useSelector((state) => state.customer.byID));

  const [filteredInfo, setFilteredInfo] = useState({ status: 'all'})

  useEffect(() => {
    dispatch(customer.get_customers_request());
    dispatch(company.get_companies_request());
  }, [dispatch]);

  const cards = [ 
    {
      id: 1,
      title: 'Active Customers',
      total: calculateSummary(customers).active_customers,
      description: 'currently available',
      icon: (<RefreshCw className="size-5" />),
    },
    {
      id: 2,
      title: 'Total Spent',
      total: formatCurrency(calculateSummary(customers).total_revenue),
      description: 'all customer spending',
      icon:( <DollarSign className="size-5" />)
    },
  ];

  const filteredData = dataSource(filteredInfo)

  return (
    <div style={{ width: '100%'}}>
        <Box sx={{ boxShadow: 'none' }} className='px-6 pb-6'>

                <Grid container justifyContent='space-between' className="mb-4">
                    <div className="py-6">
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
                    <Grid key={i} size={6}>
                      <Card orientation="horizontal" variant='outlined' key={i} style={{ boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.1)' }} sx={{ backgroundColor: 'white'}} invertedColors>
                          <Stack style={{ width: '100%'}}>
                              <div className='flex justify-between mb-4'>
                                <p className="text-base text-muted-foreground">{card.title}</p>
                                {card.icon}
                              </div>
                                <p className="text-xl font-bold text-foreground">{card.total}</p>
                                <p className="text-sm text-muted-foreground">{card.description}</p>
                          </Stack>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Card variant='outlined' orientation="horizontal" style={{ marginTop: 20 }} sx={{ backgroundColor: 'white'}} invertedColors>
                      <Input
                          variant="plain"
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
                        <Option value="all" key="all">All Status</Option>
                        {Object.values(CUSTOMER_STATUS).map((s) => (
                          <Option value={s.value} key={s.value}>{s.label}</Option>
                        ))}
                    </Select>
                </Card>
         </Box>

         <CustomerTable filteredData={filteredData} sort='updatedAt'/>
         <CustomerCU />
         <ModalStatus />

    </div>
  );
}