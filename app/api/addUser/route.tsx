import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/options";
export const POST = async (request: any) => {
  try {
    const session = await getServerSession(authOptions);

    const body = await request.json();

    const { name, email, password } = body;

    const data = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
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
