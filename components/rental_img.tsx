import React, { ReactNode } from 'react';
import Image from "next/image";
// import Footer from './footer'
type Props = {
  item: any;
};

export default function IMG({ item }: Props) {
  return (
    <div className='px-1 '>
      {item.image_url_copy ? <a href={item.aspect_link} className='mt-2 hover:underline hover:scale-105 duration-300 ease-in-out'>
        <div className='relative h-16 w-16'>
          {item.name ? <Image className='rounded-xl' fill src={item.image_url_copy} alt={item.name} />
            : <Image className='rounded-xl' fill src={item.image_url_copy} alt={"No Name 😢"} />}
        </div>
      </a>
        : <div className='w-16 text-center'>😥</div>}
    </div>
  )
}