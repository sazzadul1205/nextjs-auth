import connectDB from "@/lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";

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
          // const currentUser = users.find((user) => user.email === email);
          const db = await connectDB();
          const currentUser = await db.collection("Users").findOne({ email });

          if (currentUser && currentUser.password === password) {
            return currentUser;
          }
        }
        return null; // Return null if user is not found or password doesn't match
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.NEXT_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_FACEBOOK_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.NEXT_GITHUB_ID,
      clientSecret: process.env.NEXT_GITHUB_SECRET,
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

export { handler as GET, handler as POST };
