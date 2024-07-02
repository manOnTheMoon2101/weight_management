import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await prisma.data.findMany();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        message: "GET food Error",
        err,
      },
      { status: 500 }
    );
  }
};
