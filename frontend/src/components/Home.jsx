import  React, { useEffect, useMemo, useState } from "react";
import AxiosInstance from "./Axios";
import { Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { MaterialReactTable } from "material-react-table";
import Dayjs from "dayjs";
import { Link } from "react-router-dom";

const Home = () => {
    const [myData, setMyData] = useState([]);
    const [loading, setLoading] = useState(true);

    const GetData = () => {
        // Fetch data from the backend
        // You can use fetch, axios, or any other method to get data
        // For example:
        // fetch('/api/your-endpoint')
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(error => console.error('Error fetching data:', error));
        AxiosInstance.get('project/')
            .then((res) => {
                setMyData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }

    // Call the GetData function when the component mounts
    useEffect(() => {
        GetData();
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'Name',
                size: 150,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 150,
            },
            {
                accessorKey: 'comments',
                header: 'Comments',
                size: 200,
            },
            {
                accessorFn: (row) => Dayjs(row.start_date).format('DD-MM-YYYY'),
                header: 'Start Date',
                size: 150,
            },
            {
                accessorFn: (row => Dayjs(row.end_date).format('DD-MM-YYYY')),
                header: 'End Date',
                size: 150,
            },
        ],
        [],
    );



    return (
        <div>
            {loading ? 
            <p>loading...</p> 
            : 
            <MaterialReactTable
             columns={columns} 
             data={myData}
             enableRowActions 
             renderRowActions={({ row, table }) => (
                <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                  <IconButton
                    color="secondary"
                    component={Link}
                    to={`edit/${row.original.id}`}
                  >
                    <EditIcon />
                  </IconButton>
                  
                  <IconButton
                    color="error"
                    component={Link}
                    to={`delete/${row.original.id}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            />}
        </div>
    )
}

export default Home;
