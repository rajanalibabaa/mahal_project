"use client";
import React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <Box sx={{ width: "100%", bgcolor: "background.default" }}>
      {/* ✅ Hero Banner with Overlay */}
      <Box sx={{ position: "relative", width: "100%", height: { xs: 200, md: 320 } }}>
        <Image
          src="/aboutbg.jpg"
          alt="Privacy Policy"
          fill
          priority
          style={{ objectFit: "cover", filter: "brightness(0.65)" }}
        />
        {/* Overlay Text */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "white",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography variant="h3" fontWeight="bold" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" sx={{ maxWidth: 700, mt: 1 }}>
            Your privacy matters to us at Thirumal Thirumagal Vasanth Mahal A/C & Shri Meenakshi Sundarar Hall A/C
          </Typography>
        </Box>
      </Box>

      {/* ✅ Main Content */}
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <Typography variant="body1" sx={{ mb: 3, textAlign: "justify", lineHeight: 1.7 }}>
          At <strong>Thirumal Thirumagal Vasanth Mahal A/C & Shri Meenakshi Sundarar Hall A/C</strong>,
          we value the privacy of our guests and clients. This Privacy Policy explains how we collect,
          use, and safeguard your personal information.
        </Typography>

        {/* Section 1 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
            Information We Collect
          </Typography>
          <Divider sx={{ mb: 2, width: 60, borderWidth: 2, borderColor: "primary.main" }} />
          <Typography variant="body1" sx={{ textAlign: "justify", lineHeight: 1.7 }}>
            We may collect personal details such as your name, contact number, email address, and booking details
            when you inquire or reserve our halls. Information is used only for service purposes and not shared with
            third parties without consent.
          </Typography>
        </Box>

        {/* Section 2 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
            How We Use Your Information
          </Typography>
          <Divider sx={{ mb: 2, width: 60, borderWidth: 2, borderColor: "primary.main" }} />
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            ▸ To confirm and manage reservations <br />
            ▸ To communicate regarding your booking <br />
            ▸ To provide updates on facilities and offers <br />
            ▸ To improve our services and guest experience
          </Typography>
        </Box>

        {/* Section 3 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
            Data Security
          </Typography>
          <Divider sx={{ mb: 2, width: 60, borderWidth: 2, borderColor: "primary.main" }} />
          <Typography variant="body1" sx={{ textAlign: "justify", lineHeight: 1.7 }}>
            We use appropriate security measures to protect your information. However, please note no system is
            100% secure, but we strive to safeguard your data responsibly.
          </Typography>
        </Box>

        {/* Section 4 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
            Third-Party Services
          </Typography>
          <Divider sx={{ mb: 2, width: 60, borderWidth: 2, borderColor: "primary.main" }} />
          <Typography variant="body1" sx={{ textAlign: "justify", lineHeight: 1.7 }}>
            Sometimes, we may use trusted third-party service providers for catering, photography, or event
            management. These providers follow their own privacy practices.
          </Typography>
        </Box>

        {/* Section 5 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
            Updates to This Policy
          </Typography>
          <Divider sx={{ mb: 2, width: 60, borderWidth: 2, borderColor: "primary.main" }} />
          <Typography variant="body1">
            We may update this Privacy Policy from time to time. The latest version will always be available on this page.
          </Typography>
        </Box>

        {/* Section 6 */}
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
            Contact Us
          </Typography>
          <Divider sx={{ mb: 2, width: 60, borderWidth: 2, borderColor: "primary.main" }} />
          <Typography variant="body1">
            📧 Email: info@yourmahal.com <br />
            📞 Phone: +91 9444048899
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
