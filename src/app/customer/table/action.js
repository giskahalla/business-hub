
import { Menu, MenuItem } from "@mui/joy";
import Link from "next/link";

import { STATUS_UPDATE_CUSTOMER_CONTENT } from "@/constants";

import { useDrawer, useModal } from "@/components";


export const menuItems = (row) => {
 
    const { status } = row || {}
    const { handleOpen, updateContent } = useModal()
    const { toggleDrawer, updateData } = useDrawer()

    return (
         <Menu size="sm">
            <MenuItem><Link href={`/customer/detail/${row.id}`} passHref>View detail</Link></MenuItem>
            <MenuItem onClick={() => { toggleDrawer(); updateData({...row, action: 'edit'})}}>Edit customer</MenuItem>
            <MenuItem disabled={status === 1} onClick={() => { handleOpen(); updateContent(STATUS_UPDATE_CUSTOMER_CONTENT(row, 'active')) }}>Mark as active</MenuItem>
            <MenuItem disabled={status === 2} onClick={() => { handleOpen(); updateContent(STATUS_UPDATE_CUSTOMER_CONTENT(row, 'inactive')) }}>Mark as inactive</MenuItem>
          </Menu>
    )
}