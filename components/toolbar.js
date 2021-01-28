import { useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css'

const Toolbar = () => {

    const router = useRouter();

    return (
        <div className={styles.main}>
            <div onClick={() => router.push('/')}>Home</div>
            <div onClick={() => router.push('/feed/1')}>Feed</div>
            <div onClick={() => router.push('/eom')}>EOMN</div>
            <div onClick={() => window.open('https://twitter.com', '_blank')}>Twitter</div>
        </div>
    );
};

export default Toolbar;
