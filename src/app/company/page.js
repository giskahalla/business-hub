'use client';

import { Box, Grid }from '@mui/material';
import { Input, Select, Option, Card } from '@mui/joy';
import { Plus, Download } from 'lucide-react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { MainButton, useDrawer, ModalStatus } from '@/components';
import TeamTable from './table';
import MemberCU from './cu';

import { COMPANY_STATUS, BTN_STYLE, COMPANY_COLUMN } from '@/constants';

import { tableFilter, handleExportExcel } from '@/handler';

import { company } from '@/services/redux/actions';

const dataSource = (companies, filteredInfo) => {

  if (companies?.length === 0) {
    return []; 
  }

  let data = companies
  
  return tableFilter(data, filteredInfo)
}

export default function Companies() {

  const { toggleDrawer } = useDrawer();
  const dispatch = useDispatch();

  const companies = Object.values(useSelector((state) => state.company.byID));

  const [filteredInfo, setFilteredInfo] = useState({ status: 'all'})

  useEffect(() => {
    dispatch(company.get_companies_request());
  }, [dispatch]);


  const filteredData = dataSource(companies, filteredInfo)

  return (
    <div>
        <Box sx={{ boxShadow: 'none' }} className='px-6 pb-6'>

                <Grid container justifyContent='space-between' className="mb-4">
                    <div className="py-6">
                        <h2 className="text-[20px] font-bold">Companies</h2>
                        <p className="text-gray-500">Manage and track company information and business relationships</p>
                    </div>
                      <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                        <MainButton 
                          variant="outlined" 
                          title={'Export'} 
                          startIcon={<Download/>} 
                          style={{...BTN_STYLE.outlined, height: 42 }}
                          onClick={() => handleExportExcel(filteredData, COMPANY_COLUMN, 'companies')}
                        />
                        <MainButton title={'Add company'} startIcon={<Plus/>} onClick={toggleDrawer}/>
                      </Grid>
                </Grid>

                <Card variant='outlined' orientation="horizontal" style={{ marginTop: 20 }} sx={{ backgroundColor: 'white'}} invertedColors>
                      <Input
                          variant="plain"
                          placeholder='Search companies, industries...'
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
                        {Object.values(COMPANY_STATUS).map((s) => (
                          <Option value={s.value} key={s.value}>{s.label}</Option>
                        ))}
                    </Select>
                </Card>
         </Box>

         <TeamTable filteredData={filteredData} sort='updatedAt'/>
         <MemberCU />
         <ModalStatus />

    </div>
  );
}