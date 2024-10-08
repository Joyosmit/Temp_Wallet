import { chainIdMap } from "@/lib/urls";
import { TransactionReceipt } from "ethers";
import { JsonRpcProvider } from "ethers";
import { NextResponse } from "next/server";

type ResponseSend = {
  txHash: string;
  txReceipt: TransactionReceipt | null;
}


export async function POST(req: Request) {
  const { signedTx, chainId }: { signedTx: any; chainId: number } = await req.json();

  
  let provider = new JsonRpcProvider(chainIdMap[chainId as keyof typeof chainIdMap]);

  let sendResponse: ResponseSend = {
    txHash: "",
    txReceipt: null
  }
  try {
    // Broadcast the signed transaction to the blockchain
    const txResponse = await provider.broadcastTransaction(signedTx);
    // const txReceipt  = await txResponse.wait();
    sendResponse.txHash = txResponse.hash;
    console.log("This is response: ", txResponse);
    // sendResponse.txReceipt = txReceipt;
    // console.log(txReceipt);
    return NextResponse.json(sendResponse, { status: 200 });
  } catch (error: any) {
    console.error("Transaction error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
