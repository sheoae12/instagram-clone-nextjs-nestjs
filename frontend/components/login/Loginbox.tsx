'use client'

import { FormEvent, useState } from 'react'
import styles from './Login.module.css'
import { SignInResponse, signIn } from 'next-auth/react'

export default function LoginBox(): React.ReactNode {
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            // const res = await fetch('/api/signin', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ account, password })
            // })

            // if (res.ok) {
            //     console.log('signin ok')
            // } else {
            //     console.log('sigin failed')
            // }
            const res = await signIn('credentials', { account, password })

            if (res && res.error) {
                alert('error')
                return
            }
        } catch (error) {
            console.log('error ', error)
        }
    }

    return (
        <div className={styles.box_container}>
            <img className={styles.box_logo_font} src='/instagram_font_white.png'/>
            
            <form onSubmit={e => submit(e)}>
                <div className={styles.login_input_wrapper}>
                    <input 
                        className={styles.login_input} 
                        placeholder='전화번호, 사용자 이름 또는 이메일'
                        onChange={e => setAccount(e.target.value)}
                    >
                    </input>
                </div>
                <div className={styles.login_input_wrapper}>
                    <input 
                        className={styles.login_input} 
                        placeholder='비밀번호'
                        onChange={e => setPassword(e.target.value)}
                    >
                    </input>
                </div>

                <button className={styles.login_button}>로그인</button>
            </form>

            <div>

            </div>
        </div>
    )
}