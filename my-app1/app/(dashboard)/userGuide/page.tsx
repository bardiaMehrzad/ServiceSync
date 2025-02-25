"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // For checklist items
import HelpIcon from "@mui/icons-material/Help"; // For guide icon
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

export default function UserGuidePage() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, p: 4, bgcolor: "background.default" }}>

        <Grid container spacing={4} justifyContent="center">
          {/* Calendar Guide Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 2,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: "text.primary", fontWeight: "bold" }}
                >
                  <HelpIcon sx={{ mr: 1, verticalAlign: "middle", color: theme.palette.primary.main }} />
                  Using the Calendar
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
                  The Calendar allows you to manage events related to your services. Follow these steps to get started:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Add a New Event"
                      secondary="Click the 'Add New Task' button to open a dialog. Enter a title, description, and start/end dates. Submit to save the event to the calendar database."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="View Events"
                      secondary="Events appear on the calendar as entries in a month-view format with a day grid layout. Click an event to modify or delete it."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Modify or Delete Events"
                      secondary="Click an event on the calendar to open a dialog for editing its details (title, description, dates) or deleting it. Confirm changes or deletion in the respective dialogs."
                    />
                  </ListItem>
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, borderRadius: 1 }}
                  href="/calendar" // Link to the Calendar page
                >
                  Go to Calendar
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Jobs Table Guide Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 2,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: "text.primary", fontWeight: "bold" }}
                >
                  <HelpIcon sx={{ mr: 1, verticalAlign: "middle", color: theme.palette.primary.main }} />
                  Using the Jobs Table
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
                  The Jobs Table helps you manage job assignments and statuses. Here’s how to use it:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Create a New Job"
                      secondary="Click 'Create a new job' to open a dialog. Enter job type, assigned person, address, phone number, and status (Assigned, Work in Progress, Completed, or Cancelled). Submit to save to the jobs database."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="View and Modify Jobs"
                      secondary="Browse the job list in the DataGrid table. Click 'Modify' on any row to open a dialog, update details, and save changes. Statuses are color-coded for easy identification."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Track Status"
                      secondary="Jobs statuses are visually distinct with colors: French Gray (Assigned), Yellow (Work in Progress), Green (Completed), Red (Cancelled). Update status via the modify dialog."
                    />
                  </ListItem>
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, borderRadius: 1 }}
                  href="/jobs" // Link to the Jobs Table page
                >
                  Go to Jobs Table
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}