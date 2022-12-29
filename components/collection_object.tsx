import Navbar from './topNav'
import Footer from './footer';
import React, { ReactNode } from 'react';
import Image from "next/image";
// import Footer from './footer'
type Props = {
  item: any;
};

export default function NFT({ item }: Props) {
  return (
    <div className='flex flex-col items-center mt-8'>
      <Image className='rounded-xl' src={item.contract.image_url} width={200} height={200} alt={item.name} />
      <a href={item.aspect_link} className='mt-2 hover:underline hover:scale-105 duration-300 ease-in-out'>{item.name}</a>
    </div>
  )
}