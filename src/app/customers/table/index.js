'use client';

import { Paper, Table, TableContainer, TableBody, TableHead, TableRow, TableCell, Box, Avatar, Typography, Card }from '@mui/material';
import { Eye } from 'lucide-react';
import Link from 'next/link';

import { TagLabel, MainButton } from '@/components';

import { CUSTOMER_STATUS, BTN_STYLE } from '@/constants';

import { formatCurrency } from '@/handler';

const columns = [
  { field: 'name', headerName: 'Customer', width: 130, 
    renderer: (row) => (
     <Box display="flex" alignItems="center">
      <Avatar src={row.avatar} alt={row.name} />
      <Box ml={2}>
        <Typography variant="subtitle2">{row.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {row.email}
        </Typography>
      </Box>
    </Box>
    )
},
  { field: 'company', headerName: 'Company', width: 130 },
  { field: 'status', headerName: 'Status', width: 130,
    renderer: (row) => (
     <TagLabel label={CUSTOMER_STATUS[row.status].label} className={CUSTOMER_STATUS[row.status].className} />
    )
  },
  { field: 'total', headerName: 'Total Spent', width: 130,
    renderer: (row) => (
     <>{formatCurrency(row?.summary?.total_spent)}</>
    )
   },
  { field: 'projects', headerName: 'Projects', width: 130,
    renderer: (row) => (
     <>{row?.summary?.total_projects}</>
    )
   },
  { field: 'updatedAt', headerName: 'Last Update', width: 130 },
  { field: 'id', headerName: 'Action', width: 100,
    renderer: (row) => (
      <Link
          href={`/customers/detail/${row.id}`}
          passHref
        >
          <MainButton title={'View'} startIcon={<Eye size={16}/>} style={{ ...BTN_STYLE.outlined }} variant='outlined'/>

      </Link>
    )
   }, 
];

// const paginationModel = { page: 0, pageSize: 5 };

const CustomerTable = ({ customers }) => {

  return (
    <Card variant='outlined' style={{ borderRadius: '10px' }} sx={{ boxShadow: 'none' }} className='mx-6'>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 330 }} className='my-5'>
        <Table sx={{ minWidth: 650 }} stickyHeader>
        <TableHead>
            <TableRow>
            {columns.map((column) => (
                <TableCell
                key={column.field}
                style={{ minWidth: column.minWidth }}
                >
                {column.headerName}
                </TableCell>
            ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {customers
            // .slice(page * customersPerPage, page * customersPerPage + customersPerPage)
            .map((row) => {
                return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((col) => {
                    return (
                        <TableCell key={col.field}>
                        {col.renderer ? col.renderer(row) : row[col.field]}
                        </TableCell>
                    );
                    })}
                </TableRow>
                );
            })}
        </TableBody>
        </Table>
    </TableContainer>
    </Paper>
    </Card>
  );
}

export default CustomerTable;