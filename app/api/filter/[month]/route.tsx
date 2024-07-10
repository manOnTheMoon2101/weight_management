import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: any,
  { params }: { params: { month: string } }
) => {
  try {
    const { month } = params;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    
    const data = await prisma.data.findMany({
      where: {
        createdAt: {
          gte: new Date(`${currentYear}-${month}-01T01:00:00.459+00:00`),
          lte: new Date(`${currentYear}-${month}-31T01:00:00.459+00:00`),
        },
      },
    });

    // data.map((x: any) => (x.createdAt = x.createdAt.toDateString()));

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        message: "GET filter month Error",
        err,
      },
      { status: 500 }
    );
  }
};
