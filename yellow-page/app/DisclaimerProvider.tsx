'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Fragment,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

type TDisclaimerContext = {
  accepted: boolean;
  setAcceptedDisclaimer: React.Dispatch<React.SetStateAction<boolean>>;
};

function getInitialDisclaimerState(): boolean {
  if (typeof window === 'undefined') return false;

  const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');
  if (!disclaimerAccepted) return false;

  return JSON.parse(disclaimerAccepted);
}

const defualtDisclaimerContext: TDisclaimerContext = {
  accepted: false,
  setAcceptedDisclaimer: () => {},
};

const DisclaimerContext = createContext<TDisclaimerContext>(
  defualtDisclaimerContext
);

export const useDisclaimerContext = () => useContext(DisclaimerContext);

export const DisclaimerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accepted, setAcceptedDisclaimer] = useState<boolean>(
    getInitialDisclaimerState()
  );

  useEffect(() => {
    localStorage.setItem('disclaimerAccepted', JSON.stringify(accepted));
  }, [accepted]);

  return (
    <DisclaimerContext.Provider value={{ accepted, setAcceptedDisclaimer }}>
      {children}
      <DisclaimerModal />
    </DisclaimerContext.Provider>
  );
};

const DisclaimerModal = () => {
  const { accepted, setAcceptedDisclaimer } = useDisclaimerContext();

  return (
    <Transition.Root show={!accepted} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={setAcceptedDisclaimer}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto '>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-scroll rounded-sm bg-white dark:bg-black px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl max-h-[80vh] sm:p-6'>
                <div>
                  <div className='mt-3 sm:mt-5'>
                    <div className='mt-2 flex gap-8 flex-col md:flex-row'>
                      <div>
                        <Dialog.Title
                          as='h3'
                          className='text-base font-semibold leading-6 '
                        >
                          Dislaimer
                        </Dialog.Title>
                        <div className='text-sm'>
                          <p className='mt-2'>
                            By clicking the button below you acknowledge that
                            you have read and agree to the following terms:{' '}
                          </p>

                          <p className='mt-2'>
                            The purpose of this website is to showcase the
                            evolution of web design in Chinese-language
                            websites. The web pages showcased on this website
                            are from the late 1990s and early 2000s. They are
                            included in Chinese-language Internet directory
                            books, and archived by the Internet Archive. They
                            may contain outdated information, designs, and
                            functionalities. The content on these web pages does
                            not reflect the views or opinions of the owners of
                            this website. Visitors are advised to use their own
                            discretion when browsing these websites and should
                            not rely on the information presented as accurate or
                            current. The owners of this website are not
                            responsible for any harm, damage, or loss that may
                            occur from using the content or information provided
                            on these old websites. If you are the owner of one
                            of the archived websites and wish to have your site
                            removed from this website, please contact
                            tktktk@tktktk.com
                          </p>
                        </div>
                      </div>
                      <div>
                        <Dialog.Title
                          as='h3'
                          className='text-base font-semibold leading-6'
                        >
                          免责声明
                        </Dialog.Title>
                        <div className='text-sm'>
                          <p className='mt-2'>
                            点击下面的按钮即表示您已经阅读并同意以下条款：
                          </p>
                          <p className='mt-2'>
                            本网站旨在展示中文网页设计的演变过程。在本网站上展示的网页都是来自1990年代后期和2000年代早期，被收录于公开发行的互联网网址目录书籍中，并被互联网档案馆（Internet
                            Archive）所保存。它们可能包含过时的信息，设计，和功能。本网站所展示的网页上的内容不代表本网站拥有者的观点或意见。用户在访问这些网站时，必须谨慎对待这些网站上的信息，并且不能把这些信息当作是准确的或者最新的。本网站不为因为使用老网页上的信息所导致的任何伤害或者损失承担责任。如果你是在本网站上展示的一个网页的原拥有者，并希望您的网页不在此被展示，请致信
                            tktktk@tktktk.com。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-sm bg-black dark:bg-white px-3 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    onClick={() => setAcceptedDisclaimer(true)}
                  >
                    Accept
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
