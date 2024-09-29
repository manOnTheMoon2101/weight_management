import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
export const PATCH = async (
  request: any,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await request.json();
    const session = await getServerSession(authOptions);
    const {
      weight,
      tookFatburner,
      totalCalories,
      tookWeightmanagement,
      tookVitamin,
      workoutTime,
      totalProtein,
      totalFat,
      totalCarbs,
      totalSugar,
    } = body;
    const { id } = params;
    const now = new Date();
    const updateData = await prisma.data.update({
      where: {
        id: id,
      },
      data: {
        weight: weight,
        updatedAt: now,
        tookFatburner: tookFatburner,
        tookWeightmanagement: tookWeightmanagement,
        tookVitamin: tookVitamin,
        workoutTime: workoutTime,
        totalCalories: totalCalories,
        totalProtein: totalProtein,
        totalFat: totalFat,
        totalCarbs: totalCarbs,
        totalSugar: totalSugar,
      },
    });
    if (!updateData) {
      return NextResponse.json(
        {
          message: "Update not Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(updateData);
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
