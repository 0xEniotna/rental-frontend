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
    <nav className="absolute w-screen flex items-center justify-between px-4 font-bold border-b-2 border-gray-500">
      <div className="flex items-center">
        <Link href="/">
          <img
            src="/images/logo-blanc.png"
            alt="App - Home"
            className="h-10 cursor-pointer ml-12"
          />
        </Link>
      </div>
      <div className='hidden w-full lg:inline-flex lg:flex-grow lg:w-auto'>
        <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex lg:h-auto'>
          <Link href='/' className='lg:inline-flex lg:w-auto w-full px-3 rounded text-white font-bold items-center justify-center hover:bg-brandbg3 hover:text-white'>
            Marketplace
          </Link >
          <Link href='/' className='lg:inline-flex lg:w-auto w-full px-3 rounded text-white font-bold items-center justify-center hover:bg-brandbg3 hover:text-white'>
            My Rentals
          </Link>
          <Link href='/' className='lg:inline-flex lg:w-auto w-full px-3 rounded text-white font-bold items-center justify-center hover:bg-brandbg3 hover:text-white'>
            My Collection
          </Link>
          <Link href='/' className='lg:inline-flex lg:w-auto w-full px-3 rounded text-white font-bold items-center justify-center hover:bg-brandbg3 hover:text-white'>
            Docs
          </Link>
        </div >
        <button
          className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-xl my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          style={{ marginLeft: "auto", marginRight: 0 }}
        >
          <ConnectToStarknet connectButton="Connect wallet" />
          {state.message && (
            <div className="">
              😵👆
              <br />
              Wrong network!
              <br />
              {capitalizeFirstLetter(state.message)}
            </div>
          )}
        </button>
      </div >
    </nav >




  );
};

export default TopNav;
