"use client";
import * as React from "react";
import { getDatabase, ref, onValue, update, push } from "firebase/database";
import { db } from "./lib/firebase";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function JobsTable() {
  const [jobs, setJobs] = React.useState<any[]>([]);
  const [selectedJob, setSelectedJob] = React.useState<any>(null);
  const [openModifyDialog, setOpenModifyDialog] = React.useState(false);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);

  const [jobType, setJobType] = React.useState("");
  const [assignedTo, setAssignedTo] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [status, setStatus] = React.useState("Assigned");

  // Fetch jobs from Firebase in real-time
  React.useEffect(() => {
    const jobsRef = ref(db, "jobs");
    onValue(jobsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const jobList = Object.entries(data).map(([id, job]) => ({
          id,
          ...job,
        }));
        setJobs(jobList);
      } else {
        setJobs([]);
      }
    });
  }, []);

  // Format phone number as (XXX) XXX-XXXX
  const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/\D/g, ""); // Remove non-numeric characters
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  // Open Create Job Dialog
  const handleCreateJob = () => {
    setOpenCreateDialog(true);
    setJobType("");
    setAssignedTo("");
    setAddress("");
    setPhoneNumber("");
    setStatus("Assigned");
  };

  // Submit New Job
  const handleSubmitJob = async () => {
    if (!jobType || !assignedTo || !address || !phoneNumber) return;

    const newJobRef = push(ref(db, "jobs"));
    const newJob = {
      jobType,
      assignedTo,
      address,
      phoneNumber,
      status,
    };

    try {
      await update(newJobRef, newJob);
      setOpenCreateDialog(false);
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  // Open Modify Job Dialog
  const handleModify = (job: any) => {
    setSelectedJob(job);
    setJobType(job.jobType);
    setAssignedTo(job.assignedTo);
    setAddress(job.address);
    setPhoneNumber(job.phoneNumber || "");
    setStatus(job.status);
    setOpenModifyDialog(true);
  };

  // Update Job in Firebase
  const handleUpdateJob = async () => {
    if (!selectedJob) return;

    const jobRef = ref(db, `jobs/${selectedJob.id}`);
    try {
      await update(jobRef, { jobType, assignedTo, address, phoneNumber, status });

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === selectedJob.id
            ? { ...job, jobType, assignedTo, address, phoneNumber, status }
            : job
        )
      );

      console.log("Job updated successfully!");
      setOpenModifyDialog(false);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  // Define button styles based on selection
  const getStatusButtonStyle = (buttonStatus: string) => ({
    backgroundColor: status === buttonStatus ? "#333" : buttonStatus === "Assigned" ? "#1976d2" :
                     buttonStatus === "Work in Progress" ? "#ff9800" :
                     buttonStatus === "Completed" ? "#4caf50" : "#f44336",
    color: "#fff",
    fontWeight: status === buttonStatus ? "bold" : "normal",
  });

  // Define table columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "Job ID", width: 120 },
    { field: "jobType", headerName: "Job Type", width: 150 },
    { field: "assignedTo", headerName: "Assigned To", width: 200 },
    { field: "address", headerName: "Address", width: 250 },
    { field: "phoneNumber", headerName: "Phone Number", width: 180 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleModify(params.row)}>
          Modify
        </Button>
      ),
    },
  ];

  return (
    <>
      
      <Button variant="contained" onClick={handleCreateJob} style={{ marginBottom: 10 }}>
        All the Jobs
      </Button>

      {/* ✅ Jobs Information Table Heading */}
      <Typography variant="h6" style={{ marginBottom: 10, textAlign: "center", fontWeight: "bold" }}>
        Jobs Information Table
      </Typography>

      <DataGrid rows={jobs} columns={columns} pageSizeOptions={[10]} disableRowSelectionOnClick />

      {/* Modify Job Dialog - Adjusted Margins */}
      <Dialog open={openModifyDialog} onClose={() => setOpenModifyDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle style={{ marginBottom: "10px" }}>Modify Job</DialogTitle>
        <DialogContent style={{ minHeight: "420px", paddingTop: "10px" }}> {/*  Taller Window */}
          <Box sx={{ marginBottom: "10px" }}> {/*  Added spacing for better visibility */}
            <TextField fullWidth label="Assigned To" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <TextField fullWidth label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <TextField fullWidth label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))} />
          </Box>

          <Typography style={{ marginTop: 10 }}>Job Status:</Typography>
          <Box display="flex" justifyContent="space-between" sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              sx={getStatusButtonStyle("Assigned")}
              onClick={() => setStatus("Assigned")}
            >
              Assigned
            </Button>
            <Button
              variant="contained"
              sx={getStatusButtonStyle("Work in Progress")}
              onClick={() => setStatus("Work in Progress")}
            >
              Work in Progress
            </Button>
            <Button
              variant="contained"
              sx={getStatusButtonStyle("Completed")}
              onClick={() => setStatus("Completed")}
            >
              Completed
            </Button>
            <Button
              variant="contained"
              sx={getStatusButtonStyle("Cancelled")}
              onClick={() => setStatus("Cancelled")}
            >
              Cancelled
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModifyDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateJob}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
