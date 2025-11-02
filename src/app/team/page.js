'use client';

import { Box, Grid, Stack }from '@mui/material';
import { Input, Select, Option, Card } from '@mui/joy';
import { Building2, RefreshCw, Plus, Download } from 'lucide-react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { MainButton, useDrawer, ModalStatus } from '@/components';
import TeamTable from './table';
import MemberCU from './cu';

import { MEMBER_STATUS, BTN_STYLE, TEAM_COLUMN } from '@/constants';

import { calculateSummary, tableFilter, handleExportExcel } from '@/handler';

import { team } from '@/services/redux/actions';

const dataSource = (members, filteredInfo) => {

  if (members?.length === 0) {
    return []; 
  }

  let data = members
  
  return tableFilter(data, filteredInfo)
}

export default function Teams() {

  const { toggleDrawer } = useDrawer();
  const dispatch = useDispatch();

  const members = Object.values(useSelector((state) => state.team.byID));

  const [filteredInfo, setFilteredInfo] = useState({ status: 'all'})

  useEffect(() => {
    dispatch(team.get_teams_request());
  }, [dispatch]);

  const cards = [ 
    {
      id: 1,
      title: 'Active Members',
      total: calculateSummary(members).active_customers,
      description: 'currently available',
      icon: (<RefreshCw className="size-5" />),
    },
    {
      id: 2,
      title: 'Departments',
      total: calculateSummary(members).total_departments,
      description: 'Different departments',
      icon:( <Building2 className="size-5" />)
    },
  ];

  const filteredData = dataSource(members, filteredInfo)

  return (
    <div>
        <Box sx={{ boxShadow: 'none' }} className='px-6 pb-6'>

                <Grid container justifyContent='space-between' className="mb-4">
                    <div className="py-6">
                        <h2 className="text-[20px] font-bold">Teams</h2>
                        <p className="text-gray-500">Manage team members and their project assignments</p>
                    </div>
                      <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                        <MainButton 
                          variant="outlined" 
                          title={'Export'} 
                          startIcon={<Download/>} 
                          style={{...BTN_STYLE.outlined, height: 42 }}
                          onClick={() => handleExportExcel(filteredData, TEAM_COLUMN, 'members')}
                        />
                        <MainButton title={'Add member'} startIcon={<Plus/>} onClick={toggleDrawer}/>
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
                          placeholder='Search member, role, department and email...'
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
                        {Object.values(MEMBER_STATUS).map((s) => (
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