"use client";
import React, { useState, useMemo } from "react";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  Grid,
  Paper,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Snackbar,
  Alert,
  Popover,
  CircularProgress,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Today as TodayIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useEffect } from "react";
import Link from "next/link";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import axios from "axios";

const YearMonthCalendar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Hover popover state
  const [hoverAnchor, setHoverAnchor] = useState(null);
  const [hoverEventData, setHoverEventData] = useState(null);

  const years = Array.from({ length: 10 }, (_, i) => 2023 + i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const url =
    "https://script.google.com/macros/s/AKfycbwFvUatoX473y5G-LazhDuZUYOv7BtrukfihmTjEoM4gZNaWbIecIULlHmpkfhRd-9b/exec";

  const today = new Date();
  const [Events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(months[today.getMonth()]);
  const [openModal, setOpenModal] = useState(false);
  const [newEventStartDate, setNewEventStartDate] = useState("");
  const [newEventStartTime, setNewEventStartTime] = useState("10:00");
  const [newEventEndDate, setNewEventEndDate] = useState("");
  const [newEventEndTime, setNewEventEndTime] = useState("18:00");
  const [newEventTitle, setNewEventTitle] = useState("Marriage");
  const [customEvents, setCustomEvents] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("TTV");
  const [loading, setLoading] = useState(true);
const [newEventPersonName, setNewEventPersonName] = useState("");
const [newEventMobileNumber, setNewEventMobileNumber] = useState("");
// Update the normalizeTime function to handle the date format properly
const normalizeTime = (value) => {
  if (!value) return "";
  try {
    const d = new Date(value);
    // Extract hours and minutes from the ISO string
    const hours = d.getUTCHours();
    const minutes = d.getUTCMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } catch {
    return "";
  }
};


useEffect(() => {
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}?t=${Date.now()}`);
      const data = res.data;   // axios auto-parses JSON

      if (data.status === "success") {
        const normalized = data.data.map((ev) => ({
          id: ev.ID,
          title: ev.Title,
          startDate: ev["Start Date"],
          endDate: ev["End Date"],
          startTime: ev["Start Time"],
          endTime: ev["End Time"],
          mahal: ev.Mahal,
          personName: ev["Person Name"] || "",
          mobileNumber: ev["Mobile Number"] || "",
        }));
        setCustomEvents(normalized);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, []);




  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Hover handlers
  const handleMouseEnter = (event, dayData) => {
    if (dayData.events.length > 0) {
      setHoverAnchor(event.currentTarget);
      setHoverEventData(dayData);
    }
  };

  const handleMouseLeave = () => {
    setHoverAnchor(null);
    setHoverEventData(null);
  };

  // Format date and time for display
// Update the formatDateTime function for the popover
const formatDateTime = (dateString, timeString = "") => {
  if (!dateString) return "";

  try {
    let date = new Date(dateString);
    
    // Format date
    const dateOptions = { 
      year: "numeric", 
      month: "short", 
      day: "numeric",
      timeZone: "Asia/Kolkata"
    };
    
    let formattedDate = date.toLocaleDateString("en-IN", dateOptions);
    
    // Add time if provided
    if (timeString && timeString !== "undefined:undefined") {
      return `${formattedDate} at ${timeString}`;
    }
    
    return formattedDate;
  } catch (err) {
    console.error("Invalid date/time:", dateString, timeString);
    return "";
  }
};

  // Sample events data combined with custom events
  const events = useMemo(() => {
    // Filter custom events for the current month and year
    const filteredCustomEvents = customEvents.filter((event) => {
      console.log("event:", event);

      const eventDate = new Date(
        event.date || event.Date || event.startDate || event.StartDate
      );
      return (
        eventDate.getFullYear() === selectedYear &&
        eventDate.getMonth() === months.indexOf(selectedMonth)
      );
    });

    return [...filteredCustomEvents];
  }, [selectedYear, selectedMonth, customEvents]);

  const monthIndex = months.indexOf(selectedMonth);
  const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();

  // Navigation functions
  const goToPreviousMonth = () => {
    if (monthIndex === 0) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(months[11]);
    } else {
      setSelectedMonth(months[monthIndex - 1]);
    }
  };

  const goToNextMonth = () => {
    if (monthIndex === 11) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(months[0]);
    } else {
      setSelectedMonth(months[monthIndex + 1]);
    }
  };

  const goToToday = () => {
    setSelectedYear(today.getFullYear());
    setSelectedMonth(months[today.getMonth()]);
  };

  // Handle modal operations
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewEventStartDate("");
    setNewEventStartTime("10:00");
    setNewEventEndDate("");
    setNewEventEndTime("18:00");
    setNewEventTitle("");
  };

const handleAddEvent = async () => {
  const payload = {
    id: `event_${Date.now()}`,
    title: newEventTitle,
    startDate: newEventStartDate,
    endDate: newEventEndDate || newEventStartDate,
    startTime: newEventStartTime,
    endTime: newEventEndTime || newEventStartTime,
    mahal: dropdownValue,
    personName: newEventPersonName,
    mobileNumber: newEventMobileNumber,
  };

  try {
    const response = await axios.post(url, payload, {
      mode: "no-cors",
      headers: { "Content-Type": "application/json" }
    });
    console.log("Add result:", response.data);
  } catch (err) {
    console.error("Add error:", err);
  }
};



const handleDeleteEvent = async (eventId) => {
  try {
    const response = await axios.post(
      url,
      { action: "delete", id: eventId },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data.status === "success") {
      await fetchEvents();
      showSnackbar("Event deleted successfully!", "success");
    } else {
      showSnackbar(response.data.message || "Failed to delete event!", "error");
    }
  } catch (err) {
    console.error("Delete error:", err);
    showSnackbar("Error deleting event!", "error");
  }
};




const isDateInRange = (date, startDate, endDate, startTime, endTime) => {
  const cellDate = new Date(date);
  cellDate.setHours(0, 0, 0, 0);
  
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date(startDate);
  
  // Reset to start of day for comparison
  const startDay = new Date(start);
  startDay.setHours(0, 0, 0, 0);
  
  const endDay = new Date(end);
  endDay.setHours(23, 59, 59, 999);
  
  return cellDate >= startDay && cellDate <= endDay;
};

  // Build calendar grid with only actual days
  const calendarDays = useMemo(() => {
    const days = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(selectedYear, monthIndex, d);
      const dayOfWeek = date.getDay();

      // 🔹 Instead of filtering by "exact date", check date ranges
      const dayEvents = events.filter((event) => {
        const { startDate, endDate, startTime, endTime } = event;
        return isDateInRange(date, startDate, endDate, startTime, endTime);
      });

      let topColor = "transparent";
      let bottomColor = "transparent";

      if (dayEvents.length > 0) {
        const hasTTV = dayEvents.some(
          (event) => (event.mahal || event.Mahal) === "TTV"
        );
        const hasSMSH = dayEvents.some(
          (event) => (event.mahal || event.Mahal) === "SMSH"
        );

        if (hasTTV && hasSMSH) {
          // Both booked
          topColor = "#ff4444"; // Red
          bottomColor = "#44ff44"; // Green
        } else if (hasTTV) {
          topColor = "#ff4444";
          bottomColor = "#ff4444"; // 🔥 fill full cell
        } else if (hasSMSH) {
          topColor = "#44ff44";
          bottomColor = "#44ff44"; // 🔥 fill full cell
        }
      }

      days.push({
        day: d,
        dayOfWeek,
        events: dayEvents,
        topColor,
        bottomColor,
      });
    }

    return days;
  }, [selectedYear, selectedMonth, events, daysInMonth, monthIndex]);

  // Separate calendar data for each Mahal
  // TTV Calendar (only TTV events)
 const ttvCalendarDays = calendarDays.map((day) => {
  const ttvEvents = day.events.filter(
    (event) => {
      const eventMahal = event.mahal || event.Mahal || "";
      return eventMahal === "Thirumal Thirumagal Vasanth Mahal A/C" || eventMahal === "TTV";
    }
  );

  return {
    ...day,
    events: ttvEvents,
    topColor: ttvEvents.length > 0 ? "#44ff44" : "transparent",
    bottomColor: "transparent",
  };
});

  // SSMH Calendar (only SSMH events)
  const ssmhCalendarDays = calendarDays.map((day) => {
  const ssmhEvents = day.events.filter(
    (event) => {
      const eventMahal = event.mahal || event.Mahal || "";
      return eventMahal === "Shri Meenakshi Sundarar Hall A/C" || eventMahal === "SMSH";
    }
  );

  return {
    ...day,
    events: ssmhEvents,
    topColor: ssmhEvents.length > 0 ? "#44ff44" : "transparent",
    bottomColor: "transparent",
  };
});

  // Weekday headers
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <Box
        sx={{
          maxWidth: "100%",
          fontFamily: "'Inter', 'Roboto', sans-serif",
          backgroundImage: "url('/reception.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            <CircularProgress color="inherit" size={50} />
          </Box>
        ) : (
          <Box
            sx={{
              p: { xs: 1, sm: 2, md: 3 },
              maxWidth: 1200,
              mx: "auto",
              mt: { xs: 10, sm: 8, md: 10 },
              fontFamily: "'Inter', 'Roboto', sans-serif",
            }}
          >
            {/* Header with navigation */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
                mb: 3,
                gap: 2,
              }}
            >
              {/* Title on top for mobile */}
              <Typography
                color="white"
                variant={isMobile ? "h5" : isTablet ? "h3" : "h3"}
                fontWeight={700}
                gutterBottom
              >
                Booked Event Calendar
              </Typography>

              {/* Bottom section = nav + filters */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* Left = navigation buttons */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={goToPreviousMonth}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": { backgroundColor: "primary.dark" },
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>

                  <IconButton
                    onClick={goToToday}
                    sx={{
                      backgroundColor: "grey.200",
                      color: "text.primary",
                      "&:hover": { backgroundColor: "grey.300" },
                    }}
                  >
                    <TodayIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    onClick={goToNextMonth}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": { backgroundColor: "primary.dark" },
                    }}
                  >
                    <ChevronRight />
                  </IconButton>
                </Box>

                {/* Right = filters */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "row", sm: "row" },
                    width: { xs: "auto", sm: "auto" },
                  }}
                >
                  <Select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    fullWidth={isMobile}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      minWidth: { xs: 100, sm: 120 },
                      color: "yellow",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "& .MuiSvgIcon-root": { color: "white" },
                      "& .MuiSelect-select": { py: isMobile ? 1 : 1.5 },
                    }}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>

                  <Select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    fullWidth={isMobile}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      minWidth: { xs: 120, sm: 140 },
                      color: "yellow",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "& .MuiSvgIcon-root": { color: "white" },
                      "& .MuiSelect-select": { py: isMobile ? 1 : 1.5 },
                    }}
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>

                  {/* Add Event Button */}
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenModal}
                    sx={{
                      backgroundColor: "secondary.main",
                      "&:hover": { backgroundColor: "secondary.dark" },
                    }}
                  >
                    {isMobile ? "Add" : "Add Event"}
                  </Button>
                </Box>
              </Box>
            </Box>
            {/* // Calendar */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                },
                gap: 10,
              }}
            >
              {/* ttv hall */}

              <Box
                sx={{
                  borderRadius: "10px",
                  padding: { xs: 2, sm: 3, md: 4 },
                  boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(30px)",
                }}
              >
                {/* Month-Year Heading */}
                <Box
                  sx={{
                    p: { xs: 1, sm: 2 },
                    borderRadius: 3,
                    textAlign: "center",
                    background:
                      "linear-gradient(90deg,rgba(255, 140, 140, 1) 54%, rgba(252, 176, 69, 1) 100%)",
                    color: "white",
                    mb: 3,
                    boxShadow: "0px 4px 15px rgba(25, 118, 210, 0.3)",
                  }}
                >
                  <Typography
                    variant={isMobile ? "h5" : isTablet ? "h4" : "h4"}
                    fontWeight={600}
                    sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
                  >
                    {selectedMonth} {selectedYear}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  textAlign={"center"}
                  sx={{ mb: 2 }}
                  color="white"
                >
                  Thirumal Thirumagal Vasanth Mahal A/C
                </Typography>

                {/* Calendar Grid */}
                <Grid container spacing={1} columns={7}>
                  {ttvCalendarDays.map((dayData, i) => {
                    const isToday =
                      dayData &&
                      selectedYear === today.getFullYear() &&
                      monthIndex === today.getMonth() &&
                      dayData.day === today.getDate();

                    // Determine background based on TTV/SMSH events

                    return (
                      <Grid
                        item
                        xs={1}
                        key={i}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Paper
                          elevation={2}
                          onMouseEnter={(e) => handleMouseEnter(e, dayData)}
                          onMouseLeave={handleMouseLeave}
                          sx={{
                            height: {
                              xs: 45,
                              sm: 70,
                              md: 80,
                            },
                            width: {
                              xs: 40,
                              sm: 70,
                              md: 80,
                            },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            p: { xs: 0.5, sm: 1 },
                            borderRadius: "12px",
                            // background: background,
                            color:
                              isToday ||
                              dayData.topColor !== "transparent" ||
                              dayData.bottomColor !== "transparent"
                                ? "white"
                                : "text.primary",
                            border: isToday ? "2px solid" : "1px solid",
                            borderColor: isToday ? "primary.dark" : "grey.200",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                              cursor:
                                dayData.events.length > 0
                                  ? "pointer"
                                  : "default",
                            },
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          {/* Color indicators for TTV/SMSH */}
{dayData.events.map((event, idx) => {
  const cellDate = new Date(selectedYear, monthIndex, dayData.day);
  cellDate.setHours(0, 0, 0, 0);

  const start = new Date(event.startDate);
  const end = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
  
  // Reset times to compare dates only
  const startDay = new Date(start);
  startDay.setHours(0, 0, 0, 0);
  
  const endDay = new Date(end);
  endDay.setHours(0, 0, 0, 0);

  const color = "#44ff44"; // Green for booked

  // Check if cell date is within the event date range
  if (cellDate >= startDay && cellDate <= endDay) {
    // Parse times from the normalized format
    const startTime = event.startTime || "00:00";
    const endTime = event.endTime || "23:59";
    
    const [sh, sm] = startTime.split(":");
    const [eh, em] = endTime.split(":");
    
    const startHour = parseInt(sh, 10);
    const endHour = parseInt(eh, 10);

    // For same day events
    if (startDay.getTime() === endDay.getTime() && cellDate.getTime() === startDay.getTime()) {
      // Full day or spanning morning to evening
      if ((startHour <= 6 && endHour >= 18) || (startTime === "00:00" && endTime === "23:59")) {
        return (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: color,
              opacity: 0.9,
            }}
          />
        );
      }
      // Morning only
      else if (endHour <= 12) {
        return (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              backgroundColor: color,
              opacity: 0.9,
            }}
          />
        );
      }
      // Afternoon only
      else if (startHour >= 12) {
        return (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              backgroundColor: color,
              opacity: 0.9,
            }}
          />
        );
      }
      // Default: full cell
      else {
        return (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: color,
              opacity: 0.9,
            }}
          />
        );
      }
    }
    // Multi-day events
    else {
      // First day of event
      if (cellDate.getTime() === startDay.getTime()) {
        if (startHour >= 12) {
          return (
            <Box
              key={idx}
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50%",
                backgroundColor: color,
                opacity: 0.9,
              }}
            />
          );
        } else {
          return (
            <Box
              key={idx}
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: color,
                opacity: 0.9,
              }}
            />
          );
        }
      }
      // Last day of event
      else if (cellDate.getTime() === endDay.getTime()) {
        if (endHour <= 12) {
          return (
            <Box
              key={idx}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "50%",
                backgroundColor: color,
                opacity: 0.9,
              }}
            />
          );
        } else {
          return (
            <Box
              key={idx}
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: color,
                opacity: 0.9,
              }}
            />
          );
        }
      }
      // Middle days - full coverage
      else {
        return (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: color,
              opacity: 0.9,
            }}
          />
        );
      }
    }
  }

  return null;
})}


                          {/* Top Section (Day + Weekday) */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                              position: "relative",
                              zIndex: 2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: isToday ? 700 : 600,
                                fontSize: {
                                  xs: "0.75rem",
                                  sm: "0.875rem",
                                  md: "1rem",
                                },
                                textShadow:
                                  dayData.topColor !== "transparent" ||
                                  dayData.bottomColor !== "transparent"
                                    ? "1px 1px 2px rgba(0,0,0,0.5)"
                                    : "none",
                              }}
                            >
                              {dayData.day}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 500,
                                color:
                                  isToday ||
                                  dayData.topColor !== "transparent" ||
                                  dayData.bottomColor !== "transparent"
                                    ? "black"
                                    : "text.secondary",
                                fontSize: {
                                  xs: "0.55rem",
                                  sm: "0.6rem",
                                  md: "0.7rem",
                                },
                                textShadow:
                                  dayData.topColor !== "transparent" ||
                                  dayData.bottomColor !== "transparent"
                                    ? "1px 1px 1px rgba(0,0,0,0.5)"
                                    : "none",
                              }}
                            >
                              {weekdays[dayData.dayOfWeek]}
                            </Typography>
                          </Box>

                          {/* Events indicator dot */}
                          {dayData.events.length > 0 && (
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 4,
                                right: 4,
                                zIndex: 2,
                                display: "flex",
                                gap: 0.5,
                              }}
                            >
                              {dayData.events.map((event, idx) => (
                                <Box
                                  key={idx}
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    backgroundColor:
                                      (event.mahal || event.Mahal) === "TTV"
                                        ? "#ff4444ff"
                                        : "#ff4444ff",
                                    border: "1px solid black",
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Legend */}
                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: "#44ff44",
                        borderRadius: 1,
                      }}
                    />
                    <Typography variant="body2" color="white">
                      Thirumal Thirumagal Vasanth Mahal Booked
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        background:
                          "linear-gradient(to bottom, #ffffffff 50%, #ffffffff 50%)",
                        borderRadius: 1,
                      }}
                    />
                    <Typography variant="body2" color="white">
                      Not Booked
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor:
                          (event.mahal || event.Mahal) === "SMSH"
                            ? "#ff4444ff"
                            : "#ff0a0aff",
                        border: "1px solid black",
                      }}
                    />
                    <Typography variant="body2" color="white">
                      Total Events on day
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* ssmh Mahal */}

              <Box
                sx={{
                  borderRadius: "10px",
                  padding: { xs: 2, sm: 3, md: 4 },
                  boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(30px)",
                }}
              >
                {/* Month-Year Heading */}
                <Box
                  sx={{
                    p: { xs: 1, sm: 2 },
                    borderRadius: 3,
                    textAlign: "center",
                    background:
                      "linear-gradient(90deg,rgba(255, 140, 140, 1) 54%, rgba(252, 176, 69, 1) 100%)",
                    color: "white",
                    mb: 3,
                    boxShadow: "0px 4px 15px rgba(25, 118, 210, 0.3)",
                  }}
                >
                  <Typography
                    variant={isMobile ? "h5" : isTablet ? "h4" : "h4"}
                    fontWeight={600}
                    sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
                  >
                    {selectedMonth} {selectedYear}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  textAlign={"center"}
                  sx={{ mb: 2 }}
                  color="white"
                >
                  Shri Meenakshi Sundarar Hall A/C
                </Typography>

                {/* Calendar Grid */}
                <Grid container spacing={1} columns={7}>
                  {ssmhCalendarDays.map((dayData, i) => {
                    const isToday =
                      dayData &&
                      selectedYear === today.getFullYear() &&
                      monthIndex === today.getMonth() &&
                      dayData.day === today.getDate();

                    return (
                      <Grid
                        item
                        xs={1}
                        key={i}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Paper
                          elevation={2}
                          onMouseEnter={(e) => handleMouseEnter(e, dayData)}
                          onMouseLeave={handleMouseLeave}
                          sx={{
                            height: {
                              xs: 45,
                              sm: 70,
                              md: 80,
                            },
                            width: {
                              xs: 40,
                              sm: 70,
                              md: 80,
                            },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            p: { xs: 0.5, sm: 1 },
                            borderRadius: "12px",
                            color:
                              isToday ||
                              dayData.topColor !== "transparent" ||
                              dayData.bottomColor !== "transparent"
                                ? "white"
                                : "text.primary",
                            border: isToday ? "2px solid" : "1px solid",
                            borderColor: isToday ? "primary.dark" : "grey.200",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                              cursor:
                                dayData.events.length > 0
                                  ? "pointer"
                                  : "default",
                            },
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
{dayData.events.map((event, idx) => {
  const cellDate = new Date(selectedYear, monthIndex, dayData.day);
  cellDate.setHours(0, 0, 0, 0);

  const start = new Date(event.startDate);
  const end = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
  
  // Reset times to compare dates only
  const startDay = new Date(start);
  startDay.setHours(0, 0, 0, 0);
  
  const endDay = new Date(end);
  endDay.setHours(0, 0, 0, 0);

  const color = "#44ff44"; // Green for booked

  // Check if cell date is within the event date range
  if (cellDate >= startDay && cellDate <= endDay) {
    // Parse times from the normalized format
    const startTime = event.startTime || "00:00";
    const endTime = event.endTime || "23:59";
    
    const [sh, sm] = startTime.split(":");
    const [eh, em] = endTime.split(":");
    
    const startHour = parseInt(sh, 10);
    const endHour = parseInt(eh, 10);

    // For same day events
    if (startDay.getTime() === endDay.getTime() && cellDate.getTime() === startDay.getTime()) {
      // Full day or spanning morning to evening
      if ((startHour <= 6 && endHour >= 18) || (startTime === "00:00" && endTime === "23:59")) {
        return (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: color,
              opacity: 0.9,
            }}
          />
        );
      }
      // Morning only
      else if (endHour <= 12) {
        return (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              backgroundColor: color,
              opacity: 0.9,
            }}
          />
        );
      }
      // Afternoon only
      else if (startHour >= 12) {
        return (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              backgroundColor: color,
              opacity: 0.9,
            }}
          />
        );
      }
      // Default: full cell
      else {
        return (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: color,
              opacity: 0.9,
            }}
          />
        );
      }
    }
    // Multi-day events
    else {
      // First day of event
      if (cellDate.getTime() === startDay.getTime()) {
        if (startHour >= 12) {
          return (
            <Box
              key={idx}
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50%",
                backgroundColor: color,
                opacity: 0.9,
              }}
            />
          );
        } else {
          return (
            <Box
              key={idx}
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: color,
                opacity: 0.9,
              }}
            />
          );
        }
      }
      // Last day of event
      else if (cellDate.getTime() === endDay.getTime()) {
        if (endHour <= 12) {
          return (
            <Box
              key={idx}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "50%",
                backgroundColor: color,
                opacity: 0.9,
              }}
            />
          );
        } else {
          return (
            <Box
              key={idx}
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: color,
                opacity: 0.9,
              }}
            />
          );
        }
      }
      // Middle days - full coverage
      else {
        return (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: color,
              opacity: 0.9,
            }}
          />
        );
      }
    }
  }

  return null;
})}


                          {/* Top Section (Day + Weekday) */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                              position: "relative",
                              zIndex: 2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: isToday ? 700 : 600,
                                fontSize: {
                                  xs: "0.75rem",
                                  sm: "0.875rem",
                                  md: "1rem",
                                },
                                textShadow:
                                  dayData.topColor !== "transparent" ||
                                  dayData.bottomColor !== "transparent"
                                    ? "1px 1px 2px rgba(0,0,0,0.5)"
                                    : "none",
                              }}
                            >
                              {dayData.day}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 500,
                                color:
                                  isToday ||
                                  dayData.topColor !== "transparent" ||
                                  dayData.bottomColor !== "transparent"
                                    ? "black"
                                    : "text.secondary",
                                fontSize: {
                                  xs: "0.55rem",
                                  sm: "0.6rem",
                                  md: "0.7rem",
                                },
                                textShadow:
                                  dayData.topColor !== "transparent" ||
                                  dayData.bottomColor !== "transparent"
                                    ? "1px 1px 1px rgba(0,0,0,0.5)"
                                    : "none",
                              }}
                            >
                              {weekdays[dayData.dayOfWeek]}
                            </Typography>
                          </Box>

                          {/* Events indicator dot */}
                          {dayData.events.length > 0 && (
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 4,
                                right: 4,
                                zIndex: 2,
                                display: "flex",
                                gap: 0.5,
                              }}
                            >
                              {dayData.events.map((event, idx) => (
                                <Box
                                  key={idx}
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    backgroundColor:
                                      (event.mahal || event.Mahal) === "SMSH"
                                        ? "#ff4444ff"
                                        : "#ff0a0aff",
                                    border: "1px solid black",
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Legend */}
                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: "#44ff44",
                        borderRadius: 1,
                      }}
                    />
                    <Typography variant="body2" color="white">
                      Shri Meenakshi Sundarar Hall Booked
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        background:
                          "linear-gradient(to bottom, #ffffffff 50%, #ffffffff 50%)",
                        borderRadius: 1,
                      }}
                    />
                    <Typography variant="body2" color="white">
                      Both Booked
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor:
                          (event.mahal || event.Mahal) === "SMSH"
                            ? "#ff4444ff"
                            : "#ff0a0aff",
                        border: "1px solid black",
                      }}
                    />
                    <Typography variant="body2" color="white">
                      Total Events on day
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {/* Hover Popover for Event Details */}
        <Popover
  open={Boolean(hoverAnchor)}
  anchorEl={hoverAnchor}
  onClose={handleMouseLeave}
  anchorOrigin={{
    vertical: "top",
    horizontal: "center",
  }}
  transformOrigin={{
    vertical: "bottom",
    horizontal: "center",
  }}
  sx={{
    pointerEvents: "none",
  }}
  disableRestoreFocus
>
  <Box
    sx={{
      p: 2,
      maxWidth: 340,
      bgcolor: "background.paper",
      boxShadow: 4,
      borderRadius: 2,
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: 600,
        mb: 2,
        textAlign: "center",
        color: "primary.main",
        borderBottom: "1px solid",
        borderColor: "divider",
        pb: 1,
      }}
    >
      {hoverEventData &&
        `${selectedMonth} ${hoverEventData.day}, ${selectedYear}`}
    </Typography>

    {hoverEventData && hoverEventData.events.length > 0 ? (
      <Box display="flex" flexDirection="column" gap={1.5}>
        {hoverEventData.events.map((event, index) => {
          const startDate = event.startDate || event.date || event.Date;
          const endDate = event.endDate || "";
          const startTime = event.startTime || "";
          const endTime = event.endTime || "";

          return (
            <Box
              key={index}
              sx={{
                p: 1.5,
                bgcolor: "grey.50",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "grey.200",
                transition: "0.3s",
                "&:hover": {
                  bgcolor: "grey.100",
                  boxShadow: 2,
                },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "text.primary", mb: 0.5 }}
              >
                {event.Title || event.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{ mb: 0.8, color: "text.secondary" }}
              >
                📍 <b>{event.mahal || event.Mahal}</b>
              </Typography>

              {endDate ? (
                <>
                  <Typography variant="body2" sx={{ color: "info.main" }}>
                    <b>From:</b> {formatDateTime(startDate, startTime)}

                  </Typography>
                  <Typography variant="body2" sx={{ color: "info.main" }}>
                    <b>To:</b> {formatDateTime(endDate, endTime)}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" sx={{ color: "info.main" }}>
                  <b>On:</b> {formatDateTime(startDate, startTime)}
                  {endTime && ` - ${endTime}`}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    ) : (
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", textAlign: "center" }}
      >
        No events on this date
      </Typography>
    )}
  </Box>
</Popover>


        {/* Add Event Modal */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add New Event</DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              {/* Start Date and Time */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
              <TextField
  label="Person Name"
  value={newEventPersonName}
  onChange={(e) => setNewEventPersonName(e.target.value)}
  fullWidth
/>

<TextField
  label="Mobile Number"
  type="tel"
  value={newEventMobileNumber}
  onChange={(e) => setNewEventMobileNumber(e.target.value)}
  fullWidth
/>

                <TextField
                  label="Event Start Date"
                  type="date"
                  value={newEventStartDate}
                  onChange={(e) => setNewEventStartDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
                <TextField
                  label="Start Time"
                  type="time"
                  value={newEventStartTime}
                  onChange={(e) => setNewEventStartTime(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Box>

              {/* End Date and Time */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <TextField
                  label="Event End Date"
                  type="date"
                  value={newEventEndDate}
                  onChange={(e) => setNewEventEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
                <TextField
                  label="End Time"
                  type="time"
                  value={newEventEndTime}
                  onChange={(e) => setNewEventEndTime(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Box>

              <TextField
                select
                label="Event Title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                fullWidth
              >
                <MenuItem value="Marriage">Marriage</MenuItem>
                <MenuItem value="Reception">Reception</MenuItem>
                <MenuItem value="Engagement">Engagement</MenuItem>
                <MenuItem value="WeddingAnniversary">
                  WeddingAnniversary
                </MenuItem>
                <MenuItem value="Seemantham/Valaikappu">
                  Seemantham/Valaikappu
                </MenuItem>
                <MenuItem value="Poonool/Upanayanam">
                  Poonool/Upanayanam
                </MenuItem>
                <MenuItem value="Sangeet & Mehandi">Sangeet & Mehandi</MenuItem>
                <MenuItem value="BirthDay">BirthDay</MenuItem>
                <MenuItem value="Puberty">Puberty</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </TextField>
              <TextField
                select
                label="Select Option"
                value={dropdownValue}
                onChange={(e) => setDropdownValue(e.target.value)}
                fullWidth
              >
                <MenuItem value="Thirumal Thirumagal Vasanth Mahal A/C">Thirumal Thirumagal Vasanth Mahal A/C</MenuItem>
                <MenuItem value="Shri Meenakshi Sundarar Hall A/C">Shri Meenakshi Sundarar Hall A/C</MenuItem>
              </TextField>
            </Box>

            {/* List of custom events for the selected month */}
            {customEvents.filter((event) => {
              const eventDate = new Date(
                event.date || event.Date || event.startDate || event.StartDate
              );
              return (
                eventDate.getFullYear() === selectedYear &&
                eventDate.getMonth() === months.indexOf(selectedMonth)
              );
            }).length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Your Events for {selectedMonth} {selectedYear}
                </Typography>
                <List>
                  {customEvents
                    .filter((event) => {
                      const eventDate = new Date(
                        event.date ||
                          event.Date ||
                          event.startDate ||
                          event.StartDate
                      );
                      return (
                        eventDate.getFullYear() === selectedYear &&
                        eventDate.getMonth() === months.indexOf(selectedMonth)
                      );
                    })
                    .map((event) => (
                      <ListItem key={event.id}>
                        <ListItemText
                          primary={event.Title || event.title}
                          secondary={
                            <Box>
                            <Typography variant="body2">
  Person: {event.personName || "N/A"}
</Typography>
<Typography variant="body2">
  Mobile: {event.mobileNumber || "N/A"}
</Typography>

                              <Typography variant="body2">
                                Start:{" "}
                                {formatDateTime(
                                  event.startDate || event.date || event.Date,
                                  event.startTime
                                )}
                              </Typography>
                              {event.endDate && (
                                <Typography variant="body2">
                                  End:{" "}
                                  {formatDateTime(event.endDate, event.endTime)}
                                </Typography>
                              )}
                              <Typography variant="body2">
                                Mahal: {event.mahal || event.Mahal}
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                </List>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button
              onClick={handleAddEvent}
              variant="contained"
              disabled={!newEventStartDate || !newEventTitle}
            >
              Add Event
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
      <Link href={"/contact"}>
        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            startIcon={<EventAvailableIcon />}
            sx={{
              // mb: "20px",
              px: 6,
              py: 2,
              borderRadius: 99,
              fontWeight: 800,
              fontSize: 18,
              background: "linear-gradient(135deg,#FF6B6B 0%,#FF8E53 100%)",
              boxShadow: "0 6px 20px rgba(255,107,107,0.4)",
              "&:hover": {
                background: "linear-gradient(135deg,#FF8E53 0%,#FF6B6B 100%)",
              },
            }}
          >
            Book Now
          </Button>
        </Box>
      </Link>
    </>
  );
};

export default YearMonthCalendar;
