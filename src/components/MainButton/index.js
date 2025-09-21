'use client';

import { Button } from '@mui/material';

export const MainButton = (props) => {

    const { title, startIcon, icon, style, variant, onClick } = props;

    return (
        <Button
            variant={ variant || "contained" } 
            style={{ backgroundColor: style?.bg || 'black', color: style?.color || '#FFFFFF', textTransform: 'none', border: '1px solid #0000001a',  ...style }}
            startIcon={startIcon}
            onClick={onClick}
            {...props}
        >
            {title ?? icon}
        </Button>
    );
}