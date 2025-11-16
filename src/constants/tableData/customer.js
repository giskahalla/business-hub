'use client';

import { Box, Avatar, Typography } from '@mui/material';
import { Chip } from '@mui/joy';
import dayjs from 'dayjs';
import { Building, Phone } from 'lucide-react';

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
    field: 'company', 
    headerName: 'Company', 
    width: 200,
    sortable: false,
    renderCell: (rec) => { 
      const { row } = rec
      return (
        <div className='flex items-center gap-2' style={{ height: '100%', alignContent: 'center'}}>
            <Building size={16}/>
            <span>{row.company}</span>
        </div>
      )
    }
  },
  { 
    field: 'contact', 
    headerName: 'Contact', 
    width: 200,
    sortable: false,
    renderCell: (rec) => { 
      const { row } = rec
      return (
        <div className='flex items-center gap-2' style={{ height: '100%', alignContent: 'center'}}>
            <Phone size={16}/>
            <span>{row.contact}</span>
        </div>
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
        <>$ {formatCurrency(row?.spent)}</>
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
        <>{row?.projects?.length || '-'}</>
      )
    }
  }, 
  { 
    field: 'updatedAt', 
    headerName: 'Last Update', 
    width: 130,
    sortable: true,
    renderCell: (rec) => {
      const { row } = rec
      return (
        <>{dayjs(row?.updatedAt).format('DD/MM/YYYY')}</>
      )
    }
  },
];