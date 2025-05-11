import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import MyDatePickerField from "./forms/MyDatePickerField";
import MyMultilineField from "./forms/MyMultilineField";
import MySelectedField from "./forms/MySelectedField";
import MyTextField from "./forms/MyTextField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import Dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";


const Delete = () => {
    const MyParam = useParams();
    const MyId = MyParam.id;

    const [myData, setMyData] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const GetData = () => {
        AxiosInstance.get(`project/${MyId}/`)
            .then((res) => {
                setMyData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }

    useEffect(() => {
        GetData();
    }, [])

    const submission = (data) => {
        AxiosInstance.delete(`project/${MyId}/`, {}).
        then((res) => {
            console.log(res.data);
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

                    <Box sx={{ display: 'flex', gap: 10 }}>
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

                        <Box sx={{ width: '30%' }}>
                            <Button variant="contained" type="submit" sx={{ width: '100%', height: '100%' }}>
                                Delete
                            </Button>
                        </Box>

                    </Box>

                </Box>
            </form>
        </div>
    )
}

export default Delete;