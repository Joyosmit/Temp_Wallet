import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import useMnemonicStore from "@/lib/mnemonicStore";
import { parseEther } from "ethers";
import { Wallet } from "ethers";
import { JsonRpcProvider } from "ethers";

const SendTx = () => {
  const [receiver, setReceiver] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { currentAddress, addressArr, currentChainId } = useMnemonicStore();

  const sendEth = async () => {
    console.log(`${currentAddress} ${receiver} ${amount}`);
    try {
      if (!currentAddress || !receiver || !amount) {
        return;
      }
      if (
        +amount >
        addressArr[addressArr.findIndex((x) => x.address === currentAddress)]
          .balance
      ) {
        console.log("first", addressArr[addressArr.findIndex((x) => x.address === currentAddress)]
        .balance)
        return;
      }
      
      let provider = new JsonRpcProvider(currentChainId.rpcUrl);
      
      const wallet = new Wallet(
        addressArr[
          addressArr.findIndex((x) => x.address === currentAddress)
        ].pvtKey,
        provider
      );
      
      console.log(currentChainId)
      let txDetails = {
        to: receiver,
        value: parseEther(amount),
        gasLimit: 25000,
        gasPrice: 2000000000,
        chainId: currentChainId.chainId, 
        nonce: await provider.getTransactionCount(currentAddress, 'pending'),
      };
      console.log("Pending: ",await provider.getTransactionCount(currentAddress, 'pending'))
      if(currentChainId.chainId === 1337){
        // txDetails.gasPrice = 671118348;
        txDetails = {
          ...txDetails,
          // @ts-ignore
          gasPrice: 671118348,
        }
      }
      console.log("Infnfnfnf: ", txDetails)
      const signedTx = await wallet.signTransaction(txDetails);
      await fetch("/api/send_tx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signedTx, chainId: currentChainId.chainId }),
      });
      console.log("This is signed TX: ", signedTx);
      // console.log("This is tx", tx);
    } catch (error) {
      console.log("This is error");
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>Send Transaction</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-y-5 items-center h-full justify-center ">
          <div className="w-full h-[200%] bg-transparent flex flex-col text-xl">
            <h2>Send to:</h2>
            <Input
              // onFocus={""}
              // className=""
              value={receiver}
              placeholder='Enter public address starting with "0x"'
              onChange={(e) => setReceiver(e.target.value)}
            ></Input>
          </div>
          <div className="w-full h-[200%] bg-transparent flex flex-col text-xl">
            <h2>Amount to send(in ETH):</h2>
            <Input
              // onFocus={""}
              // className=""
              value={amount}
              placeholder="Enter how much ETH to send"
              onChange={(e) => setAmount(e.target.value)}
            ></Input>
          </div>
          <Button className=" self-end" onClick={sendEth}>
            Send
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SendTx;
