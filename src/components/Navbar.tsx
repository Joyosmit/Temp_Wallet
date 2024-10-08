import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-screen h-[10%] font-mono flex items-center justify-between text-3xl absolute top-0 bg-red-800 font-bold text-blue-500 italic">
      <h1 className="w-[30%]">Temp Wallet</h1>
      <div className=" w-[50%] flex justify-end pr-5 gap-x-6">
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact Us</Link>
      </div>
    </div>
  );
};

export default Navbar;
