// /app/api/hello/route.ts
import { NextResponse } from 'next/server';
// import {tran} from "ethers";
export async function GET() {
  return NextResponse.json({ message: 'Hello from the backend!' });
}

