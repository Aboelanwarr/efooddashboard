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
import { Container,FormControl,InputLabel,MenuItem,Select,Typography} from '@mui/material';
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



export default function PositionList() {
  const [itemPriceChangeList,setItemPriceChangeList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');

  useEffect(() => {
    // Fetch branches list
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branches-list`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setBranchList(result.data);
          // Optionally, set the first branch as selected by default
          if (result.data.length > 0) {
            setSelectedBranchId(result.data[0].id); // Assuming 'id' is the identifier
          }
        } else {
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Fetch tables list based on selected branch ID
    if (!selectedBranchId) return; // Do not fetch if no branch is selected
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/itemPriceChanges/${selectedBranchId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success"){
          setItemPriceChangeList(result.data.items);
        }else{
          console.error("Failed to fetch position list:", result);
        }
      })
      .catch((error) => console.error(error));
    }, [selectedBranchId]);
    const handleBranchChange = (event) => {
      setSelectedBranchId(event.target.value);
    };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Items Price Change History
      </Typography>
      <FormControl fullWidth sx={{mb:"20px"}}>
        <InputLabel id="branch-select-label">Branch</InputLabel>
        <Select
          labelId="branch-select-label"
          id="branch-select"
          value={selectedBranchId}
          label="Branch"
          onChange={handleBranchChange}
        >
          {branchList.map((branch) => (
            <MenuItem key={branch.branch_id} value={branch.branch_id}>{branch.branch_name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item ID</StyledTableCell>
            <StyledTableCell>Item Name</StyledTableCell> 
            <StyledTableCell>Changed By</StyledTableCell> 
            <StyledTableCell>Change Type</StyledTableCell> 
            <StyledTableCell>New Value</StyledTableCell> 
            <StyledTableCell>Previous Value</StyledTableCell> 
            <StyledTableCell>Actions</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {itemPriceChangeList.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell > {row.id}	</StyledTableCell>
              <StyledTableCell > {row.item}	</StyledTableCell>
              <StyledTableCell > {row.changed_by}	</StyledTableCell>
              <StyledTableCell > {row.change_type}	</StyledTableCell>
              <StyledTableCell > {row.new_value}	</StyledTableCell>
              <StyledTableCell > {row.previous_value}	</StyledTableCell>
              <StyledTableCell sx={{display:"flex",gap:"10px"}}>
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

