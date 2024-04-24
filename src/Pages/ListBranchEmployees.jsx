import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { Container,Typography} from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export default function CustomizedTables() {
  const [branchEmployeeList,setBranchEmployeeList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}:4000/admin/branch/activeEmployees/2`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setBranchEmployeeList(result.data.employees);
        }else{
          console.error("Failed to fetch employee list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  
  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Branch Employee List
      </Typography>
    <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee ID</StyledTableCell>
            <StyledTableCell>Employee Name</StyledTableCell>
            <StyledTableCell >Employee Date Hired	</StyledTableCell>
            <StyledTableCell >Employee status	</StyledTableCell>
            <StyledTableCell >Employee branch	</StyledTableCell>
            <StyledTableCell >Employee section	</StyledTableCell>
            <StyledTableCell >Employee position	</StyledTableCell>          
            <StyledTableCell >Actions</StyledTableCell>          
          </TableRow>
        </TableHead>
        <TableBody>
          {branchEmployeeList.map((row) => (
            <StyledTableRow key={row.employee_id}>
              <StyledTableCell > {row.employee_id}	</StyledTableCell>
              <StyledTableCell > {row.employee_name}	</StyledTableCell>
              <StyledTableCell >{row.employee_date_hired}	</StyledTableCell>
              <StyledTableCell >{row.employee_status}	</StyledTableCell>
              <StyledTableCell >{row.employee_branch}	</StyledTableCell>
              <StyledTableCell >{row.empolyee_section}	</StyledTableCell>
              <StyledTableCell >{row.employee_position}	</StyledTableCell>
              <StyledTableCell>
                <Button variant="outlined" startIcon={<EditIcon />}></Button>
                <Button variant="outlined" startIcon={<DeleteIcon/>}></Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

