
import React, { ReactNode } from 'react';
import { useRental } from '../hooks/rental';
import { useEffect, useState, useMemo, Fragment } from 'react';
import { useStarknetCall, useAccount, useStarknetExecute } from '@starknet-react/core';
import { FaEthereum } from "react-icons/fa";
import { TfiAlarmClock } from "react-icons/tfi";
import { Contract } from 'starknet';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { number, uint256, } from "starknet";
import ModalMosaic from './deposit_modal_img';
import { useERC721Contract } from '../hooks/ERC721';

type Props = {
  contract: Contract;
  nfts: [any];
};

export default function DepositModal({ contract, nfts }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<any>();
  const [nft_address, setNftAddress] = useState("");
  const [nft_id, setNftId] = useState(0);


  useEffect(() => {
    if (selected) {
      setNftAddress(selected.contract_address);
      setNftId(selected.token_id);
    }
  }, [nft_address, selected, nft_id])
  // calldata: [nft_id, 0, nft_address],
  // const { contract: nftContract } = useERC721Contract(nft_address);

  const { execute: multicall_approve_deposit, loading: depositLoading, error } = useStarknetExecute({
    calls: [
      {
        contractAddress: nft_address,
        entrypoint: "approve",
        calldata: [contract?.address, uint256.bnToUint256(number.toBN((nft_id))).low, uint256.bnToUint256(number.toBN((nft_id))).high],
      },
      {
        contractAddress: contract?.address,
        entrypoint: "depositNft",
        calldata: [uint256.bnToUint256(number.toBN((nft_id))).low, uint256.bnToUint256(number.toBN((nft_id))).high, nft_address],
      }
    ]
  });

  return (
    <>
      <button
        className="btn-secondary"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Deposit
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
                    Deposit NFT
                  </h3>
                  <button
                    className="p-1 ml-10 items-center bg-transparent border-0 text-slate-400 opacity-1 float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    x
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex flex-col items-center mx-auto py-3">
                  <h2 className="text-slate-400">Select an NFT</h2>
                  {nfts ? <div className='mt-3 grid grid-cols-3'>
                    {nfts.map((obj: any) => (
                      <ModalMosaic key={obj.id} item={obj} set_selected={setSelected} selected={selected} />
                    ))}
                  </div> : <p className='mt-10 text-xl text-bold ml-28'>You own 0 NFT 😢, you can buy some on <a href="https://testnet.aspect.co/">Aspect</a></p>}
                </div>

                <div className='flex flex-row'>
                  <div className='m-auto'>
                    {depositLoading && !error &&
                      <button className='"bg-green-500 text-white bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex flex-row'
                        disabled>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </button>}
                    {!depositLoading &&
                      <button className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        onClick={() => multicall_approve_deposit()}>
                        Deposit NFT !
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





