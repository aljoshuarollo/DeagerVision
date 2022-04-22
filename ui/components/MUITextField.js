import {theme} from '../styles/MUIStyle';
import {ThemeProvider} from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export default function MUITextField ({color, id, label, variant, type, onChange, placeholder, multiline, defaultValue, fullWidth, size}) {
    return (
        <ThemeProvider theme={theme}>
            <TextField color={color} id={id} label={label} variant={variant} type={type} onChange={onChange} placeholder={placeholder} multiline={multiline} defaultValue={defaultValue} fullWidth={fullWidth} size={size}/>
        </ThemeProvider>
    )
}