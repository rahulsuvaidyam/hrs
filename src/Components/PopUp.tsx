import { useContext, type FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { DataContext } from '../Context/DataProvider';
import {IoClose} from 'react-icons/io5'
import CreateCategories from '../Dashboard/Categories/CreateCategories';
import { useLocation } from 'react-router-dom';
import CreateProducts from '../Dashboard/Products/CreateProducts';

interface PopUpProps {
  title:string
}

const PopUp: FC<PopUpProps> = ({title}) => {
    const {openPopUP,setOpenPopUP} = useContext(DataContext)
    const {pathname} = useLocation()
    return (
        <>
         <Transition.Root show={openPopUP} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpenPopUP}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpenPopUP(false)}
                      >
                        <span className="absolute -inset-2.5" />
                      <IoClose/>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-4 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-4 flex-1">
                      {pathname === "/dashboard/category" && <CreateCategories/> }
                      {pathname === "/dashboard/product" && <CreateProducts/>}
                    
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
        </>
    );
}

export default PopUp;