import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StoreIcon from "@mui/icons-material/Store";
import DiamondIcon from "@mui/icons-material/Diamond";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";


export default function NestedList() {
  // Initialize state to manage open/close state of each section individually
  const [openStates, setOpenStates] = React.useState({
    productSetup: false,
    employeesSetup: false,
    branchSetup: false,
    tableSection: false,
    employeesRolesSetup: false,
  });

  const handleClick = (section) => {
    setOpenStates((prevStates) => ({
      ...Object.keys(prevStates).reduce((acc, key) => {
        acc[key] = false; // Set all sections to false
        return acc;
      }, {}),
      [section]: !prevStates[section], // Toggle the clicked section
    }));
  };

  return (
    <List
      sx={{ width: "100%", height: "100%", minHeight: "100vh", bgcolor: "#232b2b", color: "white" }}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" sx={{ padding: 0, color: "white", bgcolor: "#232b2b" }}>
          <ListItemButton sx={{ padding: '10px 16px' }}>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListSubheader>
      }
    >
      <Divider sx={{ bgcolor: "whitesmoke" }} />
      {/* Product Setup */}
      <ListItemButton sx={{ mt: 1, mb: 1 }} onClick={() => handleClick("productSetup")} >
        <ListItemIcon>
          <DiamondIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Product Setup" />
        {openStates.productSetup ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStates.productSetup} timeout="auto" unmountOnExit >
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddProduct">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Product" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/ListProduct">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="List Product" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addMenuItem">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Menu Item" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/generalMenuList">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="General Menu List" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider sx={{ bgcolor: "whitesmoke" }} />

      {/* Employees Section */}
      <ListItemButton sx={{ mt: 1, mb: 1 }} onClick={() => handleClick("employeesSetup")}>
        <ListItemIcon>
          <PermIdentityIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Employees Section" />
        {openStates.employeesSetup ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStates.employeesSetup} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to="/EmployeeRoleSetup"
          >
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Employee Role Setup" />
          </ListItemButton>
        </List>
      </Collapse>

      {/* Employee Setup */}
      <ListItemButton sx={{ mt: 1, mb: 1 }} onClick={() => handleClick("employeesRolesSetup")}>
        <ListItemIcon>
          <PermIdentityIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Employee Setup" />
        {openStates.employeesRolesSetup ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={openStates.employeesRolesSetup}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddEmployee">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add New" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addPosition">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Position" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/positionList">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Position List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/ListEmployee">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="List Active" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listInactiveEmployee">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="List In Active" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider sx={{ bgcolor: "whitesmoke" }} />
      {/* Branch Setup */}
      <ListItemButton sx={{ mt: 1, mb: 1 }} onClick={() => handleClick("branchSetup")}>
        <ListItemIcon>
          <StoreIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Branch Setup" />
        {openStates.branchSetup ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStates.branchSetup} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddBranch">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/ListBranch">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddStorage">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Storage " />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddIngredient">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Ingredient " />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addBranchSection">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Branch Section" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addGeneralSection">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add General Section" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/ingredientSuppliersList">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Ingredient Suppliers List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listCategories">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Categories List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listRecipes">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Recipes List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/branchPriceChangeList">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Branch Price Change List" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider sx={{ bgcolor: "whitesmoke" }} />
      {/* Table Section */}
      <ListItemButton sx={{ mt: 1, mb: 1 }} onClick={() => handleClick("tableSection")}>
        <ListItemIcon>
          <TableRestaurantIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Table Section" />
        {openStates.tableSection ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStates.tableSection} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddTable">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Table " />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/ListTable">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Availability" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
