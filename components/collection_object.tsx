import React, { ReactNode } from 'react';
import Image from "next/image";
// import Footer from './footer'
type Props = {
  item: any;
};

export default function NFT({ item }: Props) {
  return (
    // width={200} height={200}
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center mt-8 justify-center relative w-72 h-72'>
        {item.image_url_copy ? <Image className='rounded-xl' fill src={item.image_url_copy} alt={item.name} /> : <p>can't fetch image 😥</p>}

      </div>
      {item.name ? <a href={item.aspect_link} className='mt-2 hover:underline hover:scale-105 duration-300 ease-in-out'>{item.name}</a> : <a href={item.aspect_link} className='mt-2 hover:underline hover:scale-105 duration-300 ease-in-out'>No name</a>}

    </div>

  )
}