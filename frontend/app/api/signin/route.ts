import { signJwtAccessToken } from "@/lib/jwt/jwt";
import axios from "axios";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
	try {
		const { account, password } = await req.json()

		const result = await axios.post(process.env.BACKEND_URL+'/auth/signin/common', {
			account, password
		})

        return new Response(JSON.stringify(result.data));
	} catch (error) {
		return new Response(JSON.stringify(null));
	}
}