
import { useAccount } from '@starknet-react/core'
export default function Home() {
  const { account, address, status } = useAccount()

  return (


    <div className="pt-24 pb-24 " >

      <div className="container  mx-auto px-3" >
        <div className='flex flex-wrap md:flex-row justify-around mt-40' >
          <div className="flex flex-col  w-full md:w-2/5 justify-center items-center text-center md:text-center">
            <h1 className="my-4 text-5xl font-bold leading-tight">
              UNIVERSAL NFT RENTAL PROTOCOL
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Lent your NFT without getting rug and share the earnings !
            </p>
            <button className="btn-primary">
              Rent now
            </button>
          </div>
        </div>
      </div>

    </div >


  )
}
