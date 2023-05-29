'use client';

import { Fragment, useEffect } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { name: 'Home 目录', href: '/', current: false },
  { name: 'About 关于', href: '/about', current: false },
];

export default function Navigation() {
  const pathName = usePathname();
  navigation.forEach((item) => {
    item.current = item.href === pathName;
  });

  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search');

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    setSearch(initialSearch || '');
  }, [initialSearch]);

  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as='header'
        className={({ open }) =>
          clsx(
            open ? 'w-full z-40 overflow-y-auto' : '',
            'sticky top-0 bg-white dark:bg-black shadow-sm lg:overflow-y-visible border-b-2 border-black dark:border-white z-50'
          )
        }
      >
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 '>
              <div className='relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12'>
                {/* Left hand side logo */}
                <div className='flex  md:inset-y-0 md:left-0 lg:static xl:col-span-3'>
                  <div className='flex flex-shrink-0 items-center'>
                    <Link href='/' className='flex gap-2'>
                      {/* Simplified Chinese */}
                      <Image
                        src='/sitelogo-sc.svg'
                        alt='Y2K Logo'
                        className='dark:invert'
                        width={54}
                        height={20}
                        priority
                      />
                      {/* Traditional Chinese */}
                      <Image
                        src='/sitelogo-tc.svg'
                        alt='Y2K Logo'
                        className='hidden sm:block dark:invert'
                        width={54}
                        height={20}
                        priority
                      />
                      <Image
                        src='/sitelogo-en.svg'
                        alt='Y2K Logo'
                        className='dark:invert'
                        width={160}
                        height={20}
                        priority
                      />
                    </Link>
                  </div>
                </div>
                {/* Search bar */}
                <div className='min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6'>
                  <div className='flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0'>
                    <form className='w-full'>
                      <label htmlFor='search' className='sr-only'>
                        Search
                      </label>
                      <div className='relative'>
                        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                          <MagnifyingGlassIcon
                            className='h-5 w-5 text-black  dark:text-white'
                            aria-hidden='true'
                          />
                        </div>
                        <input
                          id='search'
                          name='search'
                          className='block w-full rounded-sm border-0 bg-white dark:bg-zinc-900 py-1.5 pl-10 pr-3 text-gray-900 dark:text-white ring-1 ring-inset ring-black dark:ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                          placeholder='Search'
                          type='search'
                          defaultValue={search}
                        />
                      </div>
                    </form>
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className='flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden'>
                  <Popover.Button className='-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Open menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Popover.Button>
                </div>
                {/* Right hand side buttons */}
                <div className='hidden lg:flex lg:items-center lg:justify-end xl:col-span-3 gap-2'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={clsx(
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'hover:bg-gray-50 ',
                        'block rounded-sm py-2 px-3 text-base font-medium hover:text-gray-900 '
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile menu, show/hide based on menu open state. */}
            <Popover.Panel as='nav' className='lg:hidden' aria-label='Global'>
              <div className='mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4'>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={clsx(
                      item.current
                        ? 'bg-gray-100 text-gray-900'
                        : 'hover:bg-gray-50 ',
                      'block rounded-sm py-2 px-3 text-base font-medium hover:text-gray-900 '
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
}
