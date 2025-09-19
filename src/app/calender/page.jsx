"use client";
import React, { useState, useMemo } from "react";
import { Box, MenuItem, Select, Typography, Grid, Paper } from "@mui/material";

const YearMonthCalendar = () => {
  const years = [2025, 2026];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(months[today.getMonth()]);

  const monthIndex = months.indexOf(selectedMonth);
  const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
  const firstDay = new Date(selectedYear, monthIndex, 1).getDay();

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [selectedYear, selectedMonth]);

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      {/* Dropdowns */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          fullWidth
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
          fullWidth
        >
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Month-Year Heading */}
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          textAlign: "center",
          background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          color: "white",
          mb: 3,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          📅 {selectedMonth}, {selectedYear}
        </Typography>
      </Box>

      {/* Weekday Header */}
      <Grid container spacing={1} sx={{ mb: 1 }}>
        {weekdays.map((day) => (
          <Grid item xs={1.71} key={day}>
            <Typography
              variant="subtitle2"
              align="center"
              sx={{ fontWeight: "bold", color: "#555" }}
            >
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Calendar Grid */}
      <Grid container spacing={1}>
        {calendarDays.map((day, i) => {
          const isToday =
            day &&
            selectedYear === today.getFullYear() &&
            monthIndex === today.getMonth() &&
            day === today.getDate();

          return (
            <Grid item xs={1.71} key={i}>
              {day ? (
                <Paper
                  sx={{
                    height: 70,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isToday ? "#1976d2" : "white",
                    color: isToday ? "white" : "#333",
                    borderRadius: "12px",
                    fontWeight: isToday ? "bold" : "normal",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: isToday ? "#1565c0" : "#f1f5ff",
                      transform: "scale(1.05)",
                    },
                  }}
                  elevation={3}
                >
                  <Typography variant="body1">{day}</Typography>
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "0.75rem", opacity: 0.8 }}
                  >
                    {weekdays[(firstDay + day - 1) % 7]}
                  </Typography>
                </Paper>
              ) : (
                <Box sx={{ height: 70 }} />
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default YearMonthCalendar;
