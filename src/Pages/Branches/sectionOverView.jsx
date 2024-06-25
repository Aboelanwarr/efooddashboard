import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Container,FormControl,InputLabel,MenuItem,Select,Typography} from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#D5D5D5',
    color: theme.palette.common.black,
    fontWeight: '600',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: '10px solid #F9F9F9',
    fontWeight: '500',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function SectionOverview() {
  const [sectionList,setSectionList] = useState([]);
  const [sectionOverview, setSectionOverview] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [selecteddays, setSelecteddays] = useState('');
  useEffect(() => {
    // Fetch Section list
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/menu/sectionsList`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setSectionList(result.data.sections);
          if (result.data.sections.length > 0) {
            setSelectedSectionId(result.data.sections[0].id);
          }
        } else {
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (!selectedSectionId) return; 
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/sectionOverView/${selectedSectionId}/${selecteddays}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setSectionOverview(result.data);
        } else {
          console.error("Failed to fetch sectionOverView:", result);
        }
      })
      .catch(error => console.error(error));
  }, [selectedSectionId,selecteddays]); // Depend on selectedBranchId

  const handleSectionChange = (event) => {
    setSelectedSectionId(event.target.value);
  };
  const handleDaysChange = (event) => {
    setSelecteddays(event.target.value);
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Section OverView
      </Typography>
      <Typography variant="h5" color="initial" sx={{mb:2}}>Select Section</Typography>
      <FormControl fullWidth sx={{mb:"20px"}}>
        <InputLabel id="section-select-label">Section</InputLabel>
        <Select
          labelId="section-select-label"
          id="section-select"
          value={selectedSectionId}
          label="Section"
          onChange={handleSectionChange}
        >
          {sectionList.map((section) => (
            <MenuItem key={section.section_id} value={section.section_id}>{section.section_name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h5" color="initial" sx={{mb:2}}>Select Days</Typography>
      <FormControl fullWidth sx={{mb:"20px"}}>
          <InputLabel id="Days-select-label">Days</InputLabel>
          <Select
            labelId="Days-select-label"
            id="Days-select"
            value={selecteddays}
            label="Days"
            onChange={handleDaysChange}
          >
            {Array.from({ length: 30 }, (_, i) => i + 1).map((number) => (
              <MenuItem key={number} value={number}>{number}</MenuItem>
            ))}
          </Select>
        </FormControl>
    <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Section ID</StyledTableCell>
            <StyledTableCell>Section Name</StyledTableCell> 
            <StyledTableCell>Total Orders</StyledTableCell> 
            <StyledTableCell>Total Items Ordered</StyledTableCell> 
            <StyledTableCell>Average Section Rating</StyledTableCell> 
            <StyledTableCell>Actions</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {sectionOverview.map((row) => (
            <StyledTableRow key={row.section_id}>
              <StyledTableCell > {row.section_id}	</StyledTableCell>
              <StyledTableCell > {row.section_name}	</StyledTableCell>
              <StyledTableCell > {row.total_orders}	</StyledTableCell>
              <StyledTableCell > {row.total_items_ordered}	</StyledTableCell>
              <StyledTableCell > {parseFloat(row?.average_section_rating).toFixed(2)} </StyledTableCell>
              <StyledTableCell>
                  <Button><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_103_484)">
                      <path d="M22.0001 4.26667L19.5334 1.8C19.3214 1.59785 19.0397 1.48508 18.7467 1.48508C18.4538 1.48508 18.1721 1.59785 17.9601 1.8L15.7667 4H4.00008C3.64646 4 3.30732 4.14048 3.05727 4.39052C2.80722 4.64057 2.66675 4.97971 2.66675 5.33333V20C2.66675 20.3536 2.80722 20.6928 3.05727 20.9428C3.30732 21.1929 3.64646 21.3333 4.00008 21.3333H18.6667C19.0204 21.3333 19.3595 21.1929 19.6096 20.9428C19.8596 20.6928 20.0001 20.3536 20.0001 20V7.84L22.0001 5.84C22.2085 5.63126 22.3256 5.34832 22.3256 5.05333C22.3256 4.75834 22.2085 4.47541 22.0001 4.26667ZM12.5534 13.42L9.76008 14.04L10.4267 11.2733L16.7934 4.89333L18.9467 7.04667L12.5534 13.42ZM19.6667 6.28667L17.5134 4.13333L18.7467 2.9L20.9001 5.05333L19.6667 6.28667Z" fill="#007EF2" />
                    </g>
                    <defs>
                      <clipPath id="clip0_103_484">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  </Button>
                  <Button><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8.46 11.88L9.87 10.47L12 12.59L14.12 10.47L15.53 11.88L13.41 14L15.53 16.12L14.12 17.53L12 15.41L9.88 17.53L8.47 16.12L10.59 14L8.46 11.88ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="#FF3C5F" />
                  </svg>
                  </Button>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

