import { signJwtAccessToken } from "@/lib/jwt/jwt";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
	try {
		const { account, password } = await req.json()

		// 로컬 테스트
        // const accessToken = signJwtAccessToken({ account });
        // const result = { id: 1, account, accessToken };

		const result = await axios.post(process.env.BACKEND_URL+'/auth/signin/common', {
			account, password
		})

		return NextResponse.json(result.data, { status: 200 })
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response && error.response.status === 404) {
				console.log(error.response.data)

				return NextResponse.json({ messsage: "user not found" }, { status: 404 })
			}
			if (error.response && error.response.status === 401) {
				console.log(error.response.data)

				return NextResponse.json({ messsage: "wrong password" }, { status: 401 })
			}
			if (error.response && error.response.status === 500) {
				console.log(error.response.data)

				return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
			}
		}

        return NextResponse.json({ message: 'Internal Server Error' } , { status: 500 })
	}
}