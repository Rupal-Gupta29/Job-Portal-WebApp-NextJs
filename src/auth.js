import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        let user;

        user = {
          id: 1,
          name: "Demo",
        };

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ request: { nextUrl }, auth }) => {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      if (
        (pathname.startsWith("/auth/sign-in") ||
          pathname.startsWith("/auth/sign-up")) &&
        isLoggedIn
      ) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return !!auth;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
});
