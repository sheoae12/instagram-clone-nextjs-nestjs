import axios, { AxiosError } from "axios"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
	const { account, password, name, nickname } = await req.json()

	try {
		const response = await axios.post(process.env.BACKEND_URL+'/auth/signup', {
			account, password, name, nickname
		})

		return NextResponse.json(response.data, { status: 200 })
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response && error.response.status === 409) {
				console.log(error.response.data)

				return NextResponse.json({ messsage: "user already exist" }, { status: 404 })
			}
			if (error.response && error.response.status === 500) {
				console.log(error.response.data)

				return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
			}
		}

		console.log(error)
		return NextResponse.json({ message: 'signup error', error }, { status: 500 })
	}
}