import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
export const GET = async (
  req: any,
  { params }: { params: { month: string } }
) => {
  try {
    const { month } = params;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    let session: any;
    session = await getServerSession(authOptions);

    let user: any;
    user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    const data = await prisma.data.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: new Date(`${currentYear}-${month}-01T01:00:00.459+00:00`),
          lte: new Date(`${currentYear}-${month}-31T01:00:00.459+00:00`),
        },
      },
    });

    data.map((x: any) => (x.createdAt = x.createdAt.toDateString()));

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
