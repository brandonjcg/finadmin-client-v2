// 'use client';

import { inter } from '@/fonts';
// import { useUIStore } from '@/store';
import Link from 'next/link';
import { IoSearchOutline } from 'react-icons/io5';

export const TopMenu = () => {
  // const openSidebarMenu = useUIStore((state) => state.openSidebarMenu);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${inter.className} antiliased font-bold`}>
            FinAdmin
          </span>
        </Link>
      </div>

      <div>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/dashboard"
        >
          Dashboard
        </Link>
      </div>

      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/transaction"
        >
          Transactions
        </Link>
      </div>
      <div>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/total"
        >
          Totals
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <button
          // onClick={openSidebarMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
