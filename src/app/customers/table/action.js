
import { Menu, MenuItem } from "@mui/joy";

import { useDrawer } from "@/components";
import Link from "next/link";

export const menuItems = (row) => {

    const { toggleDrawer, updateData } = useDrawer()

    return (
         <Menu>
            <MenuItem><Link href={`/customers/detail/${row.id}`} passHref>View Detail</Link></MenuItem>
            <MenuItem onClick={() => { toggleDrawer(); updateData({...row, action: 'edit'})}}>Edit customer</MenuItem>
            <MenuItem>Update status customer</MenuItem>
            <MenuItem>Delete Customer</MenuItem>
          </Menu>
    )
}