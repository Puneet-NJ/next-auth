import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
	interface User {
		password: string;
	}

	interface Session {
		user: {
			id: string;
		} & DefaultSession["user"];
	}
}
