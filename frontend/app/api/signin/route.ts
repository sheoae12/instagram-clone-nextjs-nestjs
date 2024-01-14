import { signJwtAccessToken } from "@/lib/jwt/jwt";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
	try {
		const { account, password } = await req.json()

        const accessToken = signJwtAccessToken({ account });
        const result = { id: 1, account, accessToken };

        return new Response(JSON.stringify(result));
	} catch (error) {
		return new Response(JSON.stringify(null));
	}
}