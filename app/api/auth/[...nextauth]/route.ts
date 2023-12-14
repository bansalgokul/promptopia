import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import { connectToDB } from "@utils/database"
import User from "@models/users"

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({
				email: session?.user?.email,
			})

			// console.log(sessionUser)
			session.user.id = sessionUser._id.toString()
			return session
		},
		async signIn({ account, profile, user, credentials }) {
			try {
				await connectToDB()
				// check if a user exists
				const userExists = await User.findOne({
					email: profile?.email,
					username: profile?.name?.replace(" ", "").toLowerCase(),
					image: profile?.picture,
				})
				// console.log("profile", profile)
				// if not, create one
				if (!userExists) {
					const newUser = await User.create({
						email: profile?.email,
						username: profile?.name?.replace(" ", "").toLowerCase(),
						image: profile?.picture,
					})
				}
				return true
			} catch (error) {
				console.log(error)
				return false
			}
		},
	},
})

export { handler as GET, handler as POST }
