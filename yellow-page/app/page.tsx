'use client';

import { TSite } from '@/types/TSite';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/20/solid';

import LoadingSpinner from '@/components/LoadingSpinner';

import { useDisclaimerContext } from './DisclaimerProvider';

export default function Home() {
  const [data, setData] = useState<TSite[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/sites${search ? `?search=${search}` : ''}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [search]);

  return (
    <>
      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}

      <section className='flex flex-col items-center justify-center w-full h-full text-center'>
        {/* List of Sites */}
        <ul
          role='list'
          className='divide-y divide-black dark:divide-white w-full max-w-4xl sm:w-auto m-auto'
        >
          {data.map((site) => (
            <li
              key={site.url_name}
              className='relative grid grid-cols-6 grid-flow-col justify-between gap-x-16 px-4 py-5 hover:bg-gray-50 dark:hover:bg-zinc-900 sm:px-6 lg:px-8'
            >
              {/* Left Aligned */}
              <div className='col-span-2 gap-x-4 item-start'>
                <div className='min-w-0 flex-auto'>
                  <p className='text-left text-base font-semibold leading-6'>
                    <Link href={`/site/${site.id}`}>
                      <span className='absolute inset-x-0 -top-px bottom-0' />
                      {site.url_name}
                    </Link>
                  </p>
                  <div className='flex mt-1 gap-1'>
                    <p className='text-left flex text-xs leading-5 text-zinc-500 dark:text-zinc-300'>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={site.url}
                        className='relative truncate hover:underline'
                      >
                        {site.url}
                      </a>
                    </p>
                    <ArrowTopRightOnSquareIcon
                      className='h-4 w-4 flex-none text-gray-400 my-auto'
                      aria-hidden='true'
                    />
                  </div>
                </div>
              </div>

              {/* Right Aligned */}
              <div className='col-span-4 items-center gap-x-4'>
                {/* List of Books */}
                <ul className='hidden sm:block text-right'>
                  {site.book_name.map((book, i) => (
                    <li
                      className='inline-block gap-1 text-xs leading-5 border border-zinc-400  rounded-sm px-2 py-0.5 m-0.5'
                      key={i}
                    >
                      <Link
                        href={`/?search="${book}"`}
                        className='relative truncate hover:underline my-auto'
                      >
                        {book}
                      </Link>
                      <MagnifyingGlassIcon
                        className='inline-block h-4 w-4 flex-none pl-0.5'
                        aria-hidden='true'
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {/* No results found */}
        {data.length === 0 && !loading && (
          <div className='flex flex-col items-center justify-center w-full h-full text-center mt-16'>
            <p className='text-2xl font-semibold'>No results found.</p>
            <p className='text-lg font-semibold mt-2'>
              Try searching for something else.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
