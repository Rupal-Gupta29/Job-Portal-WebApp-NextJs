import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./utils/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const findUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!findUser) {
          console.log("User not found.");
          return null;
        }

        if (!findUser.password) {
          console.log("User does not have a password set.");
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          findUser.password
        );

        if (!isPasswordValid) {
          console.log("Invalid Password.");
          return null;
        }

        return { ...findUser };
      },
    }),
  ],
  callbacks: {
    authorized: ({ request: { nextUrl }, auth }) => {
      const publicRoutes = ["/auth/sign-in", "/auth/sign-up"];
      const protectedRoutes = ["/"];
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      if (publicRoutes.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }
      if (protectedRoutes.includes(pathname) && !isLoggedIn) {
        return Response.redirect(new URL("/auth/sign-in", nextUrl));
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
});
