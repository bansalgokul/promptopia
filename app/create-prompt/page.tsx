"use client"

import { FormEvent, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "@components/Form"
import { Post } from "@types"

const CreatePrompt = () => {
	const [submitting, setSubmitting] = useState(false)
	const [post, setPost] = useState<Post>({
		prompt: "",
		tag: "",
	})
	const { data: session } = useSession()
	const router = useRouter()

	const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setSubmitting(true)

		try {
			const response = await fetch("/api/prompt/new", {
				method: "POST",
				body: JSON.stringify({
					...post,
					userId: session?.user.id,
				}),
			})

			if (response.ok) {
				router.push("/")
			}
		} catch (err) {
			console.log(err)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Form
			type="Create"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	)
}
export default CreatePrompt
