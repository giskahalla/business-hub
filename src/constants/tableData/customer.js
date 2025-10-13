'use client';

import { Box, Avatar, Typography } from '@mui/material';
import { Chip } from '@mui/joy';

import { CUSTOMER_STATUS } from '@/constants';

import { formatCurrency } from '@/handler';

export const CUSTOMER_COLUMN = [
  { 
    field: 'name', 
    headerName: 'Customer', 
    width: 280, 
    sortable: false,
    renderCell: (rec) => {
      const { row } = rec
      return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center'}}>
          <Avatar src={row.avatar} alt={row.name} />
          <Box ml={2}>
            <Typography variant="subtitle2">{row.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {row.email}
            </Typography>
          </Box>
        </div>
      ) 
    }
  },
  { 
    field: 'company', 
    headerName: 'Company', 
    width: 200,
    sortable: false,
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 130,
    sortable: false,
    renderCell: (rec) => {
      const { row } = rec
      return (
        <Chip variant='soft' sx={{ ...CUSTOMER_STATUS?.[row?.status]?.style }}>
          {CUSTOMER_STATUS?.[row?.status]?.label}
        </Chip>
      )
    }
  },
  { 
    field: 'total', 
    headerName: 'Total Spent', 
    width: 130,
    sortable: false,
    renderCell: (rec) => {
      const { row } = rec
      return (
        <>{formatCurrency(row?.summary?.total_spent)}</>
      )
    }
  },
  { 
    field: 'projects', 
    headerName: 'Projects', 
    width: 130,
    sortable: false,
    renderCell: (rec) => {
      const { row } = rec
      return (
        <>{row?.summary?.total_projects}</>
      )
    }
  },
  { 
    field: 'updatedAt', 
    headerName: 'Last Update', 
    width: 130,
    sortable: true,
  },
];