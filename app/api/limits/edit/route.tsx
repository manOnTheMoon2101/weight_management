import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/options";
export const PATCH = async (request: any) => {
  try {
    const body = await request.json();
    const { calories, protein, sugar, carbs, fat } = body;
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
        calories: calories,
        protein: protein,
        sugar: sugar,
        carbs: carbs,
        fat: fat,
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
