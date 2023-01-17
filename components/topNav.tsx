import Link from "next/link";

// import LogoImage from "../public/logo.svg";
import { useStoreState } from "../store";
import { capitalizeFirstLetter } from "../utils";
import ConnectToStarknet from "./connectToStarknet";

type Props = {
  white?: boolean;
  logo?: boolean;
};

const TopNav = () => {
  const state = useStoreState();
  return (
    <nav className="absolute w-screen flex items-center justify-between px-4 font-bold bg-black z-40 py-5">
      <div className="flex items-center">
        <Link href="/">
          {/* <img
            src="/images/logo-blanc.png"
            alt="App - Home"
            className="h-10 cursor-pointer ml-12"
          /> */}
          <p className="h-10 cursor-pointer ml-12">App - Home</p>
        </Link>
      </div>
      <div className=' hidden lg:inline-flex lg:w-auto'>

        <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex lg:h-auto'>
          <Link href='/browse' className='lg:inline-flex lg:w-auto w-full px-3 rounded text-white font-bold items-center justify-center hover:text-white'>
            Browse
          </Link >
          <Link href='/collection' className='lg:inline-flex lg:w-auto w-full px-3 rounded text-white font-bold items-center justify-center hover:text-white'>
            My Rentals
          </Link>
          <Link href='/' className='lg:inline-flex lg:w-auto w-full px-3 rounded text-white font-bold items-center justify-center  hover:text-white'>
            Docs
          </Link>
        </div >
      </div>
      <div className=' hidden lg:inline-flex lg:w-auto'>
        <div
          className="z-40 ml-auto mr-0"
        >
          <ConnectToStarknet connectButton="Connect wallet" />
          {state.message && (
            <div className="">
              {capitalizeFirstLetter(state.message)}
            </div>
          )}
        </div>
      </div >
    </nav >




  );
};

export default TopNav;
