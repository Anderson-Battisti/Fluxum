import styles from '../../../styles/shared/screenBackground.module.css';
import { LoginCard } from '../../components/LoginScreen/LoginCard';

export function LoginScreen()
{
    return (
        <div className={ styles.container } >
            <LoginCard />
        </div>
    );
}