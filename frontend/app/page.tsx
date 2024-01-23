import Feed from "@/components/feed/feed"
import StoryBar from "@/components/storybar/storybar"
import MainPage from "./login/page";
import { useSession } from "next-auth/react"
import { Key } from "react";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";

async function fetchFeedData() {
  const res = await fetch(process.env.API_URL+'/api/feed');
  return await res.json();
}

type FeedData = {
  id: number;
  username: string;
  createdAt: string;
  image: string;
  desc:  string;
  likes: number;
  totalComments: number;
}

export default async function Home() {
  const session = await getServerSession(options);

  if (!session?.user) {
    redirect('/login')
  } else {
    redirect('/feed')
  }

  return (
    <MainPage />
  )
}

