import { withAuth } from "next-auth/middleware";

export default withAuth({
	pages: {
		signIn: "/signin",
	},
});

export const config = {
	matcher: ["/((?!api/userSignup|signup).*)"], // Exclude the /signup page
};
