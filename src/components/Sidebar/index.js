
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, ListItem, ListItemButton, ListItemDecorator } from '@mui/joy'

import { navItems } from '@/constants';

export const Sidebar = () => {

  const pathname = usePathname();

  return (
    <div className="border-r border-gray-200 h-screen">
        <div className="grid grid-flow-col grid-rows-2 border-b border-gray-200 items-center px-6 py-8">
            {/* <img src='/logo.svg' className="row-span-3 size-12"></img> */}
            <h1 className="font-bold text-[22px]">BusinessHub</h1>
            <span >Project and Client Management</span>
        </div>
        <List sx={{ '--List-gap': '8px', padding: '10px' }}>
            {navItems.map((item) => {
              const Icon = item.icon
              const isDashboardActive = pathname === '/' || pathname === '/dashboard';
              const isActive = item.id === 'dashboard' ? isDashboardActive : pathname.includes(item.id);
                return (
                    <ListItem key={item.id} className='h-12'>
                      <ListItemButton
                          selected={isActive}
                          className={`${isActive ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-400 text-gray-900 w-auto rounded inline-flex items-center transition-all`}
                      >
                        <ListItemDecorator>
                          <Icon />
                        </ListItemDecorator>
                        <Link href={`/${item.id === 'dashboard' ? '' : item.id}`} >
                          {item.label}
                        </Link>
                      </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
    </div>
  );
}