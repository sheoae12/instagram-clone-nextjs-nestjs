import Feed from "@/components/feed/feed"
import StoryBar from "@/components/storybar/storybar"
import { useSession } from "next-auth/react"
import { Key } from "react";

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
  const feeds = await fetchFeedData();
  
  return (
    <div className="feed_layout">
      <StoryBar />
      <div className="feed_container">
        {feeds.map((data: FeedData) => {
          return (
            <Feed key={data.id} props={data}/>
          )
        })}
      </div>
    </div>
  )
}

