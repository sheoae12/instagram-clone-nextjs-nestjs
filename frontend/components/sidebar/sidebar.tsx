'use client';

import styles from './Sidebar.module.css';
import Image from "next/image";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { createPortal } from "react-dom";
import UploadModal from "../modal/feed/UploadModal";

export default function SideBar(): React.ReactNode {
    const [feedModal, setFeedModal] = useState(false)
    const [portalElement, setPortalElement] = useState<Element | null>(null);
    
    useEffect(() => {
        setPortalElement(document.getElementById("portal"));
    }, [feedModal]);
    
    const feedModalHandler = () => {
        setFeedModal(!feedModal);
    };

    const closeFeedModal = () => {
        setFeedModal(false);
    };

    return (
        <nav className={styles.sidebar}>
            <img className={styles.sidebar_logo} src='/instagram_font_white.png'/>
            
            <Link href='/' className={styles.sidebar_list}>
                <div className={styles.sidebar_item}>
                    <img className={styles.sidebar_item_img} src='/icons/icon-home-regular.svg' />
                    홈
                </div>
            </Link>
            <Link href='/search' className={styles.sidebar_list}>
                <div className={styles.sidebar_item}>
                    <img className={styles.sidebar_item_img} src='/icons/icon-search-regular.svg' />
                    검색
                </div>
            </Link>
            <Link href='/explore' className={styles.sidebar_list}>
                <div className={styles.sidebar_item}>
                    <img className={styles.sidebar_item_img} src='/icons/icon-explore-regular.svg' />
                    탐색 탭
                </div>
            </Link>
            <Link href='/reels' className={styles.sidebar_list}>
                <div className={styles.sidebar_item}>
                    <img className={styles.sidebar_item_img} src='/icons/icon-reels-regular.svg' />
                    릴스
                </div>
            </Link>
            <Link href='/message' className={styles.sidebar_list}>
                <div className={styles.sidebar_item}>
                    <img className={styles.sidebar_item_img} src='/icons/icon-messenger-regular.svg' />
                    메시지
                </div>
            </Link>
            <Link href='/' className={styles.sidebar_list}>
                <div className={styles.sidebar_item}>
                    <img className={styles.sidebar_item_img} src='/icons/icon-notification-regular.svg' />
                    알림
                </div>
            </Link>
            <Link href='/' className={styles.sidebar_list}>
                <div className={styles.sidebar_item} onClick={feedModalHandler}>
                    <img className={styles.sidebar_item_img} src='/icons/icon-new-post-regular.svg' />
                    만들기
                </div>
            </Link>
            <Link href='/profile' className={styles.sidebar_list}>
                <div className={styles.sidebar_item}>
                    <img className={styles.sidebar_item_img} src='/icons/default_profile.svg' />
                    프로필
                </div>
            </Link>

            <div className={styles.sidebar_logout} onClick={() => signOut()} >
                로그아웃
            </div>

            {feedModal && portalElement ? (
                createPortal(
                    <UploadModal onClose={closeFeedModal} />,
                    portalElement
                )
            ) : null}
        </nav>
    )
}

