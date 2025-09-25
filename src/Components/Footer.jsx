"use client";
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  // Unique heading style with underline slash
  const headingStyle = {
    fontWeight: "bold",
    mb: 2,
    position: "relative",
    display: "inline-block",
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: -4,
      width: "40%",
      height: "3px",
      bgcolor: "secondary.main",
      borderRadius: "2px",
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        mt: 8,
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} justifyContent={"space-between"}>
          {/* Location */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={headingStyle}>Our Location</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
              Thirumal Thirumagal Vasanth Mahal A/C
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
              Shri Meenakshi Sundarar Hall A/C
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
              7-B, M.T.H. Road, Padi, Chennai - 600050
            </Typography>
            <Typography
              sx={{
                cursor: "pointer",
                color: "secondary.light",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => router.push("/contact")}
            >
              View on map
            </Typography>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={headingStyle}>Contact</Typography>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
              <strong>DR.G. CHANDRASEKAR</strong>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              📞 26545656, 26545757, 9444048899
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              📧 mahal@gmail.com
            </Typography>
            <Typography variant="body2">⏰ 08:00 AM – 08:00 PM</Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={headingStyle}>Quick Links</Typography>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", mb: 1, "&:hover": { color: "secondary.light" } }}
              onClick={() => router.push("/calender")}
            >
              Book Events
            </Typography>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", mb: 1, "&:hover": { color: "secondary.light" } }}
              onClick={() => router.push("/gallery")}
            >
              Gallery
            </Typography>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", mb: 1, "&:hover": { color: "secondary.light" } }}
              onClick={() => router.push("/facilities")}
            >
              Facilities
            </Typography>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", mb: 1, "&:hover": { color: "secondary.light" } }}
              onClick={() => router.push("/about")}
            >
              About Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", "&:hover": { color: "secondary.light" } }}
              onClick={() => router.push("/contact")}
            >
              Contact Us
            </Typography>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={headingStyle}>Follow Us</Typography>
            <Box>
              <IconButton href="https://facebook.com" target="_blank" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton href="https://youtube.com" target="_blank" color="inherit">
                <YouTubeIcon />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" color="inherit">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Divider & Bottom Note */}
        <Divider sx={{ my: 3, backgroundColor: "rgba(255,255,255,0.3)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography component={"span"} sx={{ opacity: 0.85 }}>
            © {new Date().getFullYear()} TTVM & SMSH. All Rights Reserved.
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <Typography
              variant="caption"
              sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
              onClick={() => router.push("/privacy")}
            >
              Privacy Policy
            </Typography> |
            <Typography
              variant="caption"
              sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
              onClick={() => router.push("/disclimer")}
            >
              Disclaimer
            </Typography>
          </Box>
          </Typography>
          
        </Box>
      </Container>
    </Box>
  );
}
