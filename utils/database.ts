import mongoose, { ConnectOptions } from "mongoose"

let isConnected = false

export const connectToDB = async () => {
	mongoose.set("strictQuery", true)

	if (isConnected) {
		console.log("MongoDB connection already established.")
		return
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI || "", {
			dbName: "share_prompt",
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions)

		isConnected = true
		console.log("MongoDB connection established successfully.")
	} catch (error) {
		console.log("Error connecting to MongoDB:", error)
	}
}
