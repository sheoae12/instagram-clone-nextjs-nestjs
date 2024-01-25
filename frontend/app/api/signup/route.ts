import axios from "axios"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
	const { account, password, name, nickname } = await req.json()

	try {
		const response = await axios.post(process.env.BACKEND_URL+'/auth/signup', {
			account, password, name, nickname
		})

		return NextResponse.json(response.data, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'signup error', error }, { status: 500 })
	}
}