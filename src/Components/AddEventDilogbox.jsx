"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AddEventDialog = ({
  open,
  onClose,
  url,
  onSuccess,
  initialMahal = "TTV",
  selectedYear,
  selectedMonth,
  months,
  customEvents,
  handleDeleteEvent,
  formatDateTime,
}) => {
  const [newEventStartDate, setNewEventStartDate] = useState("");
  const [newEventStartTime, setNewEventStartTime] = useState("14:00"); // default 2 PM
  const [newEventEndDate, setNewEventEndDate] = useState("");
  const [newEventEndTime, setNewEventEndTime] = useState("13:59"); // next day before 2 PM
  const [newEventTitle, setNewEventTitle] = useState("Marriage");
  const [dropdownValue, setDropdownValue] = useState(initialMahal);

  const handleAddEvent = async () => {
    const data = {
      title: newEventTitle,
      date: newEventStartDate,
      startDate: newEventStartDate,
      startTime: newEventStartTime,
      endDate: newEventEndDate,
      endTime: newEventEndTime,
      mahal: dropdownValue,
    };

    try {
      // Fire-and-forget save to Google Apps Script
      await fetch(url, {
        method: "POST",
        mode: "no-cors", // we cannot read response, but server stores it
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Optimistic: call parent immediately
      onSuccess(data);

      // Close dialog
      onClose();

    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Filter events for selected month + selected mahal
  const filteredEvents = customEvents.filter((event) => {
    const eventDate = new Date(event.date || event.startDate);
    return (
      (event.mahal || event.Mahal) === dropdownValue &&
      eventDate.getFullYear() === selectedYear &&
      eventDate.getMonth() === months.indexOf(selectedMonth)
    );
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Start Date and Time */}
          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <TextField
              label="Event Start Date"
              type="date"
              value={newEventStartDate}
              onChange={(e) => setNewEventStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Start Time"
              type="time"
              value={newEventStartTime}
              onChange={(e) => setNewEventStartTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="End Time"
              type="time"
              value={newEventEndTime}
              onChange={(e) => setNewEventEndTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>

          {/* Title Select */}
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
            <MenuItem value="WeddingAnniversary">Wedding Anniversary</MenuItem>
            <MenuItem value="Seemantham/Valaikappu">Seemantham/Valaikappu</MenuItem>
            <MenuItem value="Poonool/Upanayanam">Poonool/Upanayanam</MenuItem>
            <MenuItem value="Sangeet & Mehandi">Sangeet & Mehandi</MenuItem>
            <MenuItem value="BirthDay">BirthDay</MenuItem>
            <MenuItem value="Puberty">Puberty</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>

          {/* Mahal Select */}
          <TextField
            select
            label="Select Mahal"
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.target.value)}
            fullWidth
          >
            <MenuItem value="TTV">TTV</MenuItem>
            <MenuItem value="SMSH">SMSH</MenuItem>
          </TextField>
        </Box>

        {/* Already added events list */}
        {filteredEvents.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your {dropdownValue} Events for {selectedMonth} {selectedYear}
            </Typography>
            <List>
              {filteredEvents.map((event) => (
                <ListItem key={event.id}>
                  <ListItemText
                    primary={event.Title || event.title}
                    secondary={
                      <Box>
                        <Typography variant="body2">
                          Start: {formatDateTime(event.startDate || event.date, event.startTime)}
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
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteEvent(event.id)}>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddEvent} variant="contained" disabled={!newEventStartDate || !newEventTitle}>
          Add Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventDialog;
