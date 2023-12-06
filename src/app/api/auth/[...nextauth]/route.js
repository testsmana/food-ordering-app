import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import {User} from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { UserInfo } from "@/models/UserInfo";
import { authOptions } from "@/libs/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }