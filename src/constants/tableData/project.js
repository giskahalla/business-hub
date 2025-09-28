'use client';

import { Avatar, Typography, Stack }from '@mui/material';
import { Chip } from '@mui/joy';

import { PROJECT_STATUS, PROJECT_PRIORITY } from '@/constants';

import { formatCurrency } from '@/handler';

export const PROJECT_COLUMN = [
  { 
    field: 'name', 
    headerName: 'Project', 
    sortable: false,
    width: 180, 
    renderCell: (rec) => {
      const { row } = rec
      return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center'}}>
          <Stack>
            <Typography variant="subtitle2">{row.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {row.client}
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
      return (
        <>{row?.summary?.total_projects}</>
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
  },
  { 
    field: 'assignee', 
    headerName: 'Assignee', 
    sortable: false,
    width: 180, 
    renderCell: (rec) => {
      const { row } = rec
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Avatar src={row.avatar} alt={row.assignee_name} />
          <Typography variant="subtitle2">{row.assignee_name}</Typography>
          <br/>
        </div> 
      )
    }
 },
];