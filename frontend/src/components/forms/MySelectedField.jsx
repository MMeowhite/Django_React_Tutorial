import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

export default function MySelectedField(props) {
    const { label, width, name, control } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <FormControl variant="standard" sx={{ width }}>
                    <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={value || ''} // 确保 value 不为 undefined
                        onChange={onChange}
                        error={!!error}
                    >
                        <MenuItem value="Open">Open</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                    <FormHelperText sx={{color: '#d32f2f'}}>
                        {error?.message}
                    </FormHelperText>
                </FormControl>
            )}
        />
    );
}