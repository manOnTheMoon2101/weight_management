import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

// export const GET = async (
//   requests: any,
//   { params }: { params: { id: string } }
// ) => {
//   try {
//     const { id } = params;

//     const data = await prisma.data.findUnique({
//       where: {
//         id: id,
//       },
//     });

//     if (!data) {
//       return NextResponse.json(
//         {
//           message: "Get not Found",
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(data);
//   } catch (err) {
//     return NextResponse.json(
//       {
//         message: "GET Error",
//         err,
//       },
//       { status: 500 }
//     );
//   }
// };

// export const DELETE = async (
//   requests: any,
//   { params }: { params: { id: string } }
// ) => {
//   try {
//     const { id } = params;

//     await prisma.data.delete({
//       where: {
//         id: id,
//       },
//     });

//     return NextResponse.json("Post Deleted");
//   } catch (err) {
//     return NextResponse.json(
//       {
//         message: "DELETE Error",
//         err,
//       },
//       { status: 500 }
//     );
//   }
// };

export const PATCH = async (
  request: any,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const updateData = await prisma.data.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
        isDeleted: true,
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
