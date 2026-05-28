import { LoginCard } from '../../components/LoginScreenComponents/LoginCard';
import styles from './styles.module.css';

export function LoginScreen()
{
    return (
        <div className={ styles.container } >
            <LoginCard />
        </div>
    );
}