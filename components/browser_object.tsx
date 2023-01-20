
import React, { ReactNode } from 'react';
import Image from "next/image";
import { useRental } from '../hooks/rental';
import { getAddressFromString } from "../utils";
import { useStarknetCall } from '@starknet-react/core';
import { useEffect, useState, useMemo } from 'react';
import { useStoreState } from "../store";
import { BigNumberish } from "starknet/src/utils/number";
import { FaEthereum } from "react-icons/fa";
import { uint256, number } from 'starknet';

type Props = {
  // rental account address
  item: string,
};

export default function Listing({ item }: Props) {
  const state = useStoreState();
  let link: string = state.network == "SN_GOERLI" ? `https://testnet.starkscan.co/contract/${item}` : `https://testnet-2.starkscan.co/contract/${item}`;

  const [listed, setListed] = useState<any>(0);
  const [priceToPay, setPrice] = useState<any>(0);

  const [nftOwned, setNftOwned] = useState<any>([]);

  const { contract: rental } = useRental(item);


  const { data: isListed, loading } = useStarknetCall({
    contract: rental,
    method: "isListed",
    args: [],
  });

  const { data: owner, loading: loadingOwner } = useStarknetCall({
    contract: rental,
    method: "getAdmin",
    args: [],
  });

  const { data: price, loading: loadingPrice } = useStarknetCall({
    contract: rental,
    method: "getPriceToPay",
    args: [],
  });

  const options = useMemo(() => {
    return { method: 'GET', headers: { accept: 'application/json' } }
  }, []);

  useEffect(() => {
    fetch(`https://api-testnet.aspect.co/api/v0/assets?owner_address=${rental?.address}`, options)
      .then(response => response.json())
      .then(response => {
        console.log("nfts > ", response.assets)
        setNftOwned(response.assets);
      })
      .catch(err => console.error(err));

    setListed(isListed?.toString());
    if (price) {
      setPrice(price[0]);
    }
  }, [isListed, nftOwned, price, options, rental]);
  return (
    <>
      {listed == 1 ?
        <div className='flex flex-col items-center mt-8 justify-center'>
          <div className='flex flex-col mt-8 justify-center relative w-72 h-72'>
            {nftOwned[0] && nftOwned[0].image_url_copy ? <Image className='absolute rounded-xl opacity-80' src={nftOwned[0].image_url_copy} fill alt={nftOwned[0].name} /> : <div className='w-16 text-center'>😥</div>}
            {nftOwned[0]?.name ? <a href={nftOwned[0]?.aspect_link} className='ml-5 z-40 bottom-7 left-0 absolute text-2xl text-white font-extrabold hover:underline hover:scale-105 duration-300 ease-in-out'>{nftOwned[0].name}</a> : <a href={nftOwned[0].aspect_link} className='mt-2 hover:underline hover:scale-105 duration-300 ease-in-out'>No name</a>}

            <div className='flex flex-row ml-5 z-40 bottom-0 left-0 absolute text-xl text-white font-extrabold'>
              < FaEthereum />
              {priceToPay != 0 && <p>{` ${priceToPay.low * 10 ** -18}`}</p>}
            </div>
          </div>
        </div >
        : null
      }
    </>
  )
}