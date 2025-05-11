import React from "react";
import { Box, Typography, Button } from "@mui/material";
import MyDatePickerField from "./forms/MyDatePickerField";
import MyMultilineField from "./forms/MyMultilineField";
import MySelectedField from "./forms/MySelectedField";
import MyTextField from "./forms/MyTextField";
import { useForm } from "react-hook-form";
import  AxiosInstance from "./Axios";
import Dayjs from "dayjs";
import { useNavigate } from "react-router-dom";


const Create = () => {

    const navigate = useNavigate();

    const defaultValues = {
        name: '',
        comments: '',
        status: '',
        start_date: null,
        end_date: null,
    }

    const { handleSubmit, reset, setValue, control } = useForm({defaultValues: defaultValues});

    const submission = (data) => {
        console.log(data); // Log the form data to the console
        // Here you can send the data to your backend or perform any other action
        // For example, using fetch or axios to send a POST request
        // fetch('/api/your-endpoint', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
        const StartDate = Dayjs(data.start_date["$d"]).format('YYYY-MM-DD');
        const EndDate = Dayjs(data.end_date["$d"]).format('YYYY-MM-DD');
        AxiosInstance.post(`project/`, {
            name: data.name,
            comments: data.comments,
            status: data.status,
            start_date: StartDate,
            end_date: EndDate,
        }).then((res) => {
            navigate('/')
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submission)}>

            
            <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
                <Typography sx={{ marginLeft: '20px', color: '#fff', fontSize: '20px', padding: '10px 0' }}>
                    Create records
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>

                <Box sx={{ display: 'flex', gap: 10, marginBottom: "40px" }}>
                    <MyTextField
                        label="Name"
                        placeholder="Provide a project name"
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        helperText="This field is required"
                        width={'30%'}
                    />

                    <MyDatePickerField
                        label="Start Date"
                        name="start_date"
                        control={control}
                        width={'40%'}
                    />

                    <MyDatePickerField
                        label="End Date"
                        name="end_date"
                        control={control}
                        width={'40%'}
                    />

                </Box>

                <Box sx={{ display: 'flex', gap: 10}}>
                    <MyMultilineField
                        label="Comments"
                        placeholder="Provide project comments"
                        name="comments"
                        control={control}
                        width={'30%'}
                    />

                    <MySelectedField
                        label="Status"
                        name="status"
                        control={control}
                        width={'40%'}
                    />

                    <Box sx={{width: '30%'}}>
                        <Button variant="contained" type="submit" sx={{ width: '100%', height: '100%' }}>
                            Submit
                        </Button>
                    </Box>

                </Box>
                
            </Box>
            </form>
        </div>
    )
}

export default Create;