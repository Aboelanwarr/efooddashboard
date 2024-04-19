import React, { useState, useEffect } from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddBranch() {
  const [employeeList, setEmployeeList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch("http://localhost:4000/admin/employees/active-employees-list", requestOptions)
      .then((response) => response.json())
      .then((result) => setEmployeeList(result))
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const data = JSON.stringify({
      storageName: e.target['storageName'].value,
      storageAddress: e.target['storageAddress'].value,
      manager_id:e.target['manager_id'].value
      })
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };
    fetch("http://localhost:4000/admin/branch/add-storage", requestOptions)
    .then((response) => response.json())
    .then((result) => toast.success(result.message))
    .catch((error) => toast.error(error.message));
};     

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial">
        <AddBusinessIcon fontSize='inherit' /> Add Branch Storage
      </Typography>
      <form onSubmit={onSubmit}>
            <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h6" color="initial">Storage Details</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='storageName' label="StorageName" variant="outlined" required />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField name='storageAddress' label="StorageAddress" variant="outlined" required />
          </FormControl>
          <InputLabel id="demo-simple-select-label">Select Employee</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Employee Id"
            fullWidth
            name='manager_id'
          >
            {
              employeeList?.map(employee => (
                <MenuItem key={employee.employee_id} value={employee.employee_id}>{employee.employee_name}</MenuItem>
              ))
            }
          </Select>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}