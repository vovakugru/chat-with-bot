import React from 'react';
import { Typography, Link } from '@mui/material';

const Copyright = () => {
	return (
		<Typography
			variant="body2"
			align="center"
			sx={{
				color: 'text.secondary',
				mt: 2,
				height: 'max-content'
			}}
		>
			{'Made by '}
			<Link
                target="_blank"
                rel="noopener"
			    color="inherit"
                href="https://t.me/Uladzimir_P"
            >
				Vladimir Polotnyuk
			</Link>
            {' '}
			{new Date().getFullYear()}.
		</Typography>
	);
}

export default Copyright;