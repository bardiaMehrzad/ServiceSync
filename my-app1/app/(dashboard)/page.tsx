"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Loader from "./Loader"; // Ensure this path is correct
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/navigation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useTheme } from "@mui/material/styles";
import { AdminPanelSettingsRounded, EditCalendarRounded, ReceiptLongRounded, WorkHistoryOutlined } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const router = useRouter();
  const theme = useTheme(); // Access the current theme
  const { data: session } = useSession();

  // Hardcoded user data for testing
  const user = {
    name: session?.user?.name,
    role: session?.user?.id, // Example role/status
    avatar: session?.user?.image, // Placeholder image URL for avatar (replace with actual image or dynamic URL)
  };

  // Simulate loading delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Display loader while loading
  if (isLoading) {
    return <Loader size={60} color={theme.palette.primary.main} />; // Use theme primary color for loader
  }

  // Card data with icons
  const cards = [
    { title: "Calendar", route: "/calendar", icon: <EditCalendarRounded /> },
    { title: "Jobs", route: "/jobs", icon: <WorkHistoryOutlined /> },
    { title: "Modify Employees", route: "/eManagement", icon: <AdminPanelSettingsRounded /> },
    { title: "Payroll", route: "/payroll", icon: <ReceiptLongRounded /> },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 4, bgcolor: "background.default" }}>
        {/* Enhanced Welcome Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            mb: 6,
            p: 2,
            bgcolor: "background.paper", // Light background for contrast
            borderRadius: 2,
            boxShadow: 1, // Subtle shadow for depth
          }}
        >
          <Avatar
            src={user.avatar || "Hey"}
            alt={user.name || "Hey"}
            sx={{ width: 60, height: 60 }}
          />
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "text.primary", fontWeight: "bold" }}
            >
              Welcome, {user.name}!
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", mt: 0.5 }}
            >
              {user.role} | Roroman Plumbing {/* Example status/details */}
            </Typography>
          </Box>
        </Box>

      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} key={card.title}>
            <Card
              sx={{
                height: 200,
                borderRadius: 3, // Rounded corners
                boxShadow: 3, // Soft shadow for depth
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth transition
                "&:hover": {
                  transform: "translateY(-5px)", // Slight lift on hover
                  boxShadow: 6, // Stronger shadow on hover
                },
              }}
            >
              <CardActionArea
                onClick={() => router.push(card.route)}
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  {React.cloneElement(card.icon, {
                    sx: {
                      fontSize: 60,
                      mb: 2,
                      color: theme.palette.primary.main, // Use theme primary color for icons
                    },
                  })}
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "medium",
                      color: theme.palette.text.primary, // Use theme text primary color
                    }}
                  >
                    {card.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}