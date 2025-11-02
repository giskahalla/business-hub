'use client';

import { Avatar, Typography, Stack, Box }from '@mui/material';
import { Chip, LinearProgress } from '@mui/joy';
import dayjs from 'dayjs';

import { PROJECT_STATUS, PROJECT_PRIORITY } from '@/constants';

import { formatCurrency } from '@/handler';

export const PROJECT_COLUMN = [
  { 
    field: 'name', 
    headerName: 'Project', 
    sortable: false,
    width: 200, 
    renderCell: (rec) => {
      const { row } = rec
      return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center'}}>
          <Stack>
            <Typography variant="subtitle2">{row.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {row.company_name}
            </Typography>
          </Stack>
        </div>
      )
    }
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 130,
    sortable: false,
    renderCell: (rec) => {
      const { row } = rec
        return (
          <Chip variant='soft' sx={{ ...PROJECT_STATUS?.[row?.status]?.style }}>
            {PROJECT_STATUS?.[row?.status]?.label}
          </Chip>
        )
      }
  },
  { 
    field: 'priority', 
    headerName: 'Priority', 
    width: 130,
    sortable: false,
    renderCell: (rec) => {
      const { row } = rec
      return (
        <Chip variant='soft' sx={{ ...PROJECT_PRIORITY?.[row?.priority]?.style }}>
            {PROJECT_PRIORITY?.[row?.priority]?.label}
          </Chip>
      )
    }
  },
  { 
    field: 'progress', 
    headerName: 'Progress', 
    width: 200,
    sortable: false,
    renderCell: (rec) => {
      const { row } = rec
      const done = row?.tasks?.filter(task => task.status)?.length || 0
      const total = row?.tasks?.length || 0
      const progress = total > 0 ? (done / total) * 100 : 0
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', marginTop: '2em' }}>
          <LinearProgress determinate value={progress} color="neutral" sx={{ width: '100%' }} />
          <Typography variant="body2" color="text.secondary" style={{ width: 40 }}>
            {Math.round(progress)}%
          </Typography>
        </Box>
      )
    }
  },
  { 
    field: 'budget', 
    headerName: 'Budget', 
    width: 130,
    sortable: false,
    renderCell: (rec) => {
      const { row } = rec
      return (
        <>{formatCurrency(row?.budget?.total)}</>
      )
    }
  },
  { 
    field: 'due_date', 
    headerName: 'Due Date', 
    width: 130,
    sortable: true, 
    renderCell: (rec) => {
      const { row } = rec
      return (
        <>{row?.due_date ? dayjs(row.due_date).format('DD/MM/YYYY') : '-'}</>
      )
    }
  },
  { 
    field: 'assignee_name', 
    headerName: 'Assignee', 
    sortable: false,
    width: 200, 
    renderCell: (rec) => {
      const { row } = rec
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {row.assignee_name !== '-' ?
            <>
              <Avatar src={row.avatar} alt={row.assignee_name} />
              <Typography variant="subtitle2">{row.assignee_name}</Typography>
              <br/>
            </>
            : "-"
          }
        </div> 
      )
    }
 },
];