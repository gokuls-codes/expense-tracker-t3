import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello from GET /api/orders" });
}

export async function POST(request: NextRequest) {
  const requestBody: unknown = await request.json();
  console.log(requestBody);
  return NextResponse.json({ message: "Hello from POST /api/orders" });
}
