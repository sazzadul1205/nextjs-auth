import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Your Email",
          requires: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your Password",
          requires: true,
        },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        if (!credentials) {
          return null;
        }
        if (email) {
          const currentUser = users.find((user) => user.email === email);
          if (currentUser) {
            if (currentUser.password === password) {
              return currentUser;
            }
          }
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

const users = [
  {
    id: 1,
    name: "Sazzadul",
    email: "psazzadul@gmail.com",
    password: "Pritom1205",
  },
  {
    id: 2,
    name: "Pritom",
    email: "Sazzadul14@gmail.com",
    password: "Pritom1205",
  },
  {
    id: 1,
    name: "SPritom",
    email: "psazzadul1205@gmail.com",
    password: "Pritom1205",
  },
];

export { handler as GET, handler as POST };
