'use client';

import { Box, Grid }from '@mui/material';
import { Input, Select, Option, Card } from '@mui/joy';
import { Plus, Download } from 'lucide-react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { MainButton, useDrawer } from '@/components';
import ProjectTable from './table';
import ProjectCU from './cu';
import ModalUpdateTask from './modalUpdateTask';

import { PROJECT_STATUS, BTN_STYLE, PROJECT_COLUMN, PROJECT_PRIORITY } from '@/constants';

import { tableFilter, handleExportExcel } from '@/handler';

import { project, customer, team } from '@/services/redux/actions';

const dataSource = (filteredInfo) => {
  const projects = Object.values(useSelector((state) => state.project.byID));
  const companies = useSelector((state) => state.company.byID);
  const teams = useSelector((state) => state.team.byID);

  if (projects?.length === 0) {
    return []; 
  }

  let data = projects.map((p) => ({
    ...p,
    company_name: companies[p.client]?.name || 'N/A',
    assignee_name: teams[p.assignee]?.name || '-',
  }))
  
  return tableFilter(data, filteredInfo)
}

export default function Projects() {

  const { toggleDrawer } = useDrawer();
  const dispatch = useDispatch();

  const [filteredInfo, setFilteredInfo] = useState({ status: 'all', priority: 'all' })

  useEffect(() => {
    dispatch(project.get_projects_request());
    dispatch(customer.get_customers_request());
    dispatch(team.get_teams_request());
  }, [dispatch]);

  const filteredData = dataSource(filteredInfo)
  console.log('filteredData', filteredData)

  return (
    <div>
        <Box sx={{ boxShadow: 'none' }} className='px-6 pb-6'>
                <Grid container justifyContent='space-between' className="mb-4">
                      <div className="py-6">
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

                <Card variant='outlined' orientation="horizontal" style={{ marginTop: 20}} sx={{ backgroundColor: 'white'}}>
                        <Input
                          variant="plain"
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
                          className='w-40 px-4'
                          value={filteredInfo.status}
                          onChange={(event, value) => setFilteredInfo(prev => ({ ...prev, status: value }))}
                      >
                        <Option value="all" key="all">All Status</Option>
                        {Object.values(PROJECT_STATUS).map((s) => (
                          <Option value={s.value} key={s.value}>{s.label}</Option>
                        ))}
                      </Select>
                      <Select
                          indicator={<KeyboardArrowDown />} 
                          variant="plain"
                          className='w-40 px-4'
                          value={filteredInfo.priority}
                          onChange={(event, value) => setFilteredInfo(prev => ({ ...prev, priority: value }))}
                      >
                        <Option value="all" key="all">All Priority</Option>
                        {Object.values(PROJECT_PRIORITY).map((s) => (
                          <Option value={s.value} key={s.value}>{s.label}</Option>
                        ))}
                      </Select>
                </Card>
         </Box>

         <ProjectTable filteredData={filteredData} sort='due_date'/>
         <ProjectCU />
         <ModalUpdateTask />
    </div>
  );
}