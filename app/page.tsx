import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
	const session = await getServerSession(authOptions);

	console.log(session);

	return (
		<div>
			<>Server page</>
			<br />
			{JSON.stringify(session?.user)}
		</div>
	);
}
