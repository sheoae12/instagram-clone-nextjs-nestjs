import { DummyStoryData } from '@/constants/dummyData';
import styles from './Storybar.module.css';
import Image from "next/image";
import Link from 'next/link';
import React from 'react';

export default function StoryBar(): React.ReactNode {
    return (
        <div className={styles.storybar}>
            {DummyStoryData.map((data) => {
                return (
                    <div key={data.id} className={styles.storybar_profile}>
                        <div className={styles.storybar_profile_box_background}>
                            <div className={styles.storybar_profile_box}>
                                <img src={data.profileImg} className={styles.storybar_profile_img} />
                            </div>
                        </div>
                        <div style={{marginTop: '5px'}}>{data.username}</div>
                    </div>
                )
            })}
        </div>
    )
}