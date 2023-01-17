import NFT from './collection_object';
import Rental from './collection_rental';
import React, { ReactNode } from 'react';
import { useFactory } from '../hooks/factory';
import { useRental } from '../hooks/rental';
import { useArgentAccount } from '../hooks/argentAccount';
import { BigNumberish } from "starknet/src/utils/number";
import { useStarknetCall, useAccount, useStarknetExecute } from '@starknet-react/core';
import { useEffect, useState, useMemo } from 'react';
import { useStoreState } from "../store";
import { CgScrollV } from 'react-icons/cg';


export default function Collection() {
  const state = useStoreState();
  const [nftOwned, setNftOwned] = useState<any>([]);
  const [factoryAddress, setFactoryAddress] = useState<any>("");
  const [userPubKey, setUserPubKey] = useState<any>("");

  const { contract: factoryContract } = useFactory();
  const { contract: argentWallet } = useArgentAccount(state.account)

  const { data: publicKey, loading: pubKeyLoading } = useStarknetCall({
    contract: argentWallet,
    method: "getSigner",
    args: [state.account || ""],
  });




  const { data: rentalsOfOwnerData, loading: rentalsOfOwnerLoading } = useStarknetCall({
    contract: factoryContract,
    method: state.account ? "rentalsOwned" : undefined,
    args: [state.account || ""],
  });
  const [rentalsOwned, setRentalsOwned] = useState<any>([]);

  const options = { method: 'GET', headers: { accept: 'application/json' } };
  useEffect(() => {
    setRentalsOwned(rentalsOfOwnerData);
    setFactoryAddress(factoryContract?.address);
    setUserPubKey(publicKey?.toString());

    fetch(`https://api-testnet.aspect.co/api/v0/assets?owner_address=${state.account}`, options)
      .then(response => response.json())
      .then(response => {
        setNftOwned(response.assets);
      })
      .catch(err => console.error(err))
  }, [nftOwned, rentalsOfOwnerData, factoryContract, publicKey])

  const loading = rentalsOfOwnerLoading;
  const rentalsOfUser =
    rentalsOfOwnerLoading || !rentalsOwned?.[0]
      ? []
      : rentalsOwned[0].map((p: BigNumberish) => p.toString(16));

  const calls = useMemo(() => {
    const tx = {
      contractAddress: factoryAddress,
      entrypoint: "deployRentalContract",
      calldata: [state.account, userPubKey, process.env.NEXT_PUBLIC_ETH_ERC20_ADDRESS],
    }
    return Array(1).fill(tx)
  }, [state.account, userPubKey, factoryAddress])

  const { execute: deploy, loading: deployLoading } = useStarknetExecute({ calls });

  const { execute: deployAndDeposit, loading: deployDepositLoading } = useStarknetExecute({ calls });
  return (

    <div className="">
      <div className='container z-40 mx-auto'>
        <div className='flex flex-col items-left'>
          <h1 className='text-4xl text-bold ml-28'>
            My Rentals
          </h1>


          {rentalsOfOwnerData ? <div>
            <div className='flex flex-row ml-28 mr-28 mt-4 text-xl text-bold justify-around'>
              <p className=''>Account address</p>
              <p className=''>Deposits</p>
              <p className=''>Status</p>
            </div>
            <div className='flex flex-row items-center '>
              <div className='mt-4 ml-28 mr-8 overflow-auto h-96	grow'>
                {rentalsOfUser?.map((obj: any) => (
                  <Rental item={obj} nfts={nftOwned} />
                ))}
              </div>
              <CgScrollV className='' />
            </div>
            <div className='flex flex-row'>
              <div className='m-auto'>
                {deployLoading && <button className='btn-primary flex flex-row' disabled>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deploying...
                </button>}
                {!deployLoading && <button className='btn-primary' onClick={deploy}>
                  Deploy
                </button>}
              </div>
              <div className='m-auto'>
                {deployDepositLoading && <button className='btn-primary flex flex-row' disabled>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deploying...
                </button>}
                {!deployDepositLoading && <button className='btn-primary' disabled onClick={deployAndDeposit}>
                  Deploy & deposit
                </button>}
              </div>

            </div>
          </div>

            : <p className='mt-10 text-xl text-bold ml-28'>You have 0 rentals deployed 😢</p>}


        </div>

      </div>
      <div className='container z-40 mx-auto mt-16'>
        <div className='flex flex-col items-left'>

          <h1 className='text-4xl text-bold ml-28'>
            My NFTs
          </h1>
          {loading ? <p className='text-xl text-bold ml-28'>NFTs are loading </p> : null}
          {nftOwned ? <div className='mt-8 grid grid-cols-3'>
            {nftOwned.map((obj: any) => (
              <NFT item={obj} />
            ))}
          </div> : <p className='mt-10 text-xl text-bold ml-28'>You own 0 NFT 😢, you can buy some on <a href="https://testnet.aspect.co/">Aspect</a></p>}
        </div>
      </div>
    </div >

  )
}