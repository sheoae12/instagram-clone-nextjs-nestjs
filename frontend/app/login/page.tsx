'use client'

import Footer from '../../components/footer/footer';
import styles from './Login.module.css';
import LoginBox from '../../components/login/Loginbox';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter()
    const onLinkClick = (e: React.MouseEvent) => {
        router.push('/signup')
    }

    return (
        <div className={styles.login_root}>
            <div className={styles.login_wrapper}>
                <img className={styles.login_instagram_img} src='/instagram_mobile.png' />
                <div className={styles.box_wrapper}>
                    <LoginBox />
                    <div className={styles.signup_wrapper}>
                        <span>계정이 없으신가요?</span>
                        <span 
                            className={styles.signup_link}
                            onClick={onLinkClick}
                        >
                            가입하기
                        </span>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}