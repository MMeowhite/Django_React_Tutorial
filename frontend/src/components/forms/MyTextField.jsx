import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

export default function MyTextField(props) {
    const { label, width, placeholder, name, control } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState
            }) => (
                <TextField 
                    id="standard-basic"
                    sx={{width: {width}}}
                    onChange={onChange}
                    value={value}
                    label={label}
                    variant="standard"
                    placeholder={placeholder}
                    error={!!error}
                    helperText={error?.message}
                />
            )}
        />

    );
}