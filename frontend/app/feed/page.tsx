import StoryBar from '@/components/storybar/storybar';
import Feed from '@/components/feed/feed';
import React from 'react';
import SideBar from '@/components/sidebar/sidebar';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/option'
import { redirect } from "next/navigation"
import { UserSessionInfo } from '@/common/types/user.type';

async function fetchFeedData(uid?: string) {
    const res = await fetch(process.env.API_URL+`/api/feed?uid=${uid}`);
    return await res.json();
}

type FeedData = {
    id: number;
    profileimg: string;
    nickname: string;
    createdat: string;
    url: string;
    caption:  string;
    likes: number;
    totalComments: number;
}

export default async function Page() {
    const session = await getServerSession(options)
    const user = session?.user as UserSessionInfo

    if (!session?.user) {
        redirect('/login')
    }

    const feeds = await fetchFeedData(user.uid)

    return (
        <>
            <div className='wrapper'>     
                <SideBar props={session.user as UserSessionInfo}/>
                <div className='remain_space'>
                    <div className="feed_layout">
                        <StoryBar/>
                        <div className="feed_container">
                            {feeds?.length > 0 && feeds.map((data: FeedData) => {
                                return (
                                    <Feed key={data.id} props={data}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div id="portal"></div>
        </>
    )
}