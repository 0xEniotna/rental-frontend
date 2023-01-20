
import React, { ReactNode } from 'react';
import Image from "next/image";
import { getAddressFromString } from "../utils";
import { useRental } from '../hooks/rental';
import { useEffect, useState, useMemo } from 'react';
import { useStoreState } from "../store";
import { useStarknetCall, useAccount, useStarknetExecute, useSignTypedData } from '@starknet-react/core';
import { BigNumberish } from "starknet/src/utils/number";
import IMG from './rental_img';
import { FaEthereum } from "react-icons/fa"
import ListingModal from './listing_modal';
import DepositModal from './deposit_modal';

type Props = {
  item: string;
  nfts: [any];
};

export default function Rental({ item, nfts }: Props) {
  const [nftOwned, setNftOwned] = useState<any>([]);
  const state = useStoreState();
  const [listed, setListed] = useState<any>(0);
  const [rented, setRented] = useState<any>(0);
  const [rentalAddress, setRentalAddress] = useState<any>("");
  const [depositedNft, setDepositedNft] = useState<any>([]);

  // let link: string = `https://testnet-2.starkscan.co/contract/${getAddressFromString(item)}`;
  let link: string = state.network == "SN_GOERLI" ? `https://testnet.starkscan.co/contract/${getAddressFromString(item)}` : `https://testnet-2.starkscan.co/contract/${getAddressFromString(item)}`;
  const { contract: rental } = useRental(rentalAddress);

  const { data: deposited, loading: depositedLoading } = useStarknetCall({
    contract: rental,
    method: "getDepositedNft",
    args: [],
  });

  const { data: isListed, loading: listingLoading } = useStarknetCall({
    contract: rental,
    method: "isListed",
    args: [],
  });

  const { data: isRented, loading: isRentedLoading } = useStarknetCall({
    contract: rental,
    method: "isRented",
    args: [],
  });

  useEffect(() => {
    fetch(`https://api-testnet.aspect.co/api/v0/assets?owner_address=${getAddressFromString(item)}`, { method: 'GET', headers: { accept: 'application/json' } })
      .then(response => response.json())
      .then(response => {
        setNftOwned(response.assets);
      })
      .catch(err => console.error(err));
    setRentalAddress(getAddressFromString(item));

    setListed(isListed);
    setRented(isRented);
    setDepositedNft(deposited);

  }, [isListed, isRented, deposited, item,]);
  const { execute: unlist, loading: unlistLoading, error: unlistError } = useStarknetExecute({
    calls: [
      {
        contractAddress: rentalAddress,
        entrypoint: "unlistRental",
        calldata: [],
      }
    ]
  });

  const { execute: withdraw, loading: withdrawLoading, error: withdrawError } = useStarknetExecute({
    calls: [
      {
        contractAddress: rentalAddress,
        entrypoint: "withdrawNft",
        calldata: [deposited?.[1].low.toString(), deposited?.[1].high.toString(), deposited?.[0].toString()],
      }
    ]
  });

  return (
    <div className='flex flex-col border-2 rounded-2xl bg-zinc-900 mb-4'>
      <div className='flex items-center justify-center border-b py-4'>
        <div className='mx-auto'>
          <a href={link}
            target="_blank"
            rel="noreferrer"
            className='hover:underline hover:scale-105 duration-300 ease-in-out'
          >
            {`0x${item} `.slice(0, 12)}...
          </a>
        </div>
        {nftOwned[0] ? <div className='flex flex-row items-center px-24 justify-center  border-x'>
          {nftOwned?.map((obj: any) => (
            <IMG key={obj} item={obj} />
          ))}
        </div>
          : <p className='text-center px-24  border-x'>😢</p>
        }

        <div className='flex mx-auto'>
          {listed == 1 ? <div className='flex flex-row'>
            <p className='relative'> Listed</p>
            <span className=" animate-ping relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
            : (rented == 1 ? <div className='flex flex-row'>
              <p className='relative'> Rented</p>
              <span className=" animate-ping relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </div> : <div className='flex flex-row'>
              <p className='relative'> Unlisted</p>
              <span className=" animate-ping relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </div>)}

        </div>
      </div >
      <div className='flex flex-row mt-2 py-4 items-center justify-center'>
        {rental && <DepositModal contract={rental} nfts={nfts} />}
        <div className='flex flex-row'>
          <div className='m-auto'>
            {withdrawLoading && <button className='btn-secondary flex flex-row' disabled>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Withdrawing...
            </button>}
            {!withdrawLoading && <button className='btn-secondary' onClick={() => withdraw()}>
              Withdraw
            </button>}
          </div>

        </div>
        {rental && <ListingModal contract={rental} />}
        <div className='flex flex-row'>
          <div className='m-auto'>
            {unlistLoading && <button className='btn-secondary flex flex-row' disabled>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Unlisting...
            </button>}
            {!unlistLoading && <button className='btn-secondary' onClick={() => unlist()}>
              Unlist
            </button>}
          </div>

        </div>
      </div>
    </div>

  )
}



