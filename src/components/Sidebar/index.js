
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from '@/constants';

export const Sidebar = () => {

  const pathname = usePathname();

  return (
    <div className="border-r border-gray-200 h-screen w-70">
        <div className="grid grid-flow-col grid-rows-2 border-b border-gray-200 items-center px-6 py-8">
            {/* <img src='/logo.svg' className="row-span-3 size-12"></img> */}
            <h1 className="font-bold text-[22px]">BusinessHub</h1>
            <span >Project and Client Management</span>
        </div>
        <nav className="flex-1 p-5">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isDashboardActive = pathname === '/' || pathname === '/dashboard';
              const isActive = item.id === 'dashboard' ? isDashboardActive : pathname.includes(item.id);
              return (
                <Link
                  key={item.id}
                  className={`${isActive ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-400 text-gray-900 p-2 w-60 rounded inline-flex items-center transition-all`}
                  href={`/${item.id === 'dashboard' ? '' : item.id}`} 
                >
                  <Icon className="w-4 h-4 m-2" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
    </div>
  );
}