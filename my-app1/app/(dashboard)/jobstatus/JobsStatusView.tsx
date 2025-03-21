"use client";
import * as React from "react";
import { DataSnapshot, ref, onValue, off } from "firebase/database";
import { db } from "../jobs/lib/firebase";
import { format } from "date-fns";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import AssignmentIcon from "@mui/icons-material/Assignment"; // Icon for Assigned Jobs
import BuildIcon from "@mui/icons-material/Build"; // Icon for Work in Progress Jobs
import dynamic from "next/dynamic";

const JobsStatusView = dynamic(() => Promise.resolve(React.memo(function JobsStatusViewContent() {
  const [jobs, setJobs] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const mountedRef = React.useRef(false);

  React.useEffect(() => {
    mountedRef.current = true;
    const jobsRef = ref(db, "jobs");

    const handleJobsSnapshot = (snapshot: DataSnapshot) => {
      if (!mountedRef.current) return;
      const data = snapshot.val();
      const jobList = data
        ? Object.entries(data).map(([id, job]) => ({ id, ...(job as object) }))
        : [];
      if (mountedRef.current) {
        setJobs(jobList);
        if (isLoading) setIsLoading(false);
      }
    };

    onValue(jobsRef, handleJobsSnapshot);

    return () => {
      mountedRef.current = false;
      off(jobsRef, "value", handleJobsSnapshot);
    };
  }, [isLoading]);

  const commonColumns: GridColDef[] = React.useMemo(
    () => [
      { field: "id", headerName: "Job ID", flex: 1, minWidth: 100 },
      { field: "assignedTo", headerName: "Assigned To", flex: 1, minWidth: 150 },
      {
        field: "dateTime",
        headerName: "Date",
        flex: 1,
        minWidth: 200,
        renderCell: (params) => {
          const date = new Date(params.value);
          return isNaN(date.getTime()) ? (
            <span>Invalid Date</span>
          ) : (
            <span>{format(date, "MMM dd, yyyy hh:mm a")}</span>
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 120,
        renderCell: (params) => {
          const statusValue = params.value as string;
          const [backgroundColor, textColor] =
            statusValue === "Assigned"
              ? ["#BFC1CD", "#fff"]
              : statusValue === "Work in Progress"
                ? ["#ff9800", "#fff"]
                : ["#fff", "#000"];
          return (
            <span
              style={{
                backgroundColor,
                color: textColor,
                padding: "2px 15px",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "0.70rem",
              }}
            >
              {statusValue}
            </span>
          );
        },
      },
    ],
    []
  );

  const assignedJobs = React.useMemo(
    () => jobs.filter((job) => job.status === "Assigned"),
    [jobs]
  );

  const inProgressJobs = React.useMemo(
    () => jobs.filter((job) => job.status === "Work in Progress"),
    [jobs]
  );

  if (isLoading) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#1c1c1c" }}>
      <Typography sx={{ color: "#fff", fontSize: "1rem" }}>
        Loading...
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 2, minHeight: "100vh" }}>
      {/* Assigned Jobs Section */}
      <Card
        sx={{
          backgroundColor: "#1c1c1c",
          border: "1px solid #333",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardHeader
          avatar={<AssignmentIcon sx={{ color: "#BFC1CD" }} />}
          title={
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
              Assigned ({assignedJobs.length})
            </Typography>
          }
          sx={{
            backgroundColor: "rgba(191, 193, 205, 0.1)", // Subtle background using Assigned color
            borderBottom: "1px solid #333",
          }}
        />
        <CardContent>
          <DataGrid
            rows={assignedJobs}
            columns={commonColumns}
            getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            sx={(theme) => ({
              backgroundColor: "#1c1c1c",
              borderColor: theme.palette.mode === "dark" ? "#333" : "#e0e0e0",
              "& .MuiDataGrid-cell": { borderColor: theme.palette.mode === "dark" ? "#333" : "#e0e0e0", color: "#fff" },
              "& .MuiDataGrid-columnHeaders": { backgroundColor: "#2c2c2c", borderColor: "#333" },
              "& .MuiDataGrid-footerContainer": { color: "#fff", borderColor: "#333" },
            })}
            pageSizeOptions={[5]}
            disableColumnResize
            density="compact"
            getRowId={(row) => row.id}
            autoHeight
          />
        </CardContent>
      </Card>

      {/* Work in Progress Jobs Section */}
      <Card
        sx={{
          backgroundColor: "#1c1c1c",
          border: "1px solid #333",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardHeader
          avatar={<BuildIcon sx={{ color: "#ff9800" }} />}
          title={
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
              Work in Progress ({inProgressJobs.length})
            </Typography>
          }
          sx={{
            backgroundColor: "rgba(255, 152, 0, 0.1)", // Subtle background using Work in Progress color
            borderBottom: "1px solid #333",
          }}
        />
        <CardContent>
          <DataGrid
            rows={inProgressJobs}
            columns={commonColumns}
            getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            sx={(theme) => ({
              backgroundColor: "#1c1c1c",
              borderColor: theme.palette.mode === "dark" ? "#333" : "#e0e0e0",
              "& .MuiDataGrid-cell": { borderColor: theme.palette.mode === "dark" ? "#333" : "#e0e0e0", color: "#fff" },
              "& .MuiDataGrid-columnHeaders": { backgroundColor: "#2c2c2c", borderColor: "#333" },
              "& .MuiDataGrid-footerContainer": { color: "#fff", borderColor: "#333" },
            })}
            pageSizeOptions={[5]}
            disableColumnResize
            density="compact"
            getRowId={(row) => row.id}
            autoHeight
          />
        </CardContent>
      </Card>
    </Box>
  );
})), { ssr: false });

export default JobsStatusView;