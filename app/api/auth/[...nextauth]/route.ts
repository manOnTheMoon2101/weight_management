
import NextAuth, { type NextAuthOptions } from "next-auth";
import { authOptions } from "@/app/api/auth/options";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};
