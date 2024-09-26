import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
	return NextResponse.json({ msg: "hi" });
}

export async function POST(req: NextRequest) {
	try {
		console.log("entry");

		const body = await req.json();

		console.log(body);

		const response = await prisma.user.create({
			data: {
				name: body.name as string,
				email: body.email as string,
				password: body.password as string,
			},
		});

		if (response.id)
			return NextResponse.json({ msg: "User created" }, { status: 200 });

		return NextResponse.json({ msg: "Couldn't create user" }, { status: 411 });
	} catch (err) {
		return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
	}
}
