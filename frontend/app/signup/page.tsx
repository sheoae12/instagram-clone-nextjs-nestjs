'use client'

import { FormEvent, useState } from 'react'
import Footer from '../../components/footer/footer'
import styles from './Signup.module.css'
import { useRouter } from 'next/navigation'

export default function Signup(): React.ReactNode {
    const [account, setAccount] = useState('')
    const [name, setName] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const onLinkClick = (e: React.MouseEvent) => {
        router.push('/login')
    }

    const submit = async (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className={styles.root}>
            <div className={styles.signup_container}>
                <div className={styles.signup_wrapper}>
                    <img className={styles.box_logo_font} src='/instagram_font_white.png'/>
                    
                    <div className={styles.signup_intro}>친구들의 사진과 동영상을 보려면 가입하세요.</div>

                    <form onSubmit={e => submit(e)}>
                        <div className={styles.signup_input_wrapper}>
                            <input 
                                className={styles.signup_input} 
                                placeholder='전화번호, 사용자 이름 또는 이메일'
                                onChange={e => setAccount(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className={styles.signup_input_wrapper}>
                            <input 
                                className={styles.signup_input} 
                                placeholder='성명'
                                onChange={e => setName(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className={styles.signup_input_wrapper}>
                            <input 
                                className={styles.signup_input} 
                                placeholder='사용자 이름'
                                onChange={e => setNickname(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className={styles.signup_input_wrapper}>
                            <input 
                                className={styles.signup_input} 
                                type='password'
                                placeholder='비밀번호'
                                onChange={e => setPassword(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className={styles.signup_desc}>저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에 업로드했을 수도 있습니다. </div>

                        <button className={styles.signup_button}>가입</button>
                    </form>
                </div>

                <div className={styles.login_wrapper}>
                    <span>계정이 있으신가요?</span>
                    <span 
                        className={styles.login_link}
                        onClick={onLinkClick}
                    >
                        로그인
                    </span>
                </div>
            </div>

            <Footer />
        </div>
    )
}