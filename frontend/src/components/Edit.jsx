import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import MyDatePickerField from "./forms/MyDatePickerField";
import MyMultilineField from "./forms/MyMultilineField";
import MySelectedField from "./forms/MySelectedField";
import MyTextField from "./forms/MyTextField";
import MyMultiSelectField from "./forms/MyMultiSelectField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import Dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


const Edit = () => {
    const MyParam = useParams();
    const MyId = MyParam.id;

    const navigate = useNavigate();

    const [projectManager, setProjectManager] = useState();
    const [employees, setEmployees] = useState();
    const [loading, setLoading] = useState(true);

    const hardcoded_options = [
        { id: 'Open', name: 'Open' },
        { id: 'In Progress', name: 'In Progress' },
        { id: 'Completed', name: 'Completed' },
    ]

    const defaultValues = {
        name: '',
        comments: '',
        status: '',
        start_date: null,
        end_date: null,
        ProjectManager: null,
        employees: []
    }

    const schema = yup.object({
        name: yup.string().required('Name is required field'),
        status: yup.string().required('Status is required field'),
        comments: yup.string(),
        start_date: yup.date().required('Start date is required field'),
        end_date: yup
            .date()
            .required('End date is required field')
            .min(yup.ref('start_date'), 'End date must be after start date'),
        ProjectManager: yup.string().nullable().required('Project manager is required field'), // 允许 null
        employees: yup.array().min(1, 'At least one employee is required from the select field'), // 确保是数组
    });

    const { handleSubmit, setValue, control } = useForm({ defaultValues: defaultValues, resolver: yupResolver(schema) });

    const GetData = () => {
        Promise.all([
            AxiosInstance.get('projectmanager/'),
            AxiosInstance.get(`project/${MyId}/`),
            AxiosInstance.get('employees/')
        ])
            .then(([projectManagersRes, projectRes, empolyeesRes]) => {
                setProjectManager(projectManagersRes.data); // setting ProjectManager list
                setEmployees(empolyeesRes.data); // setting Employees list
                const projectData = projectRes.data;
                setValue('name', projectData.name);
                setValue('comments', projectData.comments);
                setValue('status', projectData.status);
                setValue('start_date', Dayjs(projectData.start_date));
                setValue('end_date', Dayjs(projectData.end_date));
                setValue('ProjectManager', projectData.ProjectManager);
                setValue('employees', projectData.employees); 
                setLoading(false); // comfirmed that data is loaded then set loading to false
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        GetData();
    }, [])

    const submission = (data) => {
        console.log(data);
        const StartDate = Dayjs(data.start_date["$d"]).format('YYYY-MM-DD');
        const EndDate = Dayjs(data.end_date["$d"]).format('YYYY-MM-DD');
        AxiosInstance.put(`project/${MyId}/`, {
            name: data.name,
            comments: data.comments,
            status: data.status,
            start_date: StartDate,
            end_date: EndDate,
            ProjectManager: data.ProjectManager,
            employees: data.employees
        }).then((res) => {
            navigate('/')
        })
    }

    return (
        <div>
            {loading ?
                <p>loading....</p>
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

                        <Box sx={{ display: 'flex', gap: 10, marginBottom: "40px" }}>
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
                                options={hardcoded_options}
                            />

                            <MySelectedField
                                label="Project Manager"
                                name="ProjectManager"
                                control={control}
                                width={'40%'}
                                options={projectManager}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 10, marginBottom: "40px" }}>
                            <MyMultiSelectField
                                label="Employees"
                                name="employees" // Must be consistent with the backend field name!!!
                                width={'100%'}
                                control={control}
                                options={employees}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" type="submit" sx={{ width: '30%', height: '100%' }}>
                                Edit
                            </Button>
                        </Box>
                    </Box>
                </form>
            }
        </div>
    )
}

export default Edit;