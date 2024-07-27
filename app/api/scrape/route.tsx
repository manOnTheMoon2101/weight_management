// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import scrapeData from '../../../services/data.json';

// const prisma = new PrismaClient();

// export const POST = async () => {
//   try {
//     for (const food of scrapeData) {

//       //old data
//       // await prisma.food.create({
//       //   data: {
//       //     name: food.name,
//       //     calories: food.calories,
//       //     sugar: food.sugar,
//       //     carbs: food.carbs,
  
//       //   },
//       // });


//           // Update existing data
//     // for (const food of scrapeData) {
//     //   await prisma.food.updateMany({
//     //     where: {
//     //       name: food.name,
//     //     },
//     //     data: {
//     //       protein: food.protein, // Update protein field
//     //       iron: food.iron,       // Update iron field
//     //     },
//     //   });
//     // }

//     }

//     await prisma.$disconnect();
//     return NextResponse.json({ message: "Data inserted successfully" });
//   } catch (err) {
//     await prisma.$disconnect();
//     return NextResponse.json({ message: "POST Error", err }, { status: 500 });
//   }
// };