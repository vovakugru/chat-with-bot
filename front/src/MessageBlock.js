import { Avatar, Typography } from '@mui/material';
import React from 'react';
import botAvatar from './images/bot.png';
import userAvatar from './images/user.png';
import styles from './App.module.css';
import clsx from "clsx";

const MessageBlock = ({ author, text }) => {
    const src = author === 'bot' ? botAvatar : userAvatar;

    return (
        <div className={clsx(styles.messageBlock, {
            [styles.user]: author !== 'bot'
        })}>
            <Avatar src={src} />
            <div className={styles.messageBlock__content}>
                <Typography variant="overline">
                    {author}
                </Typography>
                <div className={styles.messageBlock__text}>
                    <Typography variant="body2">
                        {text}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default MessageBlock;

