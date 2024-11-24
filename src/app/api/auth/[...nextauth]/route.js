import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
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
          if (currentUser && currentUser.password === password) {
            return currentUser;
          }
        }
        return null; // Return null if user is not found or password doesn't match
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Add the user type to the token during login
      if (user) {
        token.type = user.type; // Include type in the JWT token
      }
      return token;
    },

    async session({ session, token }) {
      // Add type from token to the session object
      if (token.type) {
        session.user.type = token.type;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

const users = [
  {
    id: 1,
    name: "Sazzadul",
    email: "psazzadul@gmail.com",
    type: "Admin",
    password: "Pritom1205",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    name: "Pritom",
    email: "Sazzadul14@gmail.com",
    type: "Manager",
    password: "Pritom1205",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    name: "SPritom",
    email: "psazzadul1205@gmail.com",
    type: "User",
    password: "Pritom1205",
    image: "https://picsum.photos/200/300",
  },
];

export { handler as GET, handler as POST };
