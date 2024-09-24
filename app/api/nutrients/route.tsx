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

// export const PATCH = async (
//   request: any,
//   { params }: { params: { id: string } }
// ) => {
//   try {
//     const { id } = params;
//     const now = new Date();
//     const updateData = await prisma.nutrientsLimit.update({
//       where: {
//         userId: id,
//       },
//       data: {
//         isActive: false,
//         isDeleted: true,
//         updatedAt: now,
//       },
//     });
//     if (!updateData) {
//       return NextResponse.json(
//         {
//           message: "Update not Found",
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(updateData);
//   } catch (err) {
//     return NextResponse.json(
//       {
//         message: "PATCH Error",
//         err,
//       },
//       { status: 500 }
//     );
//   }
// };
