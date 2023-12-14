import Nav from "@components/Nav"
import Provider from "@components/Provider"
import "@styles/globals.css"
import { Metadata } from "next"
import { Children } from "react"

export const metadata: Metadata = {
	title: "Promptopia",
	description: "Discover and share prompts",
}

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<Provider session={undefined}>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	)
}
export default layout
