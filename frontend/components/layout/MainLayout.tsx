import SideBar from "../sidebar/sidebar";
import styles from "./MainLayout.module.css";

type Props = ({
    children: React.ReactNode;
});

export default function MainLayout({ children }: Props) {
    return (
        <div className={styles.wrapper}>     
            <SideBar />
            <div className={styles.remain_space}>{children}</div>
        </div>
    )
}