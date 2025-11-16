'use client';

import { Box, Typography, Stack } from '@mui/material';
import { Chip } from '@mui/joy';
import dayjs from 'dayjs';
import { Building2, Users, Mail, Phone } from 'lucide-react';

import { COMPANY_STATUS } from '@/constants';

export const COMPANY_COLUMN = [
  { 
    field: 'name', 
    headerName: 'Company Name', 
    width: 220, 
    sortable: false,
    renderCell: (rec) => {
      const { row } = rec
      return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center'}}>
        <Building2 size={16}/>
          <Box ml={2}>
            <Typography variant="subtitle2">{row.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {row.address}
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
        <Chip variant='soft' sx={{ ...COMPANY_STATUS?.[row?.status]?.style }}>
          {COMPANY_STATUS?.[row?.status]?.label}
        </Chip>
      )
    }
  },
  { 
    field: 'industry', 
    headerName: 'Industry', 
    width: 180,
    sortable: false,
  },
  { 
    field: 'employees', 
    headerName: 'Employees', 
    width: 120,
    sortable: false,
    renderCell: (rec) => { 
      const { row } = rec
      return (
        <div className='flex items-center gap-2'>
            <Users size={16}/>
            {row.employees?.length || '-'}
        </div>
      )
    }
  },
  { 
    field: 'joinedAt', 
    headerName: 'Established', 
    width: 130,
    renderCell: (rec) => {
      const { row } = rec
      return (
        <>{dayjs(row?.joinedAt).format('DD/MM/YYYY')}</>
      )
    },
    sortable: true,
  },
  { 
    field: 'contact', 
    headerName: 'Contact', 
    width: 200,
    sortable: false,
    renderCell: (rec) => { 
      const { row } = rec
      return (
        <div style={{ height: '100%', alignContent: 'center' }}>
            <Typography variant="body2">
                {row.contact.name || '-'}
            </Typography>
            <Typography variant="body2" color='text.secondary' className='flex items-center gap-2'>
                <Mail size={14}/>
                {row.contact.email || '-'}
            </Typography>
            <Typography variant="body2" color='text.secondary' className='flex items-center gap-2'>
                <Phone size={14}/>
                {row.contact.phone || '-'}
            </Typography>
        </div>
      )
    }
  },
];