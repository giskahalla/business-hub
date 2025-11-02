'use client';

import { Dropdown, MenuButton, Card } from '@mui/joy';
import { MoreVert } from '@mui/icons-material';

import { TableList } from '@/components';
import { menuItems } from './action';

import { TEAM_COLUMN } from '@/constants';

const columns = [
  ...TEAM_COLUMN,
  { 
    field: 'action', 
    headerName: 'Action', 
    width: 70,
    sortable: false,
    renderCell: (rec) => {
      const { row } = rec
      return (
          <Dropdown>
            <MenuButton size="sm">
              <MoreVert size={16}/>
            </MenuButton>
              {menuItems(row)}
          </Dropdown>
      )
    }
   }, 
];

const TeamTable = (props) => {

  return (
    <Card variant='outlined' style={{ borderRadius: '10px' }} className='mx-6 px-4' sx={{ backgroundColor: 'white'}}>
      <span className='font-semibold mt-2 ml-3'>Users ({props?.filteredData?.length})</span>
      <TableList columns={columns} {...props}/>
    </Card>
  );
}

export default TeamTable;