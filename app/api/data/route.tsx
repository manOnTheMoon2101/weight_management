import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  try {
    const body = await request.json();
    const {
      weight,
      updatedAt,
      workedOut,
      tookFatburner,
      tookWeightmanagement,
      tookVitamin,
      totalProtein,
      totalFat,
      totalCarbs,
      workoutTime,
      totalSugar,
      averageWaterinML,
      foodsInt,
      userId,
    } = body;

    const data = await prisma.data.create({
      data: {
        weight: weight,
        updatedAt: updatedAt,
        workedOut: workedOut,
        tookFatburner: tookFatburner,
        tookWeightmanagement: tookWeightmanagement,
        tookVitamin: tookVitamin,
        totalProtein: totalProtein,
        totalFat: totalFat,
        totalCarbs: totalCarbs,
        workoutTime: workoutTime,
        totalSugar: totalSugar,
        averageWaterinML: averageWaterinML,
        foodsInt: foodsInt,
        userId: userId,
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
