import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { convertDateToUTCString, formatDate } from '@/utils';
import { Fragment } from 'react';
import clsx from 'clsx';

export default function TimeStampSelectMenu({
  selectedTimeStamp,
  setSelectedTimeStamp,
  availableTimeStamps,
}: {
  selectedTimeStamp: Date;
  setSelectedTimeStamp: React.Dispatch<React.SetStateAction<Date | null>>;
  availableTimeStamps: Date[];
}) {
  return (
    <Listbox value={selectedTimeStamp} onChange={setSelectedTimeStamp}>
      {({ open }) => (
        <>
          <div className='flex flex-row gap-2'>
            <Listbox.Label className='block text-sm font-medium leading-6 my-auto whitespace-nowrap'>
              Timestamp 时间戳
            </Listbox.Label>
            <div className='relative my-auto w-full'>
              <Listbox.Button className='relative w-full cursor-default rounded-sm bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                <span className='block truncate'>
                  {formatDate(selectedTimeStamp)}
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ChevronUpDownIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {availableTimeStamps.map((timeStamp) => (
                    <Listbox.Option
                      key={convertDateToUTCString(timeStamp)}
                      className={({ active }) =>
                        clsx(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={timeStamp}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={clsx(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate'
                            )}
                          >
                            {formatDate(timeStamp)}
                          </span>

                          {selected ? (
                            <span
                              className={clsx(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        </>
      )}
    </Listbox>
  );
}
