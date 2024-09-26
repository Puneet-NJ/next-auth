"use client";

import { useSession } from "next-auth/react";

export default function () {
	const session = useSession();

	return (
		<div>
			<>Client page</>
			<br />
			{JSON.stringify(session.data?.user)}
		</div>
	);
}
