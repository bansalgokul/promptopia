"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {
	signIn,
	signOut,
	useSession,
	getProviders,
	LiteralUnion,
	ClientSafeProvider,
} from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers/index"

const Nav = () => {
	const { data: session } = useSession()

	const [providers, setProviders] = useState<Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null>(null)
	const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)

	useEffect(() => {
		const setProvidersFunction = async () => {
			const response = await getProviders()
			setProviders(response)
		}
		setProvidersFunction()
	}, [])

	// console.log(session?.user)

	return (
		<nav className="w-full flex-between mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.svg"
					alt="PromptSharing Logo"
					width={30}
					height={30}
					className="object-contain"
				/>
				<p className="logo_text">Promptopia</p>
			</Link>
			{/* Desktop Navigation */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Prompt
						</Link>
						<button
							type="button"
							onClick={() => signOut()}
							className="outline_btn"
						>
							Sign Out
						</button>

						<Link href="/profile">
							<Image
								src={session.user.image}
								alt="Profile"
								width={37}
								height={37}
								className="rounded-full"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign in
								</button>
							))}
					</>
				)}
			</div>
			{/* mobile navigation */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div>
						<Image
							src={session.user.image}
							alt="Profile"
							width={37}
							height={37}
							className="rounded-full"
							onClick={() => {
								setToggleDropdown((prevState) => !prevState)
							}}
						/>

						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown-link"
									onClick={() => setToggleDropdown(false)}
								>
									My Profile{" "}
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown-link"
									onClick={() => setToggleDropdown(false)}
								>
									Create Prompt
								</Link>
								<button
									type="button"
									onClick={() => {
										signOut()
										setToggleDropdown(false)
									}}
									className="mt-5 w-full black_btn"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign in
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	)
}

export default Nav
