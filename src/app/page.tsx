"use client"

import EthWallet from "@/components/EthWallet";
import MnemonicView from "@/components/MnemonicView";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className=" bg-red-400 w-screen h-screen flex flex-col justify-around items-center">
      <Navbar />
      <div className="w-screen bg-red-300 h-4/5 flex justify-around items-center">
        <MnemonicView />
        <EthWallet />
      </div>
    </div>
  );
}
