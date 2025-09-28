'use client';

import { Dropdown, MenuButton, Card } from '@mui/joy';
import { Eye } from 'lucide-react';
import { MoreVert } from '@mui/icons-material';
import Link from 'next/link';

import { MainButton, TableList } from '@/components';
import { menuItems } from './action';

import { CUSTOMER_COLUMN, BTN_STYLE } from '@/constants';

const columns = [
  ...CUSTOMER_COLUMN,
  { 
    field: 'action', 
    headerName: 'Action', 
    width: 100,
    sortable: false,
    renderCell: (rec) => {
      const { row } = rec
      return (
          <Dropdown>
            <MenuButton>
              <MoreVert size={16}/>
            </MenuButton>
              {menuItems(row)}
          </Dropdown>
      )
    }
   }, 
];

const CustomerTable = (props) => {

  return (
    <Card variant='outlined' style={{ borderRadius: '10px' }} className='mx-6 px-4'>
      <span className='font-semibold mt-2 ml-3'>Customers ({props?.filteredData?.length})</span>
      <TableList columns={columns} {...props}/>
    </Card>
  );
}

export default CustomerTable;