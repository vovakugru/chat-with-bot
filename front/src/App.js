import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Box, Stack, Paper } from '@mui/material';
import Copyright from './Copyright';
import ChatBoxFooter from './ChatBoxFooter';
import styles from './App.module.css';
import MessageBlock from './MessageBlock';

const App = () => {
    const userName = 'Unknown_2024';
    const serverAddress = 'http://bh-test.ddns.net:11458/api/';

	const [allMessages, setAllMessage] = useState(null);
	const [botIsThinking, setBotIsThinking] = useState(false);

    const getMessagesFromAPI = async () => {
        try {
            const response = await axios.get(`${serverAddress}messages`);
            if (response?.data) {
                setAllMessage(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const postAIToGetResponseAPI = async (context) => {
        try {
            setBotIsThinking(true);
            await axios.post(`${serverAddress}messages/ai`, {
                text: `${context}`,
                author: `${userName}`,
            }).then(() => {
                setBotIsThinking(false);
            }).then(() => {
                getMessagesFromAPI();
            });
            return true;
        } catch (err) {
            setBotIsThinking(false);
            console.error(err);
        }
    };

    const postMessageToAPI = async (text) => {
        try {
            await axios.post(`${serverAddress}messages`, {
                author: userName,
                text: text,
            }).then(() => {
                getMessagesFromAPI();
            }).then(() => {
                postAIToGetResponseAPI(text);
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getMessagesFromAPI();
    }, []);

    const onSubmit = async (text) => {
        postMessageToAPI(text);
    };

    const renderMessages = useMemo(() => {
        if (!allMessages?.length) {
            return (
                <div className={styles.empty}>
                    <Typography variant="h5">
                        Ask sth
                    </Typography>
                </div>
            );
        }

        return allMessages.map((data, index) => {
            return <MessageBlock key={index} {...data} />
        });
    }, [allMessages]);

	return (
		<Container sx={{ pt: 4, px: 4, pb: 2, height: '100%', display: 'flex', flexDirection: 'column' }} maxWidth="sm">
            <Paper sx={{ p: 1, flex: '1', minHeight: 0 }}>
                <Box className={styles.wrapper}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        React + MUI + OpenAI API
                    </Typography>
                    <Paper className={styles.messages__scrollableArea} sx={{ mb: 1 }}>
                        <Stack className={styles.messages__wrapper}>
                            {renderMessages}
                            {botIsThinking && (
                                <div className={styles.infoBlock}>
                                    <Typography variant="overline">
                                        BOT is typing...
                                    </Typography>
                                </div>
                            )}
                        </Stack>
                    </Paper>
                    <ChatBoxFooter onSubmit={onSubmit} />
                </Box>
            </Paper>
            <Copyright />
		</Container>
	);
};

export default App;