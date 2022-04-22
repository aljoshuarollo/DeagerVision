import {theme} from '../styles/MUIStyle';
import {ThemeProvider} from '@mui/material/styles';
import Button from '@mui/material/Button';

export default function MUIButton({color, type, variant, onClick, style, href, disabled, title, startIcon, endIcon, size }) {
    return (
        <ThemeProvider theme={theme}>
            <Button color={color} variant={variant} type={type} onClick={onClick} style={style} href={href} disabled={disabled} startIcon={startIcon} endIcon={endIcon} size={size}>
                {title}
            </Button>
        </ThemeProvider>
    )
}