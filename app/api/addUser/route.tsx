import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/options";
import bcrypt from "bcrypt";
export const POST = async (request: any) => {
  try {
    const session = await getServerSession(authOptions);

    const body = await request.json();

    const { name, email, password } = body;

    const saltRounds = 10;
    // const secret = process.env.SECRET;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const data = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
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
