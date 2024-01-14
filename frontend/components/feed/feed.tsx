import { MenuItems } from "@/constants/menuItems";
import styles from './Feed.module.css';
import Image from "next/image";
import Link from 'next/link';
import React from "react";

type FeedData = ({
    props: {
        username: string,
        createdAt: string,
        image: string,
        desc: string
        likes: number,
        totalComments: number
    }
})

export default function Feed({ props }: FeedData): React.ReactNode {
    const username = props.username
    const createdAt = props.createdAt
    const likes = props.likes
    //const feed_desc = '외롭지만 그래도 혼자있고픈 사람들 모여라~!\n혼자 있는 걸 좋아하는 친구 모두 @태그 하기🙌\n여러분들은 이럴 때에는 무조건 혼자있고싶다! 한 적이 있나요?\n생각나는 에피소드가 있다면 댓글을 통해 공유해주세요💁‍♀️'
    const feed_desc = props.desc
    const totalComments = props.totalComments

    return (
        <div className={styles.feed_box}>
            <div className={styles.feed_top}>
                <div className={styles.feed_profile}>
                    <img className={styles.feed_profile_img} src='/sample-images/story_profile_sample.png'/>
                </div>
                <div className={styles.feed_bold_text}>{username}</div>
                <div className={styles.feed_time}>• {createdAt}</div>
            </div>
            <div className={styles.feed_content}>
                <img className={styles.feed_img} src='/sample-images/sample_img01.jpeg'/>
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
                    <span className={styles.feed_bold_text} style={{marginRight: '10px'}}>{username}</span>
                    {feed_desc}
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