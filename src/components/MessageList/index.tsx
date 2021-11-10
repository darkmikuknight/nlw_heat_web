import { useEffect, useState } from 'react'
import { api } from '../../services/api'

import styles from './styles.module.scss'
import logoImg from '../../assets/logo.svg'

type Message = {
    id: string;
    text: string;
    user: {
        nome: string;
        avatar_url: string;
    }
}

export function MessageList () {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        api.get<Message[]>('messages/last3').then(response => {
            console.log(response.data);
            setMessages(response.data);
        })
    }, [])

    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile 2021" />

            <ul className={styles.messageList}>
                {messages.map(messages => {
                    return (
                        <li key={messages.id} className={styles.message}>
                            <p className={styles.messageContent}>{messages.text}</p>
                            <div className={styles.messageUser}>
                                <div className={styles.userImage}>
                                    <img src={messages.user.avatar_url} alt={messages.user.nome} />
                                </div>
                                <span>{messages.user.nome}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}