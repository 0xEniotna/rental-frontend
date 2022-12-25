import Link from "next/link";


const Footer = () => {
  return (
    <div className=" border-t-2 border-gray-500">
      <div className="flex justify-center items-center">
        <Link className="mx-auto lg:mx-0 hover:underline font-bold rounded-xl my-6 py-4 px-8 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          href="https://github.com/0xKarasu/Rental">GITHUB</Link>
      </div>
    </div>




  );
};

export default Footer;
