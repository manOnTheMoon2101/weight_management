import prisma from "@/prisma/prisma";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "@/app/auth/options";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};
