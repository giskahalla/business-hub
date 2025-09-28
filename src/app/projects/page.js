'use client';

import { Box, Grid }from '@mui/material';
import { Input, Select, Option, Button, Card } from '@mui/joy';
import { Filter, Plus, Download } from 'lucide-react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { MainButton, useDrawer } from '@/components';
import CustomerTable from './table';
import ProjectCU from './cu';

import { PROJECT_STATUS, BTN_STYLE, PROJECT_COLUMN } from '@/constants';

import { tableFilter, handleExportExcel } from '@/handler';

import { project } from '@/services/redux/actions';

const dataSource = (filteredInfo) => {
  const projects = Object.values(useSelector((state) => state.project.byID));

  let data = projects
  
  return tableFilter(data, filteredInfo)
}

export default function Projects() {

  const { toggleDrawer } = useDrawer();
  const dispatch = useDispatch();

  const [filteredInfo, setFilteredInfo] = useState({ status: 'all' })

  useEffect(() => {
    dispatch(project.get_projects_fetch());
  }, [dispatch]);


  const filteredData = dataSource(filteredInfo)

  return (
    <div>
        <Box sx={{ boxShadow: 'none' }} className='p-6'>
                <Grid container justifyContent='space-between' className="mb-4">
                      <div className="py-5">
                          <h2 className="text-[20px] font-bold">Projects</h2>
                          <p className="text-gray-500">Track project progress, budgets, and deliverables</p>
                      </div>
                      <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                        <MainButton 
                          variant="outlined" 
                          title={'Export'} 
                          startIcon={<Download/>}  
                          onClick={() => handleExportExcel(filteredData, PROJECT_COLUMN, 'projects')} 
                          style={{...BTN_STYLE.outlined, height: '42px'  }}/>

                        <MainButton variant="contained" title={'Add project'} startIcon={<Plus/>} onClick={toggleDrawer} />
                      </Grid>
                </Grid>

                <Card variant='outlined' orientation="horizontal" style={{ marginTop: 20}}>
                        <Input
                          variant="soft"
                          placeholder='Search projects, clietns, and assignees...'
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
                        {Object.values(PROJECT_STATUS).map((s) => (
                          <Option value={s.value} key={s.value}>{s.label}</Option>
                        ))}
                    </Select>
                    <Button variant="outlined" disabled className='h-10' >
                      <Filter className="h-4 w-4" />
                    </Button>
                </Card>
         </Box>

         <CustomerTable filteredData={filteredData} sort='due_date'/>
         <ProjectCU />
    </div>
  );
}