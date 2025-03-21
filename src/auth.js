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
