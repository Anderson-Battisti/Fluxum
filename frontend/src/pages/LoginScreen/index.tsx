import styles from './styles.module.css';
import { LoginCard } from '../../components/LoginScreenComponents/LoginCard';

export function LoginScreen()
{
    return (
        <div className={ styles.container } >
            <LoginCard />
        </div>
    );
}