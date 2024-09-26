"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function () {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const session = useSession();
	const router = useRouter();

	if (session.data?.user) router.push("/");

	return (
		<div>
			<input
				placeholder="email"
				type="text"
				onChange={(e) => setEmail(e.target.value)}
			/>

			<input
				placeholder="password"
				type="password"
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button
				onClick={async () => {
					const res = await signIn("credentials", {
						email,
						password,
						callbackUrl: window.location.origin + "/",
						// redirect: false,
					});
				}}
			>
				sign in
			</button>

			<br />

			<div>
				Not signed up? <Link href="/signup">Sign up</Link>
			</div>
		</div>
	);
}
