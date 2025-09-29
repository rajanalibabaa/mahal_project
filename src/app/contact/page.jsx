"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  CircularProgress,
  IconButton,
  InputAdornment
  
} from "@mui/material";
import PhoneIcons from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/Event";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";
import FAQSection from "@/Components/FaqComponents";
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    altNumber: "",
    message: "",
    startDateTime: "",
    endDateTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState({
    open: false,
    message: "",
    success: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   setLoading(true);

    //   try {
    //     const response = await fetch(
    //       "https://formsubmit.co/admin@thirumalthirumagal.com",
    //       // "https://script.google.com/macros/s/AKfycbzuaevkc_4Xc3qAfq7PDvNELmeudeiCPEm6JmLj618CtNLzxVGTyuMfkjRXTjtFMUjM/exec",
    //       {
    //         method: "POST",
    //         mode: "no-cors",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(formData),
    //       }
    //     );

    //     console.log("res :", response);

    //     setFormData({
    //       name: "",
    //       number: "",
    //       altNumber: "",
    //       message: "",
    //       startDateTime: "",
    //       endDateTime: "",
    //     });

    //     setDialog({
    //       open: true,
    //       message: "Form submitted successfully!",
    //       success: true,
    //     });
    //   } catch (error) {
    //     console.error("Error submitting form:", error);
    //     setDialog({
    //       open: true,
    //       message: "Failed to submit form. Please try again.",
    //       success: false,
    //     });
    //   } finally {
    //     setLoading(false);
    //   }
    // };

  return (
    <>
   <Box
  sx={{
    position: "relative",
    minHeight: "300px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  }}
>
  <Image
    src="/contact.jpg"
    alt="Contact"
    priority
    fill   // fills parent container
    style={{
      objectFit: "cover",
      zIndex: -1, // pushes it behind content
    }}
  />

  <Typography
    variant="h3"
    sx={{ color: "#fff", fontWeight: "bold", position: "relative" }}
  >
Enquiry us      <Typography variant="subtitle1">We’d love to hear from you. Get in touch today!</Typography>

  </Typography>
</Box>

    <Box
     
   >
    <Box sx={{ display: "flex",justifyContent:'space-around'  }}>
      
      <Box  sx={{ py: 0,mt:{ xs: 5, md: 5 } ,}}>
      <Box
        // elevation={10}
        sx={{
          maxWidth: 600,
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background: "linear-gradient(145deg, #ffffff, #f7f7f7)",
          boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: "linear-gradient(90deg,#d63939, #df3ebc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 4,
          }}
        >
           Enquiry us
        </Typography>

        {/* Form */}
        <form action="https://formsubmit.co/e818635b854b9f8665a49ee041e753d6"
              method="POST">
            <input type="hidden" name="_captcha" value="false" />
  <input type="hidden" name="_subject" value="New Enquiry from Website" />
  <input type="hidden" name="_next" value="https://thirumalthirumagal.com" />
          {/* Name */}
          <TextField
            fullWidth
            variant="outlined"
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Phone */}
          <TextField
            fullWidth
            type="tel"
            variant="outlined"
            label="Phone Number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Alt Phone */}
          <TextField
            fullWidth
            type="tel"
            variant="outlined"
            label="Alternate Phone Number"
            name="altNumber"
            value={formData.altNumber}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Booking Start */}
          <TextField
            fullWidth
            type="datetime-local"
            variant="outlined"
            label="Booking Start"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleChange}
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Booking End */}
          <TextField
            fullWidth
            type="datetime-local"
            variant="outlined"
            label="Booking End"
            name="endDateTime"
            value={formData.endDateTime}
            onChange={handleChange}
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon color="error" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Message */}
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MessageIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            variant="contained"
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              fontSize: "1.1rem",
              background: "linear-gradient(90deg,#d63939, #df3ebc)",
              boxShadow: "0 4px 20px rgba(220,69,187,0.4)",
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 6px 25px rgba(0,0,0,0.3)",
              },
            }}
          >
            {loading ? <CircularProgress size={26} color="inherit" /> : "Submit"}
          </Button>
        </form>
      </Box>
    </Box>
    <Box>
    <Box sx={{ display:{xs:"none",md:"grid"}, gridTemplateColumns: "repeat(2, 2fr)", gap: "1rem",  alignContent: "center",mt:15}}>
    <Image src="/contactbg.jpg" alt="Contact Us" width={300} height={300}  />
    <Image src="/contactbg2.jpg" alt="Contact Us" width={300} height={300}  />
    <Image src="/contact3.jpg" alt="Contact Us" width={300} height={300}  />
    <Image src="/contact4.jpg" alt="Contact Us" width={300} height={300}  />
   
    </Box>
    </Box>
    </Box>
    

      {/* ✅ Dialog Box */}
      {dialog.open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: "center",
              maxWidth: 400,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color={dialog.success ? "green" : "error"}
              gutterBottom
            >
              {dialog.success ? "Success" : "Error"}
            </Typography>
            <Typography>{dialog.message}</Typography>
            <Button
              variant="contained"
              onClick={() => setDialog({ ...dialog, open: false })}
              sx={{
                mt: 3,
                background: "linear-gradient(90deg, #cc4334, #dc45bb)",
              }}
            >
              OK
            </Button>
          </Paper>
        </Box>
      )}
      
    </Box>
    {/* ✅ Map on top */}
         <Box sx={{ textAlign: "center", py: 6 }}>
      {/* Heading */}
      <Typography variant="h4" fontWeight="bold" mb={3} color="primary">
        Location
      </Typography>

      {/* Contact Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 2, md: 4 },
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        {/* Phone */}
        <Box sx={{ textAlign: "center" }}>
          <IconButton
            color="primary"
            onClick={() => (window.location.href = "tel:+919444048899")}
          >
            <PhoneIcons fontSize="large" />
          </IconButton>
          <Typography component="a" href="tel:+919444048899" sx={{ textDecoration: "none", color: "inherit" }}>
            +91 94440 48899
          </Typography>
        </Box>

        {/* WhatsApp */}
        <Box sx={{ textAlign: "center" }}>
          <IconButton
            color="success"
            onClick={() =>
              window.open("https://wa.me/919444048899", "_blank")
            }
          >
            <WhatsAppIcon fontSize="large" />
          </IconButton>
          <Typography
            component="a"
            href="https://wa.me/919444048899"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Chat on WhatsApp
          </Typography>
        </Box>

        {/* Email */}
        <Box sx={{ textAlign: "center" }}>
          <IconButton
            color="error"
            onClick={() =>
              (window.location.href = "mailto:admin@thirumalthirumagal.com")
            }
          >
            <EmailIcon fontSize="large" />
          </IconButton>
          <Typography
            component="a"
            href="mailto:admin@thirumalthirumagal.com"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            admin@thirumalthirumagal.com
          </Typography>
        </Box>
      </Box>

      {/* Google Map */}
      <Paper
        elevation={6}
        sx={{
          mx: { xs: 2, md: 8 },
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.7261555812393!2d80.1884081!3d13.1012479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5263f3bff3a9db%3A0xd4ea3840d363ce02!2sThirumal%20Thirumagal%20Vasantha%20Mahal!5e0!3m2!1sen!2sin!4v1727000000000!5m2!1sen!2sin"
          style={{ border: 0, width: "100%", height: "450px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Paper>
    </Box>
<FAQSection/>
        
        </>
    
  );
}
