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
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Today as TodayIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useEffect } from "react";

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
    "https://script.google.com/macros/s/AKfycbyP_1JUo0WVrjtCkWsAFmGkb3ocrJ0-IV8s1blzbW0q-K0YxmaX1zqhafSVUQXszSy1Sg/exec";

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("Fetched data:", data);

        if (data.status === "success") {
          setCustomEvents(data.data);
        } else {
          console.error("Error:", data.message);
        }
      } catch (err) {
        console.error("Fetch error:");
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
  const formatDateTime = (dateString, timeString = "") => {
    const date = new Date(dateString);
    if (timeString) {
      return `${date.toLocaleDateString()} ${timeString}`;
    }
    return date.toLocaleDateString();
  };

  // Sample events data combined with custom events
  const events = useMemo(() => {
    // Filter custom events for the current month and year
    const filteredCustomEvents = customEvents.filter((event) => {
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
    console.log("newEventTitle:", newEventTitle);
    console.log("newEventStartDate:", newEventStartDate);
    console.log("newEventStartTime:", newEventStartTime);
    console.log("newEventEndDate:", newEventEndDate);
    console.log("newEventEndTime:", newEventEndTime);
    console.log("dropdownValue", dropdownValue);

    const data = {
      title: newEventTitle,
      date: newEventStartDate, // Keep for backward compatibility
      startDate: newEventStartDate,
      startTime: newEventStartTime,
      endDate: newEventEndDate,
      endTime: newEventEndTime,
      mahal: dropdownValue,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      handleCloseModal();
      // Refresh events after adding
      const res = await fetch(url);
      const result = await res.json();
      if (result.status === "success") {
        setCustomEvents(result.data);
      }

      showSnackbar("Event added successfully!", "success");
    } catch (error) {
      console.error("Error sending event:", error);
      showSnackbar("Error adding event!", "error");
    }
  };

  const handleDeleteEvent = (eventId) => {
    setCustomEvents((prev) => prev.filter((event) => event.id !== eventId));
    showSnackbar("Event deleted successfully!", "success");
  };

  // Build calendar grid with only actual days
  const calendarDays = useMemo(() => {
    const days = [];

    // Add all days of the month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(selectedYear, monthIndex, d);
      const dayOfWeek = date.getDay();
      const dayEvents = events.filter(
        (event) =>
          new Date(event.date || event.Date || event.startDate || event.StartDate).getDate() === d &&
          new Date(event.date || event.Date || event.startDate || event.StartDate).getMonth() === monthIndex &&
          new Date(event.date || event.Date || event.startDate || event.StartDate).getFullYear() === selectedYear
      );

      // Determine the color based on events for this day
      let dayColor = "default";
      let topColor = "transparent";
      let bottomColor = "transparent";

      if (dayEvents.length > 0) {
        const hasTTV = dayEvents.some(
          (event) => event.mahal || event.Mahal === "TTV"
        );
        const hasSMSH = dayEvents.some(
          (event) => event.mahal || event.Mahal === "SMSH"
        );

        if (hasTTV && hasSMSH) {
          // Both TTV and SMSH events - split colors
          topColor = "#ff4444"; // Red for TTV (top)
          bottomColor = "#44ff44"; // Green for SMSH (bottom)
        } else if (hasTTV) {
          // Only TTV events - red top
          topColor = "#ff4444"; // Red
          bottomColor = "white";
        } else if (hasSMSH) {
          // Only SMSH events - green bottom
          topColor = "white";
          bottomColor = "#44ff44"; // Green
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

  // Weekday headers
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
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
            variant={isMobile ? "h4" : isTablet ? "h3" : "h3"}
            fontWeight={700}
            gutterBottom
            sx={{ textAlign: { xs: "center", sm: "left" }, ml: { md: 5 } }}
          >
            Booked Event Calendar
          </Typography>

          {/* Bottom section = nav + filters */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "row" },
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
                  color: "white",
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
                  color: "white",
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

          {/* Calendar Grid */}
          <Grid container spacing={1} columns={7}>
            {calendarDays.map((dayData, i) => {
              const isToday =
                dayData &&
                selectedYear === today.getFullYear() &&
                monthIndex === today.getMonth() &&
                dayData.day === today.getDate();

              // Determine background based on TTV/SMSH events
              const background =
                dayData.topColor !== "transparent" ||
                dayData.bottomColor !== "transparent"
                  ? `linear-gradient(to bottom, ${dayData.topColor} 50%, ${dayData.bottomColor} 50%)`
                  : isToday
                  ? "linear-gradient(to bottom, #1976d9 50%, #42a5f5 50%)"
                  : "linear-gradient(to bottom, #f5f5f2 50%, #e0e0e0 50%)";

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
                        cursor: dayData.events.length > 0 ? "pointer" : "default",
                      },
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Color indicators for TTV/SMSH */}
                    {(dayData.topColor !== "transparent" ||
                      dayData.bottomColor !== "transparent") && (
                      <>
                        {dayData.topColor !== "transparent" && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              height: "50%",
                              backgroundColor: dayData.topColor,
                              zIndex: 1,
                            }}
                          />
                        )}
                        {dayData.bottomColor !== "transparent" && (
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: "50%",
                              backgroundColor: dayData.bottomColor,
                              zIndex: 1,
                            }}
                          />
                        )}
                      </>
                    )}

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
                                  ? "#ff4444" 
                                  : "#44ff44",
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
                  backgroundColor: "#ff4444",
                  borderRadius: 1,
                }}
              />
              <Typography variant="body2" color="white">
                TTV Booked
              </Typography>
            </Box>
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
                SMSH Booked
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  background:
                    "linear-gradient(to bottom, #ff4444 50%, #44ff44 50%)",
                  borderRadius: 1,
                }}
              />
              <Typography variant="body2" color="white">
                Both Booked
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Hover Popover for Event Details */}
      <Popover
        open={Boolean(hoverAnchor)}
        anchorEl={hoverAnchor}
        onClose={handleMouseLeave}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          pointerEvents: 'none',
        }}
        disableRestoreFocus
      >
        <Box sx={{ p: 2, maxWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            {hoverEventData && `${selectedMonth} ${hoverEventData.day}, ${selectedYear}`}
          </Typography>
          {hoverEventData && hoverEventData.events.length > 0 ? (
            <Box>
              {hoverEventData.events.map((event, index) => (
                <Box key={index} sx={{ mb: 1, p: 1, backgroundColor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {event.Title || event.title}
                  </Typography>
                  <Typography variant="body2">
                    Mahal: {event.mahal || event.Mahal}
                  </Typography>
                  <Typography variant="body2">
                    Start: {formatDateTime(event.startDate || event.date || event.Date, event.startTime)}
                  </Typography>
                  {event.endDate && (
                    <Typography variant="body2">
                      End: {formatDateTime(event.endDate, event.endTime)}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary">
                    {!event.endDate && "Single day event"}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {/* Start Date and Time */}
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
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
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
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
              <MenuItem value="WeddingAnniversary">WeddingAnniversary</MenuItem>
              <MenuItem value="Seemantham/Valaikappu">
                Seemantham/Valaikappu
              </MenuItem>
              <MenuItem value="Poonool/Upanayanam">Poonool/Upanayanam</MenuItem>
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
              <MenuItem value="TTV">TTV</MenuItem>
              <MenuItem value="SMSH">SMSH</MenuItem>
            </TextField>
          </Box>

          {/* List of custom events for the selected month */}
          {customEvents.filter((event) => {
            const eventDate = new Date(event.date || event.Date || event.startDate || event.StartDate);
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
                    const eventDate = new Date(event.date || event.Date || event.startDate || event.StartDate);
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
                              Start: {formatDateTime(
                                event.startDate || event.date || event.Date, 
                                event.startTime
                              )}
                            </Typography>
                            {event.endDate && (
                              <Typography variant="body2">
                                End: {formatDateTime(event.endDate, event.endTime)}
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
  );
};

export default YearMonthCalendar;