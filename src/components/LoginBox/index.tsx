import { VscGithubInverted } from 'react-icons/vsc'

import styles from './styles.module.scss'

export function LoginBox() {
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=213b95456777dc0bb425&redirect_uri=http://localhost:3000`;

    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.signInWithGithub}>
                <VscGithubInverted size="24" />
                Entrar com GitHub
            </a>

        </div>

    )
}