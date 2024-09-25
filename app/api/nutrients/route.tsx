import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth/options";
export const GET = async () => {
  try {
    let session: any;
    session = await getServerSession(authOptions);

    let user: any;
    user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    const data = await prisma.nutrientsLimit.findMany({
      where: {
        userId: user.id,
        isActive: true,
        isDeleted: false,
      },
    });

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
export const PATCH = async (
  request: any,
) => {
  try {
    const body = await request.json();
    const {
      minCalories,
      maxCalories,
      minProtein,
      maxProtein,
      minFat,
      maxFat,
      minCarbs,
      maxCarbs,
      minSugar,
      maxSugar,
    } = body;
    let session: any;
    session = await getServerSession(authOptions);

    let user: any;
    user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    const updateNutrients = await prisma.nutrientsLimit.updateMany({
      where: {
        userId: user.id,
      },
      data: {
        minCalories: minCalories,
        maxCalories: maxCalories,
        minProtein: minProtein,
        maxProtein: maxProtein,
        minFat: minFat,
        maxFat: maxFat,
        minCarbs: minCarbs,
        maxCarbs: maxCarbs,
        minSugar: minSugar,
        maxSugar: maxSugar,
      },
    });
    if (!updateNutrients) {
      return NextResponse.json(
        {
          message: "Update not Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(updateNutrients);
  } catch (err) {
    return NextResponse.json(
      {
        message: "PATCH Error",
        err,
      },
      { status: 500 }
    );
  }
};
