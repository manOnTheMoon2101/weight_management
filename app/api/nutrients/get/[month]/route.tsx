import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/options";
import formatPrismaDate from "@/utils/dateFormater";
// bro i swear...
export const GET = async (
  req: any,
  { params }: { params: { month: number } }
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
    const startDate = new Date(`${currentYear}-${month}-01T00:00:00.000Z`);
    const endDate = new Date(
      `${currentYear}-${month}-${new Date(
        currentYear,
        month,
        0
      ).getDate()}T23:59:59.999Z`
    );
    const data = await prisma.data.findMany({
      where: {
        userId: user.id,
        isActive: true,
        isDeleted: false,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      // include: {
      //   user: {
      //     include: {
      //       NutrientsLimit: true,
      //     },
      //   },
      // },
      orderBy: {
        createdAt: "desc",
      },
    });

    data.map((x: any) => (x.createdAt = formatPrismaDate(x.createdAt)));

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
