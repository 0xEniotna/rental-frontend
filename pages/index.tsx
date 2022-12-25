import Head from 'next/head'
import Image from 'next/image'
import TopNav from '../components/topNav'
import { useAccount } from '@starknet-react/core'
export default function Home() {
  const { account, address, status } = useAccount()

  return (


    <div className="pt-24 pb-24 bg-black" >

      <video
        autoPlay
        loop
        muted
        className="fixed w-screen  min-w-full min-h-screen max-h-none max-w-none"
      >
        <source
          src="loop.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>



      <div className="container  mx-auto px-3" >
        <div className='flex flex-wrap md:flex-row justify-around mt-40' >
          <div className="flex flex-col z-40 w-full md:w-4/5 justify-center items-center text-center md:text-center">
            <h1 className="my-4  text-7xl font-extrabold leading-tight font">
              UNIVERSAL NFT RENTAL PROTOCOL
            </h1>
            <p className="leading-normal font-bold text-3xl mb-8">
              Lend your NFT without getting rug and share the earnings !
            </p>
            <button className="btn-primary">
              Rent now
            </button>
          </div>
        </div>
      </div>
      <div className="container  mx-auto px-3" >
        <div className='flex flex-wrap md:flex-row justify-around mt-40 ' >
          <div className="flex flex-col z-40 w-full md:w-2/5 justify-center items-center text-center md:text-center">
            <h1 className="my-4 text-5xl font-bold leading-tight">
              1
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Deploy an escrow account. It is a custom smart-contract account.
            </p>
          </div>
          <div className="flex flex-col z-40  w-full md:w-2/5 justify-center items-center text-center md:text-center">
            <h1 className="my-4 text-5xl font-bold leading-tight">
              IMAGE
            </h1>
          </div>
        </div>
      </div>
      <div className="container  mx-auto px-3" >
        <div className='flex flex-wrap md:flex-row justify-around mt-40' >

          <div className="flex flex-col z-40 w-full md:w-2/5 justify-center items-center text-center md:text-center">
            <h1 className="my-4 text-5xl font-bold leading-tight">
              IMAGE
            </h1>
          </div>
          <div className="flex flex-col z-40 w-full md:w-2/5 justify-center items-center text-center md:text-center">
            <h1 className="my-4 text-5xl font-bold leading-tight">
              2
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Deposit your NFT
            </p>
          </div>
        </div>
      </div>
      <div className="container  mx-auto px-3" >
        <div className='flex flex-wrap md:flex-row justify-around mt-40' >
          <div className="flex flex-col z-40 w-full md:w-2/5 justify-center items-center text-center md:text-center">
            <h1 className="my-4 text-5xl font-bold leading-tight">
              3
            </h1>
            <p className="leading-normal text-2xl mb-8">
              List and rent your NFT !
            </p>
          </div>
          <div className="flex flex-col z-40 w-full md:w-2/5 justify-center items-center text-center md:text-center">
            <h1 className="my-4 text-5xl font-bold leading-tight">
              IMAGE
            </h1>
          </div>
        </div>
      </div>
      <div>
        <a className='z-40' href="https://www.vecteezy.com/video/3538262-loop-of-mesh-glowing-blue-orange-dots-digital-wave">loop of mesh glowing blue orange dots digital  wave Stock Videos by Vecteezy</a>
      </div>
    </div >


  )
}

