
import FormControlLabel from '@mui/material/FormControlLabel';
import {theme} from '../styles/MUIStyle';
import {ThemeProvider} from '@mui/material/styles';

export default function MUICheckBox({disabled, checked, control, label, onChange}) {
    return (
        <ThemeProvider theme={theme}>
            <FormControlLabel disabled={disabled} checked={checked} color='primary' control={control} label={label} onChange={ onChange }/>
        </ThemeProvider>
    )
};