'use client'

import React from 'react'
import styles from './Profile.module.css'

export function FeedProfileImg({ url, hasStory }: { 
    url: string,
    hasStory: boolean
}): React.ReactNode {
    const viewStory = (e: React.MouseEvent) => {}

    return (
        <div className={styles.feed_profile_background} onClick={viewStory}>
            <div className={styles.feed_profile}>
                <img className={styles.feed_profile_img} src={url}/>
            </div>
        </div>
    )
}

export function StoryProfileImg({ url }: {
    url: string
}): React.ReactNode {
    const viewStory = (e: React.MouseEvent) => {}

    return (
        <div className={styles.story_profile_background} onClick={viewStory}>
            <div className={styles.story_profile}>
                <img src={url} className={styles.story_profile_img} />
            </div>
        </div>
    )
}