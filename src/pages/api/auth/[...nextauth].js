import NextAuth from "next-auth";
import User from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDB from "@/config/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Please enter all the fields");
          }
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            console.log("Invalid Credentials at 21");
            throw new Error("Invalid Credentials");
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            console.log("Invalid Credentials at 29");
            throw new Error("Invalid Credentials");
          }
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  database: process.env.MONGO_URI,
  pages: {
    signIn: "/login",
  },
};
export default connectDB(NextAuth(authOptions));