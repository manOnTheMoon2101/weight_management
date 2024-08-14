import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/options";
export const POST = async (request: any) => {
  try {
    const session = await getServerSession(authOptions);

    const body = await request.json();

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

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    const now = new Date();
    const data = await prisma.data.create({
      data: {
        weight: weight,
        updatedAt: now,
        tookFatburner: tookFatburner,
        tookWeightmanagement: tookWeightmanagement,
        tookVitamin: tookVitamin,
        workoutTime:workoutTime,
        totalCalories:totalCalories,
        totalProtein: totalProtein,
        totalFat: totalFat,
        totalCarbs: totalCarbs,
        totalSugar: totalSugar,
        userId: user!.id,
        userName:String(user!.name)
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        message: "POST Error",
        err,
      },
      { status: 500 }
    );
  }
};
