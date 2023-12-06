import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import {User} from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { UserInfo } from "@/models/UserInfo";

export const authOptions = {
    secret:process.env.SECRET,
    adapter:MongoDBAdapter(clientPromise),
    providers: [
  
            GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),
  
            CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            
            credentials: {
              username: { label: "Email", type: "email", placeholder: "test@mail.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const email=credentials?.email;
              const password=credentials?.password;
  
              mongoose.connect(process.env.MONGO_URL);
              //const user= await User.findOne({email});
              const user = await authOptions.adapter.getUserByEmail(email);
              const passwordOk= user && bcrypt.compareSync(password, user.password);
              
              if(passwordOk){
                return user;
              }
              return null
            }
          })
    ],
  
    session: {
      // Set it as jwt instead of database
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        if (user) {
          token.accessToken = user.access_token;
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        // Send properties to the client, like an access_token and user id from a provider.
        session.accessToken = token.accessToken;
        session.user.id = token.id;
  
        return session;
      },
    },
  
  };