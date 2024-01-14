'use client';

import { MenuItems } from "@/constants/menuItems";
import styles from './Sidebar.module.css';
import Image from "next/image";
import Link from 'next/link';
import React from "react";
import { signOut } from "next-auth/react";

export default function SideBar(): React.ReactNode {

    return (
        <nav className={styles.sidebar}>
            <img className={styles.sidebar_logo} src='/instagram_font_white.png'/>
            {MenuItems.map((item, idx) => {
                return (
                    <Link key={idx} href={item.link} className={styles.sidebar_list}>
                        <div className={styles.sidebar_item}>
                            <img className={styles.sidebar_item_img} src={item.icon}/>
                            {item.name}
                        </div>
                    </Link>
                )
            })}
            <div className={styles.sidebar_logout} onClick={() => signOut()} >
                로그아웃
            </div>
        </nav>
    )
}