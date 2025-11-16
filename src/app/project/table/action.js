
import { Menu, MenuItem } from "@mui/joy";
import Link from "next/link";

import { STATUS_UPDATE_PROJECT_CONTENT } from "@/constants";

import { useDrawer, useModal } from "@/components";

export const menuItems = (row) => {

    const {  status } = row || {}
    const { handleOpen, updateContent } = useModal()
    const { toggleDrawer, updateData } = useDrawer()

    return (
         <Menu size="sm">
            <MenuItem><Link href={`/project/detail/${row.id}`} passHref>View Detail</Link></MenuItem>
            <MenuItem onClick={() => { toggleDrawer(); updateData({...row, action: 'edit'})}}>Edit project</MenuItem>
            <MenuItem disabled={!row?.tasks || status > 2 } onClick={() => { handleOpen(); updateContent({ ...row })}}>Update task</MenuItem>
            <MenuItem disabled={![1,2].includes(status)} onClick={() => { handleOpen(); updateContent(STATUS_UPDATE_PROJECT_CONTENT(row, 'paused')) }}>Mark as paused</MenuItem>
            <MenuItem disabled={[0,4].includes(status)} onClick={() => { handleOpen(); updateContent(STATUS_UPDATE_PROJECT_CONTENT(row, 'cancelled')) }}>Mark as cancelled</MenuItem>
          </Menu>
    )
}