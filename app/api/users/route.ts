
import { prisma } from "../../../prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  // SELECT * FROM users WHERE email = 'email'
  // SELECT * FROM users
  const users = await prisma.user.findMany(); // 3:00:20

  return NextResponse.json(users);
}