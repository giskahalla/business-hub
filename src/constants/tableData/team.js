'use client';

import { Box, Avatar, Typography } from '@mui/material';
import { Chip } from '@mui/joy';
import dayjs from 'dayjs';

import { MEMBER_STATUS } from '@/constants';


export const TEAM_COLUMN = [
  { 
    field: 'name', 
    headerName: 'User Name', 
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
        <Chip variant='soft' sx={{ ...MEMBER_STATUS?.[row?.status]?.style }}>
          {MEMBER_STATUS?.[row?.status]?.label}
        </Chip>
      )
    }
  },
  { 
    field: 'role', 
    headerName: 'Role', 
    width: 200,
    sortable: false,
  },
  { 
    field: 'department', 
    headerName: 'Department', 
    width: 200,
    sortable: false,
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
    field: 'joinedAt', 
    headerName: 'Join Date', 
    width: 130,
    renderCell: (rec) => {
      const { row } = rec
      return (
        <>{dayjs(row?.joinedAt).format('DD/MM/YYYY')}</>
      )
    },
    sortable: true,
  },
];