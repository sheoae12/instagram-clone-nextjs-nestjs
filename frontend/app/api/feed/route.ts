import { DummyFeedData } from "@/constants/dummyData";
import { signJwtAccessToken } from "@/lib/jwt/jwt";
import axios, { AxiosError } from "axios";
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

		return NextResponse.json(result.data, { status: 200 })
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			if (error.response.status === 500) {
				console.log(error.response.data)

				return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
			}
			if (error.response.status === 404) {
				console.log(error.response.data)

				return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
			}
		}
	}
}

export async function POST(req: Request) {
	try {
		const formData = await req.formData()

		const result = await axios.post(process.env.BACKEND_URL+'/feed', formData)

		return NextResponse.json({ message: 'success' }, { status: 201 })
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			if (error.response.status === 500) {
				console.log(error.response.data)

				return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
			}
			if (error.response.status === 404) {
				console.log(error.response.data)

				return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
			}
		}
	}
}