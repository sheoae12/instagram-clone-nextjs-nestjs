import StoryBar from '@/components/storybar/storybar';
import Feed from '@/components/feed/feed';
import React from 'react';
import SideBar from '@/components/sidebar/sidebar';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/option'
import { redirect } from "next/navigation"

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

export default async function Page() {
    const session = await getServerSession(options);

    if (!session?.user) {
        redirect('/login')
    }

    const feeds = await fetchFeedData()

    return (
        <>
            <div className='wrapper'>     
                <SideBar />
                <div className='remain_space'>
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
                </div>
            </div>
        </>
    )
}