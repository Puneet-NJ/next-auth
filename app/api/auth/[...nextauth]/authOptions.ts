import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),

		CredentialsProvider({
			name: "credentials",

			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials) {
				const user = await prisma.user.findFirst({
					where: {
						email: credentials?.email,
						password: credentials?.password,
					},
				});
				if (!user?.email || !user.password) return null;

				if (
					credentials?.email === user.email &&
					credentials?.password === user.password
				) {
					const { id, ...tokenFields } = user;

					console.log({ id: String(id), ...tokenFields });

					return { id: String(id), ...tokenFields };
				}

				return null;
			},
		}),
	],

	secret: process.env.NEXTAUTH_SECRET,

	pages: {
		signIn: "/signin",
	},

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}

			return token;
		},
		async session({ session, token }) {
			if (session && session.user && token) {
				session.user.id = token.id as string;
			}

			return session;
		},
	},
};
