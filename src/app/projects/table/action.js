
import { Menu, MenuItem } from "@mui/joy";
import Link from "next/link";

import { useDrawer } from "@/components";

export const menuItems = (row) => {

    const { toggleDrawer, updateData } = useDrawer()

    return (
         <Menu>
            <MenuItem><Link href={`/projects/detail/${row.id}`} passHref>View Detail</Link></MenuItem>
            <MenuItem onClick={() => { toggleDrawer(); updateData({...row, action: 'edit'})}}>Edit customer</MenuItem>
            <MenuItem>Update status customer</MenuItem>
            <MenuItem>Delete Customer</MenuItem>
          </Menu>
    )
}