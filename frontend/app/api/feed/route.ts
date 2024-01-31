import { DummyFeedData } from "@/constants/dummyData";
import { signJwtAccessToken } from "@/lib/jwt/jwt";
import axios from "axios";
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
  		const uid = searchParams.get('uid')
		console.log('searchparam uid', uid)

        //const result = DummyFeedData;
		//return new Response(JSON.stringify(result));
		//const { uid } = await req.json()

		const result = await axios.get(process.env.BACKEND_URL+`/feed?uid=${uid}`)

        return new Response(JSON.stringify(result.data))
	} catch (error) {
		console.error('GET /api/feed', error)
		return new Response(JSON.stringify(null))
	}
}

export async function POST(req: Request) {
	try {
		const formData = await req.formData()

		const result = await axios.post(process.env.BACKEND_URL+'/feed', formData)

        return new Response(JSON.stringify(result.data))

	} catch (error) {
		console.error('POST /api/feed', error)
		return new Response(JSON.stringify(null))
	}
}