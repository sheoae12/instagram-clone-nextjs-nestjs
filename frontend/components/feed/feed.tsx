import styles from './Feed.module.css';
import Image from "next/image";
import Link from 'next/link';
import React from "react";
import { FeedProfileImg } from "../profile/ProfileImg";
import { getTimeAgo } from "@/common/util/date";

type FeedData = ({
    props: {
        profileimg: string,
        nickname: string,
        createdat: string,
        url: string,
        caption: string
        likes: number,
        totalComments: number
    }
})

export default function Feed({ props }: FeedData): React.ReactNode {
    const profileImg = props.profileimg ?? '/icons/default_profile.svg'
    const nickname = props.nickname
    const createdAt = props.createdat
    const likes = props.likes
    const url = props.url
    const caption = props.caption
    const totalComments = props.totalComments

    return (
        <div className={styles.feed_box}>
            <div className={styles.feed_top}>
                <FeedProfileImg url={profileImg} hasStory={true}/>
                <div className={styles.feed_bold_text}>{nickname}</div>
                <div className={styles.feed_time}>• {getTimeAgo(new Date(createdAt))}</div>
            </div>
            <div className={styles.feed_content}>
                <img className={styles.feed_img} src={url}/>
            </div>
            <div className={styles.feed_util}>
                <div className={styles.feed_left_buttons}>
                    <div className={styles.feed_icon_box}>
                        <img 
                            className={styles.feed_util_icon} 
                            style={{marginRight: '10px'}}
                            src='/icons/icon-notification-regular.svg'
                        />
                    </div>
                    <div className={styles.feed_icon_box}>
                        <img 
                            className={styles.feed_util_icon}
                            style={{marginRight: '10px'}} 
                            src='/icons/icon-reply-regular.svg'
                        />
                    </div>
                    <div className={styles.feed_icon_box}>
                        <img 
                            className={styles.feed_util_icon} 
                            style={{marginRight: '10px'}} 
                            src='/icons/icon-messenger-regular.svg'
                        />
                    </div>
                </div>
                <div className={styles.feed_icon_box}>
                    <img className={styles.feed_util_icon} src='/icons/icon-bookmark-regular.svg'/>
                </div>
            </div>
            <div className={styles.feed_bold_text}>좋아요 {likes}개</div>
            <div className={styles.feed_description}>
                <span>
                    <span className={styles.feed_bold_text} style={{marginRight: '10px'}}>{nickname}</span>
                    {caption}
                </span>
            </div>
            <div className={styles.feed_comment}>
                댓글 {totalComments}개 모두 보기
            </div>
            <input className={styles.feed_comment_input} placeholder='댓글 달기 ...'>

            </input>
        </div>
    )
}