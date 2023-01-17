import Image from "next/image";

export default function Home() {
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
            <h1 className="my-4  text-7xl font-extrabold leading-tight font animate-pulse">
              UNIVERSAL NFT RENTAL PROTOCOL
            </h1>
            <p className="leading-normal font-extrabold text-3xl mb-8">
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
            <h1 className="my-4 text-5xl font-extrabold leading-tight">
              1
            </h1>
            <p className="leading-normal text-2xl mb-8 font-extrabold">
              Deploy an escrow account. It is a custom smart-contract account.
            </p>
          </div>
          <div className="flex flex-col z-40  md:w-2/5 ">
            <Image src="/shubham-s-web3-Vtm64FggqeQ-unsplash.png" alt="wallet - shubham-s-web3" width={1200} height={1200} />
          </div>
        </div>
      </div>
      <div className="container  mx-auto px-3" >
        <div className='flex flex-wrap md:flex-row justify-around mt-30' >
          {/* Photo de <a href="https://unsplash.com/@fluffy7j?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Polina Kondrashova</a> sur <a href="https://unsplash.com/fr/photos/fhrWAh2HMnM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}

          <div className="flex flex-col z-40 w-3/5">
            <Image src="/polina-kondrashova-fhrWAh2HMnM-unsplash.png" alt="polina-kondrashova-unsplash" width={1200} height={1200} />
          </div>
          <div className="flex flex-col z-40 w-full md:w-2/5 justify-center items-center text-center md:text-center">
            <h1 className="my-4 text-5xl font-extrabold leading-tight">
              2
            </h1>
            <p className="leading-normal text-2xl mb-8 font-extrabold">
              Deposit your NFT
            </p>
          </div>
        </div>
      </div>
      <div className="container  mx-auto px-3" >
        <div className='flex flex-wrap md:flex-row justify-around mt-30' >
          <div className="flex flex-col z-40 w-full md:w-2/5 justify-center items-center text-center md:text-center">
            <h1 className="my-4 text-5xl font-extrabold leading-tight">
              3
            </h1>
            <p className="leading-normal text-2xl mb-8 font-extrabold">
              List and rent your NFT !
            </p>
          </div>
          <div className="flex flex-col z-40 w-full md:w-2/5 justify-center items-center text-center md:text-center">
            <Image src="/stonks-meme.jpeg" alt="stonks" width="900" height={900} />

          </div>
        </div>
      </div>
      <div>
        <a className='z-40' href="https://www.vecteezy.com/video/3538262-loop-of-mesh-glowing-blue-orange-dots-digital-wave">loop of mesh glowing blue orange dots digital  wave Stock Videos by Vecteezy</a>
      </div>
    </div >


  )
}

