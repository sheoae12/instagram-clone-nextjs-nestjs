import Footer from '../footer/footer';
import styles from './Login.module.css';
import LoginBox from './Loginbox';

export default function Login(): React.ReactNode {
    return (
        <div className={styles.login_root}>
            <div className={styles.login_wrapper}>
                <img className={styles.login_instagram_img} src='/instagram_mobile.png' />
                <LoginBox />
            </div>
            <Footer />
        </div>
    )
}