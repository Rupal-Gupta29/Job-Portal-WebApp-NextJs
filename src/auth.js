import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "Enter your email",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "Enter yur password",
        },
      },
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
});
