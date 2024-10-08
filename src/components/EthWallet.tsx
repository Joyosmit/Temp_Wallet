import useMnemonicStore from "@/lib/mnemonicStore";
import { mnemonicToSeed } from "bip39";
import { formatEther, HDNodeWallet, parseEther, Wallet } from "ethers";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { WebSocketProvider } from "ethers";
import { ComboboxDemo } from "./ComboBox";
import SendTx from "./SendTx";
import { ChooseNetwork } from "./ChooseNetwork";

const EthWallet = () => {
  const {
    mnemonic,
    addressArr,
    setAddressArr,
    currentAddress,
    setCurrentAddress,
    currentChainId,
  } = useMnemonicStore();

  const [addressIndex, setAddressIndex] = useState<number>(0);

  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(
          `/api/get_balance?address=${currentAddress}&chainId=${currentChainId.chainId}`
        );
        const data = await response.json();
        if (data.balance) {
          setBalance(data.balance);
          addressArr[
            addressArr.findIndex((x) => x.address === currentAddress)
          ].balance = data.balance;
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    // Initial fetch
    if (currentAddress && currentChainId) {
      fetchBalance();
    }

    // Polling every 3 seconds
    const intervalId = setInterval(() => {
      if (currentAddress && currentChainId) {
        fetchBalance();
      }
    }, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentAddress, currentChainId]);
  const makeETHWallet = async () => {
    if (!mnemonic) {
      return;
    }
    // truth
    // still
    // network
    // rigid
    // unit
    // dad
    // pave
    // spice
    // dove
    // little
    // walk
    // faculty
    // const testmnemonic = "truth still network rigid unit dad pave spice dove little walk faculty"
    const seed = await mnemonicToSeed(mnemonic);

    const wallet_hdpath = `m/44'/60'/${addressIndex}'/0`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    console.log("This is hdNode", hdNode);
    const child = hdNode.derivePath(wallet_hdpath);
    console.log("This is child", child);
    // console.log(hdNodeDerivedPath);
    const walletPrivateKey: string = child.privateKey;

    const wallet = new Wallet(walletPrivateKey);
    setAddressArr([
      ...addressArr,
      { address: wallet.address, balance: BigInt(0), pvtKey: walletPrivateKey },
    ]);
    setCurrentAddress(wallet.address);
    setAddressIndex(addressIndex + 1);
  };
  return (
    <div className="w-[50%] bg-red-700 flex flex-col items-center">
      <ChooseNetwork />
      <div className="w-2/3 mx-auto flex justify-around">
        <Button onClick={makeETHWallet}>+ Add ETH wallet</Button>
        {addressArr && <ComboboxDemo />}
      </div>

      <div>
        <h3 className="text-white">Balance of {currentAddress}:</h3>
        <p className="text-white">
          {balance !== null ? `${balance} ETH` : "Loading..."}
        </p>
      </div>
      <SendTx />
    </div>
  );
};

export default EthWallet;
