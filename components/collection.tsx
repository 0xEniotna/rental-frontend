import NFT from './collection_object';
import React, { ReactNode } from 'react';
import { useERC721Contract } from '../hooks/ERC721';
import { useStarknetCall, useAccount } from '@starknet-react/core';
import { useEffect, useState } from 'react';

export default function Collection() {
  const [nftOwned, setNftOwned] = useState<any>([]);
  const { address } = useAccount();

  // 0x05cc8257193149a96ce94c2481c620d0040d9d33a9953c14d9fe100f3fce3a4b
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  useEffect(() => {
    // fetch(`https://api-testnet.aspect.co/api/v0/assets?owner_address=${address}`, options)

    fetch(`https://api-testnet.aspect.co/api/v0/assets?owner_address=0x05cc8257193149a96ce94c2481c620d0040d9d33a9953c14d9fe100f3fce3a4b`, options)

      .then(response => response.json())
      .then(response => {
        setNftOwned(response.assets);
        console.log(nftOwned);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="">

      <div className='container z-40 mx-auto'>
        <div className='flex flex-col items-left'>
          <h1 className='text-4xl text-bold ml-28'>
            My Rentals
          </h1>
          <div className='mt-10 grid grid-cols-3 gap-x-16'>
            <p className='text-xl text-bold ml-28'>NFT ID - IMAGE - STATUS</p>

          </div>

        </div>
      </div>
      <div className='container z-40 mx-auto mt-16'>
        <div className='flex flex-col items-left'>
          <h1 className='text-4xl text-bold ml-28'>
            My NFTs
          </h1>
          {nftOwned ? <div className='mt-8 grid grid-cols-3'>
            {nftOwned.map((obj: any) => (
              <NFT item={obj} />
            ))}
          </div> : <p className='text-xl text-bold ml-28'>You own 0 NFT 😢, you can buy some on <a href="https://testnet.aspect.co/">Aspect</a></p>}


        </div>
      </div>
    </div >

  )
}