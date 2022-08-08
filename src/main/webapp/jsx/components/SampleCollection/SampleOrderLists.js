import React, {useEffect, useCallback, useState} from 'react';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import {Label, Input, FormGroup} from "reactstrap"
import Grid from "@material-ui/core/Grid";
import "./sample.css";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {format} from "date-fns";

import { forwardRef } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import {token, url } from "../../../api";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { makeStyles } from '@material-ui/core/styles'

const tableIcons = {
Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    cardBottom: {
        marginBottom: 20
    },
    Select: {
        height: 45,
        width: 350
    },
    button: {
        margin: theme.spacing(1)
    },

    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    input: {
        border:'2px solid #014d88',
        borderRadius:'0px',
        fontSize:'16px',
        color:'#000'
    },
    error: {
        color: "#f85032",
        fontSize: "11px",
    },
    success: {
        color: "#4BB543 ",
        fontSize: "11px",
    },
    inputGroupText:{
        backgroundColor:'#014d88',
        fontWeight:"bolder",
        color:'#fff',
        borderRadius:'0px'
    },
    label:{
        fontSize:'16px',
        color:'rgb(153, 46, 98)',
        fontWeight:'600'
    }
}))

const SampleSearch = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState('')
    const [collectedSamples, setCollectedSamples] = useState([])
    const samples = []

     const loadLabTestData = useCallback(async () => {
            try {
                const response = await axios.get(`${url}lims/collected-samples/`, { headers: {"Authorization" : `Bearer ${token}`} });
                console.log("samples", response);
                setCollectedSamples(response.data);
                setLoading(false)
                localStorage.clear();

            } catch (e) {
                toast.error("An error occurred while fetching lab", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setLoading(false)
            }
        }, []);

     useEffect(() => {
     setLoading('true');
         const onSuccess = () => {
             setLoading(false)
         }
         const onError = () => {
             setLoading(false)
         }

         loadLabTestData();

     }, [loadLabTestData]);

     const calculate_age = dob => {
             var today = new Date();
             var birthDate = new Date(dob);
             var age_now = today.getFullYear() - birthDate.getFullYear();
             return age_now

           };

     const handleSampleChanges = (sample) => {
        sample.filter((item) => {
            var i = samples.findIndex(x => (x.patientId === item.patientId && x.sampleId === item.sampleId && x.sampleType === item.sampleType));
            if(i <= -1){
                    console.log("items", item)

                    samples.push({
                      patientID: [{
                          idNumber: item.patientId,
                          idTypeCode: item.typecode
                      }],
                      firstName: item.firstname,
                      surName: item.surname,
                      sex: item.sex,
                      pregnantBreastFeedingStatus: "",
                      age: 0,
                      dateOfBirth: item.dob,
                      age: item.age,
                      sampleID: item.sampleId,
                      sampleType: item.sampleType,
                      indicationVLTest: 1,
                      artCommencementDate: "",
                      drugRegimen: "",
                      sampleOrderedBy: item.orderby,
                      sampleOrderDate: item.orderbydate,
                      sampleCollectedBy: item.collectedby,
                      sampleCollectionDate: item.datecollected,
                      sampleCollectionTime: item.timecollected,
                      dateSampleSent: format(new Date(), 'yyyy-MM-dd'),
                      id: 0,
                      manifestID: 0,
                      pid: 0,
                      priority: 0,
                  });

                  localStorage.setItem('samples', JSON.stringify(samples));

              }
             return null;
        })

     }

  return (
      <div>
      <Card>
         <Card.Body>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                   <FormGroup>
                       <Label for="dateScheduledForPickup" className={classes.label}>Start date</Label>

                       <Input
                           type="date"
                           name="dateScheduledForPickup"

                           id="dateScheduledForPickup"
                           placeholder="Date & Time Created"

                           className={classes.input}
                       />
                   </FormGroup>
              </Grid>
              <Grid item xs={2}>
                    <FormGroup>
                      <Label for="dateScheduledForPickup" className={classes.label}>End date</Label>

                      <Input
                          type="date"
                          name="dateScheduledForPickup"

                          id="dateScheduledForPickup"
                          placeholder="Date & Time Created"

                          className={classes.input}
                      />
                  </FormGroup>
              </Grid>
              <Grid item xs={2}>

              </Grid>
            </Grid>
          <br />
          <MaterialTable
           icons={tableIcons}
              title="Sample Collection List"
              columns={[
                  { title: "Type code", field: "typecode" },
                  { title: "Patient ID", field: "patientId" },
                  { title: "First Name", field: "firstname" },
                  { title: "Surname", field: "surname" },
                  { title: "Sex", field: "sex" },
                  { title: "DOB", field: "dob" },
                  { title: "Age", field: "age" },
                  {
                    title: "Test Type",
                    field: "testType",
                  },
                  { title: "Sample ID", field: "sampleId" },
                  {
                    title: "Sample Type",
                    field: "sampleType",
                  },
                  { title: "Sample Orderby", field: "orderby" },
                  { title: "Orderby Date", field: "orderbydate" },
                  { title: "Collected By", field: "collectedby" },
                  { title: "Date Collected", field: "datecollected", type: "date" , filtering: false},
                  { title: "Time Collected", field: "timecollected", type: "time" , filtering: false},
//                  {
//                    title: "Action",
//                    field: "actions",
//                    filtering: false,
//                  },
              ]}
              isLoading={loading}
              data={ collectedSamples.map((row) => (
                    {
                      typecode: row.patientID.idTypeCode,
                      patientId: row.patientID.idNumber,
                      firstname: row.firstName,
                      surname: row.surName,
                      sex: row.sex,
                      dob: row.dateOfBirth,
                      age: calculate_age(row.dateOfBirth),
                      testType: "VL",
                      sampleId: row.sampleID,
                      sampleType: row.sampleType,
                      orderby: row.sampleOrderedBy,
                      orderbydate: row.sampleOrderDate,
                      collectedby: row.sampleCollectedBy,
                      datecollected: row.sampleCollectionDate,
                      timecollected: row.sampleCollectionTime,

//                      actions:  <Link to ={{
//                                      pathname: "/samples-collection",
//                                      state: row
//                                  }}
//                                      style={{ cursor: "pointer", color: "blue", fontStyle: "bold"}}
//                                >
//                                    <Tooltip title="Collect Sample">
//                                        <IconButton aria-label="Collect Sample" >
//                                            <VisibilityIcon color="primary"/>
//                                        </IconButton>
//                                    </Tooltip>
//                                </Link>
                    })
              )}

                  options={{
                    headerStyle: {
                        backgroundColor: "#014d88",
                        color: "#fff",
                        fontSize:'16px',
                        padding:'10px'
                    },
                    searchFieldStyle: {
                        width : '300%',
                        margingLeft: '250px',
                    },
                    selection: true,
                    filtering: false,
                    exportButton: false,
                    searchFieldAlignment: 'left',
                    pageSizeOptions:[10,20,100],
                    pageSize:5,
                    debounceInterval: 400
                }}
                 onSelectionChange={(rows) => handleSampleChanges(rows)}

          />
           {/*  <div>
                 <Stack direction="row" spacing={2}
                 m={1}
                 display="flex"
                 justifyContent="flex-end"
                 alignItems="flex-end">
                      <Link color="inherit"
                          to={{pathname: "/"}}
                           >
                          <Button variant="outlined" color="primary">
                             PrevPage
                          </Button>
                      </Link>
                      {" "}
                      { <Link color="inherit"
                             to={{
                             pathname: "/create-manifest",
                             state:{ sampleObj: samples }
                             }}

                              >
                             <Button variant="outlined" color="success">
                                NextPage
                             </Button>
                         </Link>
                         }

                  </Stack>
                 <br />
             </div>*/}
         </Card.Body>
       </Card>
    </div>
  );
}

export default SampleSearch;