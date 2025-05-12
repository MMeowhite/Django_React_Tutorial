import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import MyDatePickerField from "./forms/MyDatePickerField";
import MyMultilineField from "./forms/MyMultilineField";
import MySelectedField from "./forms/MySelectedField";
import MyTextField from "./forms/MyTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import AxiosInstance from "./Axios";
import Dayjs from "dayjs";
import { useNavigate } from "react-router-dom";


const Create = () => {

    const [projectManager, setProjectManager] = useState();
    const [loading, setLoading] = useState(true);

    const hardcoded_options = [
        { id: 'Open', name: 'Open' },
        { id: 'In Progress', name: 'In Progress' },
        { id: 'Completed', name: 'Completed' },
    ]

    const GetData = () => {
        AxiosInstance.get('projectmanager/')
            .then((res) => {
                setProjectManager(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }

    useEffect(() => {
        GetData();
    }, []);

    const navigate = useNavigate();

    const defaultValues = {
        name: '',
        comments: '',
        status: '',
        start_date: null,
        end_date: null,
    }

    const schema = yup
        .object({
            name: yup.string().required('Name is required field'),
            status: yup.string().required('Status is required field'),
            comments: yup.string(),
            start_date: yup.date().required('Start date is required field'),
            end_date: yup.date().required('End date is required field').min(yup.ref('start_date'), 'End date must be after start date'),
            ProjectManager: yup.string().required('Project manager is required field'),
        })

    // Create a form using react-hook-form and yup for validation
    const { handleSubmit, control } = useForm({ defaultValues: defaultValues, resolver: yupResolver(schema) });

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
            ProjectManager: data.ProjectManager,
            name: data.name,
            comments: data.comments,
            status: data.status,
            start_date: StartDate,
            end_date: EndDate
        }).then((res) => {
            navigate('/')
        })
    }

    return (
        <div>
            {loading ?
                <p>loading...</p>
                :
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
                                name="name" // Must be consistent with the backend field name!!!
                                control={control}
                                rules={{ required: true }}
                                helperText="This field is required"
                                width={'30%'}
                            />

                            <MyDatePickerField
                                label="Start Date"
                                name="start_date" // Must be consistent with the backend field name!!!
                                control={control}
                                width={'40%'}
                            />

                            <MyDatePickerField
                                label="End Date"
                                name="end_date" // Must be consistent with the backend field name!!!
                                control={control}
                                width={'40%'}
                            />

                        </Box>

                        <Box sx={{ display: 'flex', gap: 10, marginBottom: "40px" }}>
                            <MyMultilineField
                                label="Comments"
                                placeholder="Provide project comments"
                                name="comments" // Must be consistent with the backend field name!!!
                                control={control}
                                width={'30%'}
                            />

                            <MySelectedField
                                label="Status"
                                name="status" // Must be consistent with the backend field name!!!
                                control={control}
                                width={'40%'}
                                options={hardcoded_options}
                            />

                            <MySelectedField
                                label="Project Manager"
                                name="ProjectManager" // Must be consistent with the backend field name!!!
                                control={control}
                                width={'40%'}
                                options={projectManager}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Button variant="contained" type="submit" sx={{ width: '30%', height: '100%' }}>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </form>
            }
        </div>
    )
}

export default Create;