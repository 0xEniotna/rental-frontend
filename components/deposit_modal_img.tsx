import React, { ReactNode, useMemo, useCallback } from 'react';
import Image from "next/image";
// import Footer from './footer'
type Props = {
  item: any,
  set_selected: React.Dispatch<any>,
  selected: any,
};

export default function ModalMosaic({ item, set_selected, selected }: Props) {

  const clickHandler = useCallback(() => {
    if (selected) {
      set_selected(undefined);
    }
    else {
      set_selected(item)
    }
  }, [selected, item, set_selected]);

  return (
    <div className='px-1 '>
      {item.image_url_copy ?
        <div className='relative h-16 w-16' onClick={clickHandler}>
          {selected && (selected.aspect_link == item.aspect_link) ? <Image className='rounded-xl opacity-50 border-green-400 border-2' fill src={item.image_url_copy} alt={item.name} /> :
            <Image className='rounded-xl hover:opacity-75' fill src={item.image_url_copy} alt={item.name} />
          }
        </div>
        : <div className='w-16 text-center'>😥</div>}
    </div>
  )
}