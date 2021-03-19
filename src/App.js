// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import './App.css';
import clsx from 'clsx';
import passangerData from "./passangerDetails.json";
// import PassangerDetails from "./passDetailsModal.js";
import { makeStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Drawer from "@material-ui/core/Drawer";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));


export default function App() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [passangerArray, setPassangerArray] = useState(passangerData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [state, setState] = useState({
    right: false
  });
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow ] = useState({});
  const [isSearchActive, setSearchStatus] = useState(false);

  const handleDrawerOpen = (event) => {
    setOpen(true);
    const modal = isSearchActive ? passangerArray[event] : passangerData[event]
    setSelectedRow(modal);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onSearch = (event) => {
    const search_value = event.target.value;
    if (!search_value) {
      setPassangerArray(passangerData);
      return;
    }
    var results = [];
    var searchField = "pnr";
    for (var i = 0; i < passangerData.length; i++) {
      if (
        passangerData[i][searchField].startsWith(search_value.toLowerCase())
      ) {
        results.push(passangerData[i]);
      }
    }
    setPassangerArray(results);
    setSearchStatus(search_value ? true : false)
  };

  const getTableData = () => {
    return passangerArray.map((item, index) => {
      
      return (
        <TableRow>
          <TableCell className="table-font"
            style={{ color: "blue", cursor: "pointer",fontSize:"14px" }}
            onClick={(item) => handleDrawerOpen(index)}
          >
            {item.pnr}
          </TableCell>
          <TableCell style={{fontSize:"14px"}}>{item.from_location}</TableCell>
          <TableCell style={{fontSize:"14px"}}>{item.to_location}</TableCell>
          <TableCell style={{fontSize:"14px"}}>{item.date_of_journey}</TableCell>
          <TableCell style={{fontSize:"14px"}}>{item.passanger_name}</TableCell>
          <TableCell style={{fontSize:"14px"}}>{item.contact}</TableCell>
          <TableCell style={{fontSize:"14px"}}>{item.total_amount}</TableCell>
        </TableRow>
      );
    });
  };



  return (
    <div className="container-fluid m-5 App">
      <h1>Passanger List</h1>
      <div className="row">
        <div className="col-sm-12">
          <div style={{ position: "relative", minHeight: "400px" }}>
            <Paper className={classes.root}>
              <div style={{ margin: "20px 0px", width: "100%" }}>
                <input
                  style={{ height: "35px", width: "100%", paddingLeft: "15px" }}
                  type="search"
                  id="Search"
                  name="Search"
                  placeholder="Search by PNR"
                  onChange={onSearch}
                  // value={value}
                  margin="none"
                  multiple
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i className="zmdi zmdi-search zmdi-hc-fw " />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <TableContainer className={classes.container}>
                <Table className="table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{fontSize:"14px"}}>PNR</TableCell>
                      <TableCell style={{fontSize:"14px"}}>From Location</TableCell>
                      <TableCell style={{fontSize:"14px"}}>To Location</TableCell>
                      <TableCell style={{fontSize:"14px"}}>Date of Journey</TableCell>
                      <TableCell style={{fontSize:"14px"}}>Name</TableCell>
                      <TableCell style={{fontSize:"14px"}}>Contact Number</TableCell>
                      <TableCell style={{fontSize:"14px"}}>Total Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {passangerData.length ? (
                      [
                        getTableData().slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      ]
                    ) : (
                      <TableRow>
                        <TableCell>No Data Available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        style={{ fontSize: "14px" }}
        count={passangerArray.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <div>
          <React.Fragment>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="right"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClick={handleDrawerClose}
            >
            {
            // selectedIndex && selectedIndex >= 0 && selectedIndex < passangerData.length ? 
            
            
            <div
                role="presentation"
              >
                <div style={{ margin:"20px 10px" }}>
                  Passanger Details
                </div>
                <div style={{ margin:"20px 10px" }}>
                  <label className="label">PNR</label>
                  <div>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      variant="outlined"
                      id="pnr"
                      value={selectedRow.pnr}
                    />
                  </div>
                </div>
                <div style={{ margin:"20px 10px" }}>
                  <label className="label">From</label>
                  <div>
                    <TextField
                      id="from"
                      value={selectedRow.from_location}
                      variant="outlined"
                      disabled
                    />
                  </div>
                </div>
                <div style={{ margin:"20px 10px" }}>
                  <label className="label">To</label>
                  <div>
                    <TextField
                      id="to"
                      value={selectedRow.to_location}
                      variant="outlined"
                      disabled
                    />
                  </div>
                </div>
                <div style={{ margin:"20px 10px" }}>
                  <label className="label">DATE OF JOURNEY</label>
                  <div>
                  <TextField
                    id="date"
                    value={selectedRow.date_of_journey}
                    variant="outlined"
                    disabled
                  />
                  </div>
                </div>
                <div style={{ margin:"20px 10px" }}>
                  <label className="label">Name</label>
                  <div>
                    <TextField
                      id="name"
                      value={selectedRow.passanger_name}
                      variant="outlined"
                      disabled
                  />
                  </div>
                </div>
                <div style={{ margin:"20px 10px" }}>
                  <label className="label">CONTACT</label>
                  <div>
                    <TextField
                      id="contact"
                      value={selectedRow.contact}
                      variant="outlined"
                      disabled
                    />
                  </div>
                </div>
                <div style={{ margin:"20px 10px" }}>
                  <label className="label">TOTAL AMOUNT</label>
                  <div>
                    <TextField
                      id="amount"
                      value={selectedRow.total_amount}
                      variant="outlined"
                      disabled
                    />
                  </div>
                </div>
              </div>
            // : ""
            }
            </Drawer>
          </React.Fragment>
      </div>
    </div>
  );
}

