'use client';

import { Card,  Dropdown, MenuButton } from '@mui/joy';
import { MoreVert } from '@mui/icons-material';

import { TableList } from '@/components';
import { menuItems } from './action';

import { PROJECT_COLUMN } from '@/constants';

const columns = [
  ...PROJECT_COLUMN,
  { 
    field: 'action', 
    headerName: 'Action', 
    width: 100,
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

const ProjectTable = (props) => {

  return (
    <Card variant='outlined' style={{ borderRadius: '10px' }} className='mx-6 px-4'>

      <span className='font-semibold mt-2 ml-3'>Projects({props?.filteredData?.length})</span>

      <TableList {...props} columns={columns} />

    </Card>
  );
}

export default ProjectTable;