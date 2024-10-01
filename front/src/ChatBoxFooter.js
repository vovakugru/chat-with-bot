import { useState } from 'react';

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { TextField, Button } from '@mui/material';
import styles from './App.module.css';

const ChatBoxFooter = ({ onSubmit }) => {
	const [message, setMessage] = useState('');

	const summitMessage = () => {
		if (!message) {
			return;
		}

		setMessage('');
		onSubmit(`${message}`);
	};

	return (
		<form noValidate autoComplete='off' className={styles.newMessage}>
			<TextField
				placeholder="Message here ... "
				value={message}
				onChange={(event) => {
					setMessage(event.target.value);
				}}
				multiline
				maxRows={4}
				sx={{ flex: 1 , borderRadius: 1}}
			/>
			<Button
                onClick={summitMessage}
                variant="contained"
            >
                    <SendRoundedIcon />
            </Button>
		</form>
	);
};

export default ChatBoxFooter;