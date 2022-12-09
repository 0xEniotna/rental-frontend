import Navbar from './topNav'
import Footer from './footer';
import React, { ReactNode } from 'react';
// import Footer from './footer'
type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {

  return (
    <>
      <div className='h-screen'>
        <Navbar />

        <main className="">{children}</main>


      </div>
      <Footer />
    </>
  )
}