
import { Menu, MenuItem } from "@mui/joy";
import Link from "next/link";

import { useDrawer, useModal } from "@/components";

export const menuItems = (row) => {

    const {  status } = row || {}
    const { handleOpen, updateContent } = useModal()
    const { toggleDrawer, updateData } = useDrawer()

    return (
         <Menu size="sm">
            <MenuItem><Link href={`/projects/detail/${row.id}`} passHref>View Detail</Link></MenuItem>
            <MenuItem onClick={() => { toggleDrawer(); updateData({...row, action: 'edit'})}}>Edit project</MenuItem>
            <MenuItem disabled={!row?.tasks || status > 2 } onClick={() => { handleOpen(); updateContent({ ...row })}} >Update task</MenuItem>
            <MenuItem disabled={status !== 1}>Mark as in progress</MenuItem>
            <MenuItem disabled={status > 1}>Mark as paused</MenuItem>
            <MenuItem disabled={status > 1}>Mark as cancelled</MenuItem>
          </Menu>
    )
}