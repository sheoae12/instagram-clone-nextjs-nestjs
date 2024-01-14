import { DummyFeedData } from "@/constants/dummyData";
import { signJwtAccessToken } from "@/lib/jwt/jwt";
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	try {
        const result = DummyFeedData;

        return new Response(JSON.stringify(result));
	} catch (error) {
		return new Response(JSON.stringify(null));
	}
}