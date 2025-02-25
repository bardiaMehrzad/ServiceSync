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
import { TextareaAutosize } from "@mui/material";

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
          ...(job as object),
        }));
        setJobs(jobList);
      } else {
        setJobs([]);
      }
    });
  }, []);

  // Format phone number as (XXX) XXX-XXXX
  const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/\D/g, "");
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
    const newJob = { jobType, assignedTo, address, phoneNumber, status };

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
      setOpenModifyDialog(false);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  // Define button styles based on selection (for dialog)
  const getStatusButtonStyle = (buttonStatus: string) => ({
    backgroundColor:
      status === buttonStatus
        ? "#333"
        : buttonStatus === "Assigned"
        ? "#BFC1CD" // French Gray
        : buttonStatus === "Work in Progress"
        ? "#ff9800" // Yellow
        : buttonStatus === "Completed"
        ? "#4caf50" // Green
        : "#f44336", // Red
    color: "#fff",
    fontWeight: status === buttonStatus ? "bold" : "normal",
    borderRadius: "2px", // Reduced border radius for smaller, sharper corners
    padding: "2px 6px", // Reduced padding for smaller size
    fontSize: "0.75rem", // Optional: smaller text for compactness
  });

  // Define table columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "Job ID", width: 150 },
    { field: "jobType", headerName: "Job Type", width: 200 },
    { field: "assignedTo", headerName: "Assigned To", width: 150 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const statusValue = params.value as string;
        let backgroundColor, textColor;
        switch (statusValue) {
          case "Assigned":
            backgroundColor = "#BFC1CD"; 
            textColor = "#fff";
            break;
          case "Work in Progress":
            backgroundColor = "#ff9800";
            textColor = "#fff";
            break;
          case "Completed":
            backgroundColor = "#4caf50"; 
            textColor = "#fff";
            break;
          case "Cancelled":
            backgroundColor = "#f44336"; 
            textColor = "#fff";
            break;
          default:
            backgroundColor = "#fff";
            textColor = "#000";
        }

        const statusStyle = {
          backgroundColor,
          color: textColor,
          padding: "2px 15px", // Reduced padding for smaller size
          borderRadius: "2px", // Reduced border radius for smaller, sharper corners
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          fontWeight:  "bold" ,
          fontSize: "0.70rem", // Optional: smaller text for compactness
        };
        
        return <span style={statusStyle}>{statusValue}</span>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleModify(params.row)}
          sx={{
            borderRadius: "2px", // Reduced border radius for smaller, sharper corners
            padding: "2px 6px", // Reduced padding for smaller size
            fontSize: "0.75rem", // Optional: smaller text for compactness
            minWidth: "60px", // Ensure the button isn’t too narrow
          }}
        >
          Modify
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button variant="contained" color="primary" onClick={handleCreateJob} sx={{ mb: 2 }}>
        Create a new job
      </Button>

     

      <DataGrid
        checkboxSelection
        rows={jobs}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        sx={(theme) => ({
          backgroundColor: "#1c1c1c", // Dark background like the image
          borderColor: theme.palette.mode === "dark" ? "#333" : "#e0e0e0",
          "& .MuiDataGrid-cell": {
            borderColor: theme.palette.mode === "dark" ? "#333" : "#e0e0e0",
            color: "#fff", // Light text for dark mode
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#2c2c2c", // Darker header background
            
            borderColor: "#333",
          },
          "& .MuiDataGrid-footerContainer": {
        
            color: "#fff",
            borderColor: "#333",
          },
          "& .MuiCheckbox-root": {
        
          },
        })}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: { variant: "outlined", size: "small" },
              columnInputProps: { variant: "outlined", size: "small", sx: { mt: "auto" } },
              operatorInputProps: { variant: "outlined", size: "small", sx: { mt: "auto" } },
              valueInputProps: {
                InputComponentProps: { variant: "outlined", size: "small" },
              },
            },
          },
        }}
      />

      {/* Modify Job Dialog */}
      <Dialog
        open={openModifyDialog}
        onClose={() => setOpenModifyDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ style: { backgroundColor: "#2c2c2c", color: "#fff" } }} // Dark theme for dialog
      >
        <DialogTitle sx={{ mb: "2px", color: "#fff" }}>Modify Job</DialogTitle>
        <DialogContent sx={{ minHeight: "420px", pt: "10px", backgroundColor: "#2c2c2c", color: "#fff" }}>
          <Box sx={{ mt: "30px" }}>
            <TextField
              fullWidth
              label="Assigned To"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              variant="outlined"
              InputProps={{ style: { color: "#fff", backgroundColor: "#1c1c1c" } }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          </Box>
          <Box sx={{ mt: "30px" }}>
            <TextField
              fullWidth
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
              InputProps={{ style: { color: "#fff", backgroundColor: "#1c1c1c" } }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          </Box>
          <Box sx={{ mt: "30px" }}>
            <TextField
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
              variant="outlined"
              InputProps={{ style: { color: "#fff", backgroundColor: "#1c1c1c" } }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          </Box>

          <Typography sx={{ mt: "30px", color: "#fff" }}>Job Status:</Typography>
          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
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
        <DialogActions sx={{ backgroundColor: "#2c2c2c", color: "#fff" }}>
          <Button onClick={() => setOpenModifyDialog(false)} sx={{ color: "#fff" }}>
            Cancel
          </Button>
          <Button onClick={handleUpdateJob} sx={{ color: "#fff" }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Job Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ style: { backgroundColor: "#2c2c2c", color: "#fff" } }} // Dark theme for dialog
      >
        <DialogTitle sx={{ mb: "10px", color: "#fff" }}>Create Job</DialogTitle>
        <DialogContent sx={{ minHeight: "420px", pt: "10px", backgroundColor: "#2c2c2c", color: "#fff" }}>
          <Box sx={{ mt: "15px" }}>
            <TextField
              fullWidth
              label="Job Type"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              variant="outlined"
              InputProps={{ style: { color: "#fff", backgroundColor: "#1c1c1c" } }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          </Box>
          <Box sx={{ mt: "15px" }}>
            <TextField
              fullWidth
              label="Assigned To"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              variant="outlined"
              InputProps={{ style: { color: "#fff", backgroundColor: "#1c1c1c" } }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          </Box>
          <Box sx={{ mt: "15px" }}>
            <TextField
              fullWidth
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
              InputProps={{ style: { color: "#fff", backgroundColor: "#1c1c1c" } }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          </Box>
          <Box sx={{ mt: "15px" }}>
            <TextField
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
              variant="outlined"
              InputProps={{ style: { color: "#fff", backgroundColor: "#1c1c1c" } }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          </Box>

          <Typography sx={{ mt: "15px", color: "#fff" }}>Job Status:</Typography>
          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
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
        <DialogActions sx={{ backgroundColor: "#2c2c2c", color: "#fff" }}>
          <Button onClick={() => setOpenCreateDialog(false)} sx={{ color: "#fff" }}>
            Cancel
          </Button>
          <Button onClick={handleSubmitJob} sx={{ color: "#fff" }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}