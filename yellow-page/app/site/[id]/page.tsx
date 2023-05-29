'use client';

import { TSite } from '@/types/TSite';
import { useState, useEffect, Fragment } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import LoadingSpinner from '@/components/LoadingSpinner';

import { convertDateToUTCString, formatDate } from '@/utils';

import TimeStampSelectMenu from './TimeStampSelectMenu';

export default function Site({ params: { id } }: { params: { id: string } }) {
  const [data, setData] = useState<TSite | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedTimeStamp, setSelectedTimeStamp] = useState<Date | null>(null);

  const waybackMachineUrl = () => {
    return `https://web.archive.org/web/${convertDateToUTCString(
      selectedTimeStamp ? selectedTimeStamp : new Date()
    )}/${data?.url}`;
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/site/${id}`)
      .then((res) => res.json())
      .then((data: TSite) => {
        setData(data);
        console.log(data, 'data');
        setLoading(false);
        setSelectedTimeStamp(data.showcase_timestamp);
      });
  }, []);

  useEffect(() => {
    if (!selectedTimeStamp) return;
    console.log(
      `https://web.archive.org/web/${convertDateToUTCString(
        selectedTimeStamp
      )}/${data?.url}`
    );
  }, [selectedTimeStamp]);

  return (
    <>
      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}

      {selectedTimeStamp && data?.url && (
        <>
          {/* Top section */}
          <section className='mt-4 flex sm:justify-between gap-8 w-auto md:w-[768px] lg:w-[1024px]  sm:flex-row flex-col mx-4 sm:mx-0'>
            {/* Timesamp select menu */}
            <div className='w-72'>
              {selectedTimeStamp && data?.available_timestamps && (
                <TimeStampSelectMenu
                  selectedTimeStamp={selectedTimeStamp}
                  setSelectedTimeStamp={setSelectedTimeStamp}
                  availableTimeStamps={data?.available_timestamps}
                />
              )}
            </div>

            {/* External Links */}
            <div className='flex gap-4'>
              {/* Open in Wayback Machine */}
              <div className='flex gap-1'>
                <p className='text-left flex text-sm leading-5 text-zinc-500 dark:text-zinc-300 my-auto'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={waybackMachineUrl()}
                    className='relative truncate hover:underline'
                  >
                    Open in Wayback Machine
                  </a>
                </p>
                <ArrowTopRightOnSquareIcon
                  className='h-4 w-4 flex-none text-gray-400 my-auto'
                  aria-hidden='true'
                />
              </div>

              {/* Open Live */}
              <div className='flex gap-1'>
                <p className='text-left flex text-sm leading-5 text-zinc-500 dark:text-zinc-300 my-auto'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={data?.url}
                    className='relative truncate hover:underline'
                  >
                    Open Live
                  </a>
                </p>
                <ArrowTopRightOnSquareIcon
                  className='h-4 w-4 flex-none text-gray-400 my-auto'
                  aria-hidden='true'
                />
              </div>
            </div>
          </section>

          {/* Website Preview*/}
          <section className='flex flex-col items-center justify-center w-full h-full text-center mt-4'>
            {/* Wayback iFrame */}
            <iframe
              className='w-full md:w-[768px] lg:w-[1024px] h-[70vh] min-h-[436px] border-4 border-black'
              src={waybackMachineUrl()}
            ></iframe>

            {/* Explanation */}
            <div className='flex flex-col items-center justify-center text-center mt-4 text-xs sm:text-sm border-2 border-black p-2'>
              {/* Site */}
              <p>
                You opened {data?.url} archived by the Wayback Machine at:{' '}
                {formatDate(selectedTimeStamp)}.
              </p>
              <p>
                The URL of the actual web page displayed below might be
                different from the one you opened.
              </p>
              <p>
                The Y2K Chinese-language Web Showcase is not responsible for the
                content of the web page.
              </p>
            </div>
          </section>
        </>
      )}
    </>
  );
}
