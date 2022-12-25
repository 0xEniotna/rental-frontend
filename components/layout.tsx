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

      <Navbar />
      {/* <main className="h-screen">{children}</main> */}
      <main>{children}</main>

      <Footer />
    </>
  )
}