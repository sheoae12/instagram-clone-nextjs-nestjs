'use client'

import { FormEvent, useState } from 'react'
import styles from './Login.module.css'
import { SignInResponse, signIn } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LoginBox(): React.ReactNode {
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        
        try {
            const res = await signIn('credentials', { account, password, callbackUrl: '/feed' })

            if (res && res.ok) {
                router.push('/feed')
            } else if (res && !res.ok) {
                toast.error('계정이나 비밀번호를 다시 확인해주세요.')
            }
        } catch (error) {
            console.log('login error', error)
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
                        type='password'
                        placeholder='비밀번호'
                        onChange={e => setPassword(e.target.value)}
                    >
                    </input>
                </div>

                <button className={styles.login_button}>로그인</button>
            </form>
        </div>
    )
}