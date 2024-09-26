"use client";
import { signOut } from "next-auth/react";

export default function () {
	return (
		<div>
			<button
				onClick={async () => {
					const res = await signOut();
				}}
			>
				Sign out
			</button>
		</div>
	);
}
