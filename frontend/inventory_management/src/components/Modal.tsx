import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EditTable } from './'

export default function Modal({ open, setOpen, TABLE_HEAD, TABLE_ROWS, HEADING, setSelectedTableRow }: { open:any, setOpen: any, TABLE_HEAD: any, TABLE_ROWS: any, HEADING: any, setSelectedTableRow: any }) {

  const addRow = () => {
        let new_el: any = {};
        TABLE_HEAD.forEach((head: string) => {
            if (head != "") new_el[head.toLowerCase().replaceAll(" ", "_")] = "";
        });

          TABLE_ROWS.push(new_el)
          setSelectedTableRow([...TABLE_ROWS]);
      }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 w-full h-full" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-half sm:max-w-half">

                <div className='grid grid-cols-2 relative'>
                <h1 className="text-xl font-bold pl-3 ml-3 pt-3 mt-3">{HEADING}</h1>
                <h1 className="text-xl font-bold pr-6 ml-3 pt-3 mt-3 text-[#5156c0] absolute right-0 hover:cursor-pointer" onClick={addRow}>Add</h1>
                </div>
                <EditTable TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={TABLE_ROWS} HEADING={HEADING} setSelectedTableRow={setSelectedTableRow} setOpen={setOpen} />
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
