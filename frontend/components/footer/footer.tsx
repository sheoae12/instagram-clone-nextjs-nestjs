import { FooterItems } from '@/constants/footerItems';
import styles from './Footer.module.css';

export default function Footer(): React.ReactNode {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_links}>
            {FooterItems.map((item, idx) => {
                return (
                    <span key={idx}>{item}</span>
                )
            })}
            </div>
            <div className={styles.footer_copyright}>
                © 2024 Instagram from Meta
            </div>
        </div>
    )
}