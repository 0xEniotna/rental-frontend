import React, { ReactNode } from 'react';
import Image from "next/image";
// import Footer from './footer'
type Props = {
  item: any;
};

export default function IMG({ item }: Props) {
  <a href={item.aspect_link} className='mt-2 hover:underline hover:scale-105 duration-300 ease-in-out'>{item.name}</a>
  return (
    <div className='px-1'>
      {item.image_url_copy ? <a href={item.aspect_link} className='mt-2 hover:underline hover:scale-105 duration-300 ease-in-out'>
        <Image className='rounded-xl' width={75} height={75} src={item.image_url_copy} alt={item.name} />
      </a>
        : <div className='w-16 text-center'>😥</div>}
    </div>
  )
}