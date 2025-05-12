import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AxiosInstance from "./Axios";
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
        window.confirm("Are you sure you want to delete this project?") &&
        AxiosInstance.delete(`project/${MyId}/`).
            then((res) => {
                navigate('/')
            })
    }

    return (
        <div>
            {
                loading ?
                    <p> loading... </p>
                    :
                    <div>
                        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
                            <Typography sx={{ marginLeft: '20px', color: '#fff', fontSize: '20px', padding: '10px 0' }}>
                                Delete project: {myData.name}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>    

                            <Box sx={{ display: 'flex', gap: 10, marginBottom: "40px" }}>
                                Are you sure you want to delete this project: {myData.name}?
                            </Box>

                            <Box sx={{ width: '30%' }}>
                                <Button variant="contained" onClick={submission} sx={{ width: '100%', height: '100%' }}>
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    </div>
            }
        </div>
    )
}

export default Delete;