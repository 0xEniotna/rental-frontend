import Listing from './browser_object';
import React, { ReactNode } from 'react';
import { useFactory } from '../hooks/factory';

import { hash } from "starknet";
import { RpcProvider } from "starknet";
import { useStarknetCall, useAccount, useStarknet, useBlock, useTransaction } from '@starknet-react/core';

import { useEffect, useState, useMemo } from 'react';
import { useStoreState } from "../store";
import { starknetEndpoint, useStarknetNetwork } from '../utils';

export default function Browse() {
  const state = useStoreState();
  const [allRentals, setAllRentals] = useState<any>();
  const account = useAccount();
  const [endpoint, setEndpoint] = useState<any>("");


  const { contract: factoryContract } = useFactory();
  const starknetRpcProvider = useMemo(() => {
    return new RpcProvider({
      nodeUrl:
        endpoint,
    });
  }, [endpoint])

  useEffect(() => {
    setEndpoint(starknetEndpoint(state.network));

    starknetRpcProvider.getEvents({
      from_block: { block_number: 615659 },
      address: factoryContract ? factoryContract.address : "",
      keys: [hash.getSelectorFromName("rental_contract_deployed")],
      chunk_size: 100
    })
      .then(response => {
        setAllRentals(response.events);
      })
      .catch(err => console.error(err));
  }, [allRentals, endpoint, starknetRpcProvider, factoryContract, state.network]);
  console.log(allRentals)
  return (
    <div className="">
      <div className='container z-40 mx-auto'>
        <div className='flex flex-col'>
          <h1 className='text-5xl text-extrabold'>
            Explore rentals
          </h1>

          {allRentals ? <div className='mt-8 grid grid-cols-4 divide-x divide-neutral-600'>
            {allRentals.map((obj: any) => (
              <Listing key={obj.data[0]} item={obj.data[0]} />
            ))}
          </div> : <p className='text-xl text-bold mt-28 text-center'>There is no NFT for rent right now 😭</p>}
        </div>
      </div>
    </div>
  )
}