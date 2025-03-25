import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const resp = await db.testStock.findMany();
  return NextResponse.json(resp);
}

export async function POST(request: NextRequest) {
  const requestBody: Record<string, string | number> = await request.json();
  // console.log(typeof requestBody);
  await db.testStock.create({
    data: {
      payload: requestBody,
    },
  });
  console.log(requestBody);
  return NextResponse.json({ message: "Hello from POST /api/orders" });
}
