"use client";
import React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import Image from "next/image";

export default function Disclaimer() {
  return (
    <Box sx={{ width: "100%", bgcolor: "background.default" }}>
      {/* ✅ Hero Banner */}
      <Box sx={{ position: "relative", width: "100%", height: { xs: 200, md: 300 } }}>
        <Image
          src="/aboutbg.jpg"
          alt="Disclaimer"
          fill
          priority
          style={{ objectFit: "cover", filter: "brightness(0.65)" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography variant="h3" fontWeight="bold" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
            Disclaimer
          </Typography>
          <Typography variant="subtitle1" sx={{ maxWidth: 700, mt: 1 }}>
            Please read this Disclaimer carefully before using our website and services.
          </Typography>
        </Box>
      </Box>

      {/* ✅ Main Content */}
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        {/* Intro */}
        <Typography variant="body1" sx={{ mb: 3, textAlign: "justify", lineHeight: 1.7 }}>
          The information provided on this website for 
          <strong> Thirumal Thirumagal Vasanth Mahal A/C & Shri Meenakshi Sundarar Hall A/C</strong> 
          is for general informational purposes only. While we strive to keep the content updated and correct,
          we make no guarantees of completeness, reliability, accuracy, or suitability regarding the website or
          the information, products, or services mentioned.
        </Typography>

        {/* Section - Event Info */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
            Event & Booking Information
          </Typography>
          <Divider sx={{ mb: 2, width: 60, borderWidth: 2, borderColor: "primary.main" }} />
          <Typography variant="body1" sx={{ textAlign: "justify", lineHeight: 1.7 }}>
            All information regarding hall capacity, facilities, pricing, and availability is subject to change 
            without notice. We recommend contacting us directly for the latest details and to confirm bookings. 
            Any reliance you place on the information provided is strictly at your own risk.
          </Typography>
        </Box>

        {/* Section - External Links */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
            External Links
          </Typography>
          <Divider sx={{ mb: 2, width: 60, borderWidth: 2, borderColor: "primary.main" }} />
          <Typography variant="body1" sx={{ textAlign: "justify", lineHeight: 1.7 }}>
            Our website may contain links to external websites or services that are not provided or maintained 
            by us. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness 
            of any information on these external platforms, and we are not responsible for their privacy 
            practices or policies.
          </Typography>
        </Box>

        {/* Section - Liability */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
            Limitation of Liability
          </Typography>
          <Divider sx={{ mb: 2, width: 60, borderWidth: 2, borderColor: "primary.main" }} />
          <Typography variant="body1" sx={{ textAlign: "justify", lineHeight: 1.7 }}>
            By using this website and our services, you agree that the management of 
            <strong> Thirumal Thirumagal Vasanth Mahal A/C & Shri Meenakshi Sundarar Hall A/C </strong> 
            shall not be held responsible for any loss, damage, or inconvenience incurred as a result of 
            relying on the information provided. This includes direct, indirect, incidental, or consequential damages.
          </Typography>
        </Box>

        {/* Section - Contact */}
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
            Contact Us
          </Typography>
          <Divider sx={{ mb: 2, width: 60, borderWidth: 2, borderColor: "primary.main" }} />
          <Typography variant="body1">
            If you have any questions regarding this disclaimer, please contact us directly: <br />
            📧 Email: info@yourmahal.com <br />
            📞 Phone: +91 98765 43210
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
