
import React, { ReactNode } from 'react';
import { useRental } from '../hooks/rental';
import { useEffect, useState, useMemo, Fragment } from 'react';
import { useStarknetCall, useAccount, useStarknetExecute } from '@starknet-react/core';
import { FaEthereum } from "react-icons/fa";
import { TfiAlarmClock } from "react-icons/tfi"
import { Contract } from 'starknet';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { number, uint256, } from "starknet"

type Props = {
  contract: Contract;
};


const durations = [
  { duration: 1 },
  { duration: 7 },
  { duration: 30 },
]

const toSeconds = 3600 * 24;
export default function ListingModal({ contract }: Props) {
  const [showModal, setShowModal] = React.useState(false);
  const [message, setMessage] = useState(0);
  const [selected, setSelected] = useState(durations[0])
  const calls = useMemo(() => {
    const selectedDuration = selected.duration * toSeconds;
    const tx = {
      contractAddress: contract?.address,
      entrypoint: "listRental",
      calldata: [uint256.bnToUint256(number.toBN((message * 10 ** 18).toString())).low, uint256.bnToUint256(number.toBN((message * 10 ** 18).toString())).high, selectedDuration],
      // calldata: [message, 0, selectedDuration],

    }
    return Array(1).fill(tx)
  }, [contract?.address, message, selected.duration])

  const { execute: list, loading: listingLoading } = useStarknetExecute({ calls });

  const handleChange = (event: any) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <button
        className="btn-secondary"
        type="button"
        onClick={() => setShowModal(true)}
      >
        List
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-slate-600">
                    List NFT
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-slate-600 opacity-1 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    x
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-row items-center mx-auto">
                  <FaEthereum className='text-black mr-4' />
                  <input type="text" placeholder={"Listing Price in ETH "} onChange={handleChange} value={message}
                    className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10" />
                </div>
                <div className='flex flex-row items-center mx-auto mb-5'>
                  <TfiAlarmClock className='text-black mr-4' />
                  <div className=" placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring ">
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="">
                        <Listbox.Button className=" w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">{selected.duration}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto  bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {durations.map((duration, durationIdx) => (
                              <Listbox.Option
                                key={durationIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                  }`
                                }
                                value={duration}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                      {duration.duration}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                  <p className='text-black ml-3'>days</p>
                </div>
                <div className='flex flex-row'>
                  <div className='m-auto'>
                    {listingLoading &&
                      <button className='"bg-green-500 text-white bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex flex-row'
                        disabled>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </button>}
                    {!listingLoading &&
                      <button className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        onClick={() => list()}>
                        List NFT !
                      </button>}
                  </div>
                </div >
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null
      }
    </>
  );
}





