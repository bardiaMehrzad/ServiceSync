"use client"; // Ensures this is a Client Component

import * as React from "react";
import Typography from "@mui/material/Typography";
import JobsTable from "./JobsTable";
import CreateJobDialog from "./CreateJobDialog";
import Button from "@mui/material/Button";

export default function JobsPage() {
  // State to control the Create Job Dialog
  const [open, setOpen] = React.useState(false);

  // Function to open the dialog
  const handleOpen = () => setOpen(true);

  // Function to close the dialog
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Page Header */}
   


      {/* Jobs Table */}
      <JobsTable />

      
      {/* Create Job Dialog */}
      <CreateJobDialog open={open} onClose={handleClose} />
    </>
  );
}
