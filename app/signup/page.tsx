"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function () {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div>
			<input
				placeholder="name"
				type="text"
				onChange={(e) => setName(e.target.value)}
			/>

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
					const response = await axios({
						method: "POST",
						url: "http://localhost:3000/api/userSignup",

						data: {
							name,
							email,
							password,
						},
					});

					alert(JSON.stringify(response));
					if (response.status === 200) {
						const res = await signIn("credentials", {
							email,
							password,
							callbackUrl: window.location.origin + "/",
						});
					}
				}}
			>
				sign in
			</button>
		</div>
	);
}
