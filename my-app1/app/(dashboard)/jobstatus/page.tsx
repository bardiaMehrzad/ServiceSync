"use client"; // Ensures this is a Client Component

import * as React from "react";
import Typography from "@mui/material/Typography";
import JobsStatusView from "./JobsStatusView";
import Button from "@mui/material/Button";
import Loader from "../Loader";
import theme from "@/theme";

export default function JobsStatusPage() {
  // State to control the Create Job Dialog
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Display loader while loading
  if (isLoading) {
    return <Loader size={60} color={theme.palette.primary.main} />; // Use theme primary color for loader
  }
 

  return (
    <>
      {/* Jobs Table */}
      <JobsStatusView />
    </>
  );
}
