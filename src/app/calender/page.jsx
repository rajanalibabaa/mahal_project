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

 
  const url = "https://script.google.com/macros/s/AKfycbyCcV6rVwRiXLQyKcKL6G64hW7G7wV_Ocx7Ndn04mz0DwZwMizHI-BR62JCjCAknVpjFQ/exec"


  const today = new Date();
  const [Events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(months[today.getMonth()]);
  const [openModal, setOpenModal] = useState(false);
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventTitle, setNewEventTitle] = useState("");
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

  // Sample events data combined with custom events
  const events = useMemo(() => {
    const sampleEvents = [
      {
        date: new Date(selectedYear, months.indexOf(selectedMonth), 5),
        title: "Meeting",
        id: "event-1",
        mahal: "TTV"
      },
      {
        date: new Date(selectedYear, months.indexOf(selectedMonth), 12),
        title: "Birthday",
        id: "event-2",
        mahal: "SMSH"
      },
      {
        date: new Date(selectedYear, months.indexOf(selectedMonth), 18),
        title: "Conference",
        id: "event-3",
        mahal: "TTV"
      },
      {
        date: new Date(selectedYear, months.indexOf(selectedMonth), 22),
        title: "Dinner",
        id: "event-4",
        mahal: "SMSH"
      },
    ];

    // Filter custom events for the current month and year
    const filteredCustomEvents = customEvents.filter((event) => {
      const eventDate = new Date(event.date || event.Date || event.date || event.Date);
      return (
        eventDate.getFullYear() === selectedYear &&
        eventDate.getMonth() === months.indexOf(selectedMonth)
      );
    });

    return [ ...filteredCustomEvents];
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
    setNewEventDate("");
    setNewEventTitle("");
  };

  const handleAddEvent = async () => {
    console.log("newEventTitle:", newEventTitle);
    console.log("newEventDate:", newEventDate);
    console.log("dropdownValue",dropdownValue)

    const data = {
      title: newEventTitle,
      date: newEventDate,
      mahal: dropdownValue
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

      // Refresh events after adding
      const res = await fetch(url);
      const result = await res.json();
      if (result.status === "success") {
        setCustomEvents(result.data);
      }

      handleCloseModal();
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
          new Date(event.date || event.Date).getDate() === d &&
          new Date(event.date || event.Date).getMonth() === monthIndex &&
          new Date(event.date || event.Date).getFullYear() === selectedYear
      );

      // Determine the color based on events for this day
      let dayColor = "default";
      let topColor = "transparent";
      let bottomColor = "transparent";

      if (dayEvents.length > 0) {
        const hasTTV = dayEvents.some(event => event.mahal || event.Mahal === "TTV");
        const hasSMSH = dayEvents.some(event => event.mahal || event.Mahal === "SMSH");

        if (hasTTV && hasSMSH) {
          // Both TTV and SMSH events - split colors
          topColor = "#ff4444"; // Red for TTV (top)
          bottomColor = "#44ff44"; // Green for SMSH (bottom)
        } else if (hasTTV) {
          // Only TTV events - red top
          topColor = "#ff4444"; // Red
          bottomColor = "transparent";
        } else if (hasSMSH) {
          // Only SMSH events - green bottom
          topColor = "transparent";
          bottomColor = "#44ff44"; // Green
        }
      }

      days.push({ 
        day: d, 
        dayOfWeek, 
        events: dayEvents,
        topColor,
        bottomColor
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
              const background = dayData.topColor !== "transparent" || dayData.bottomColor !== "transparent" 
                ? `linear-gradient(to bottom, ${dayData.topColor} 50%, ${dayData.bottomColor} 50%)`
                : isToday
                ? "linear-gradient(to bottom, #1976d9 50%, #42a5f5 50%)"
                : "linear-gradient(to bottom, #f5f5f5 50%, #e0e0e0 50%)";

              return (
                <Grid
                  item
                  xs={1}
                  key={i}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Paper
                    elevation={2}
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
                      background: background,
                      color: isToday || (dayData.topColor !== "transparent" || dayData.bottomColor !== "transparent") 
                        ? "white" 
                        : "text.primary",
                      border: isToday ? "2px solid" : "1px solid",
                      borderColor: isToday ? "primary.dark" : "grey.200",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                      },
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Color indicators for TTV/SMSH */}
                    {(dayData.topColor !== "transparent" || dayData.bottomColor !== "transparent") && (
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
                          textShadow: (dayData.topColor !== "transparent" || dayData.bottomColor !== "transparent") 
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
                          color: isToday || (dayData.topColor !== "transparent" || dayData.bottomColor !== "transparent")
                            ? "white" 
                            : "text.secondary",
                          fontSize: {
                            xs: "0.55rem",
                            sm: "0.6rem",
                            md: "0.7rem",
                          },
                          textShadow: (dayData.topColor !== "transparent" || dayData.bottomColor !== "transparent") 
                            ? "1px 1px 1px rgba(0,0,0,0.5)" 
                            : "none",
                        }}
                      >
                        {weekdays[dayData.dayOfWeek]}
                      </Typography>
                    </Box>

                    {/* Events for the day */}
                    {dayData.events.length > 0 && (
                      <Box
                        sx={{
                          mt: 0.5,
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                          position: "relative",
                          zIndex: 2,
                        }}
                      > 
                        {/* {dayData.events.slice(0, 2).map((event, idx) => (
                          <Chip
                            key={idx}
                            label={`${event.Title ||event.title} (${event.mahal || event.Mahal || event.mahal || event.Mahal})`}
                            size="small"
                            sx={{
                              height: "auto",
                              py: 0.5,
                              fontSize: "0.6rem",
                              backgroundColor: isToday || (dayData.topColor !== "transparent" || dayData.bottomColor !== "transparent")
                                ? "rgba(255, 255, 255, 0.9)"
                                : "primary.light",
                              color: isToday || (dayData.topColor !== "transparent" || dayData.bottomColor !== "transparent")
                                ? "primary.main"
                                : "white",
                              "& .MuiChip-label": {
                                px: 0.5,
                                whiteSpace: "normal",
                                textOverflow: "clip",
                              },
                            }}
                          />
                        ))} */}
                        {/* {dayData.events.length > 2 && (
                          <Chip
                            label={`+${dayData.events.length - 2}`}
                            size="small"
                            sx={{
                              height: "auto",
                              py: 0.5,
                              fontSize: "0.6rem",
                              backgroundColor: isToday || (dayData.topColor !== "transparent" || dayData.bottomColor !== "transparent")
                                ? "rgba(255, 255, 255, 0.9)"
                                : "primary.light",
                              color: isToday || (dayData.topColor !== "transparent" || dayData.bottomColor !== "transparent")
                                ? "primary.main"
                                : "white",
                            }}
                          />
                        )} */}
                      </Box>
                    )}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          {/* Legend */}
          <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 20, height: 20, backgroundColor: "#ff4444", borderRadius: 1 }} />
              <Typography variant="body2" color="white">
                TTV Booked
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 20, height: 20, backgroundColor: "#44ff44", borderRadius: 1 }} />
              <Typography variant="body2" color="white">
                SMSH Booked
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ 
                width: 20, 
                height: 20, 
                background: "linear-gradient(to bottom, #ff4444 50%, #44ff44 50%)", 
                borderRadius: 1 
              }} />
              <Typography variant="body2" color="white">
                Both Booked
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

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
            <TextField
              label="Event Date"
              type="date"
              value={newEventDate}
              onChange={(e) => setNewEventDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              label="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              fullWidth
            />
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
            const eventDate = new Date(event.date || event.Date);
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
                    const eventDate = new Date(event.date || event.Date);
                    return (
                      eventDate.getFullYear() === selectedYear &&
                      eventDate.getMonth() === months.indexOf(selectedMonth)
                    );
                  })
                  .map((event) => (
                    <ListItem key={event.id}>
                      <ListItemText
                        primary={event.Title || event.title}
                        secondary={`${new Date( event.date || event.Date || event.date || event.Date).toLocaleDateString()} - ${event.mahal || event.Mahal}`}
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
            disabled={!newEventDate || !newEventTitle}
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