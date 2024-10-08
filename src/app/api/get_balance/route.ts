import { chainIdMap } from "@/lib/urls";
import { formatEther, JsonRpcProvider } from "ethers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  let x = searchParams.get("chainId");
  const chainId = parseInt(x as string);
  if (!address || !chainId) {
    return NextResponse.json(
      { error: "Missing address or rpcUrl" },
      { status: 400 }
    );
  }

  try {
    const provider = new JsonRpcProvider(
      chainIdMap[chainId as keyof typeof chainIdMap]
    );
    const balance = await provider.getBalance(address);
    console.log({
      balance: formatEther(balance),
      rpcUrl: chainIdMap[chainId as keyof typeof chainIdMap],
    });
    return NextResponse.json(
      { balance: formatEther(balance) },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 400 }
    );
  }
}
