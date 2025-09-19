"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  alpha,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import KitchenIcon from "@mui/icons-material/Kitchen";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import InfoIcon from "@mui/icons-material/Info";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function PricingSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // ============= Data =============
  const halls = [
    {
      name: "Thirumal Thirumagal Hall",
      image: "/thirumal-hall-banner.jpg",
      gradient: "linear-gradient(135deg,#FF6B6B 0%,#FF8E53 100%)",
      color: "#FF6B6B",
      features: [
        { label: "Rent", value: "₹3,00,000", icon: <CurrencyRupeeIcon /> },
        { label: "Caution Deposit", value: "₹1,05,000", icon: <CurrencyRupeeIcon /> },
        { label: "Capacity", value: "1000 persons", icon: <GroupsIcon /> },
        { label: "Marriage Hall", value: "First Floor (650 A/C)", icon: <MeetingRoomIcon /> },
        { label: "Dining Hall", value: "Ground Floor (250 A/C)", icon: <MeetingRoomIcon /> },
        { label: "A/C Rooms", value: "11 incl. Bridal Suite", icon: <AcUnitIcon /> },
        { label: "Vessels", value: "1000 persons", icon: <KitchenIcon /> },
        { label: "Parking", value: "Shared - Cars & Bikes", icon: <LocalParkingIcon /> },
      ],
    },
    {
      name: "Shri Meenakshi Sundarar Hall",
      image: "/meenakshi-hall-banner.jpg",
      gradient: "linear-gradient(135deg,#667EEA 0%,#764BA2 100%)",
      color: "#667EEA",
      features: [
        { label: "Rent", value: "₹1,75,000", icon: <CurrencyRupeeIcon /> },
        { label: "Caution Deposit", value: "₹95,000", icon: <CurrencyRupeeIcon /> },
        { label: "Capacity", value: "1000 persons", icon: <GroupsIcon /> },
        { label: "Marriage Hall", value: "3rd Floor (600 A/C)", icon: <MeetingRoomIcon /> },
        { label: "Dining Hall", value: "4th Floor (200)", icon: <MeetingRoomIcon /> },
        { label: "A/C Rooms", value: "6 incl. Bridal Suite", icon: <AcUnitIcon /> },
        { label: "Vessels", value: "1000 persons", icon: <KitchenIcon /> },
        { label: "Parking", value: "Shared - Cars & Bikes", icon: <LocalParkingIcon /> },
      ],
    },
  ];

  const services = [
    "Mugappu Pandal",
    "Plantain Trees (2 Nos)",
    "Decorative Serial Lights",
    "Security at Car Parking",
    "Water & Gas Supply",
    "Electricity",
    "Hall & Room Cleaning",
    "Vessel Cleaning",
    "Waste Disposal & Sanitation",
    "Generator Standby (extra running cost)",
  ];

  // ============= Animation Variants =============  
  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <Box sx={{  py: { xs: 5, md: 15 } }}>
      <Container maxWidth="lg">
        {/* Title */}
        <MotionBox
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          height={300}
          width={"100%"}
          sx={{ background:'url("/aboutbg.jpg") center/cover no-repeat',textAlign: "center", mb: 6 }}

        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg,#FF6B6B 0%,#667EEA 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              fontSize: { xs: 40, md: 50 },
            }}
          >
            Pricing & Capacity
          </Typography>
          <Typography sx={{ color: "#fff", fontSize: 18,  maxWidth: 650, mx: "auto" }}>
            Transparent pricing and modern facilities for your grand events.
          </Typography>
        </MotionBox>

        {/* Important Note */}
        <Fade in={mounted} timeout={800}>
          <Paper sx={{ p: 3, borderRadius: 3, mb: 6, background: alpha("#fdcb6e", 0.2) }}>
            <Box display="flex" alignItems="flex-start" gap={2}>
              <InfoIcon sx={{ color: "#e17055", fontSize: 30 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Important Information</Typography>
                <Typography>
                  Rent is for 24 hrs (2 PM–2 PM). Extra hours charged{" "}
                  <b style={{ color: "#e17055" }}>₹5,000/hr</b>.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>

        {/* Halls */}
        <Grid container spacing={4}>
          {halls.map((hall, i) => (
            <Grid key={hall.name} item xs={12} md={6}>
              <MotionCard
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                sx={{ borderRadius: 4, overflow: "hidden", boxShadow: 4 }}
              >
                {/* Banner */}
                <Box sx={{ position: "relative", height: 200 }}>
                  <Image src={hall.image} alt={hall.name} fill style={{ objectFit: "cover" }} />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      py: 1.5,
                      textAlign: "center",
                      background: hall.gradient,
                    }}
                  >
                    <Typography variant="h5" sx={{ color: "white", fontWeight: 700 }}>
                      {hall.name}
                    </Typography>
                    <Chip label="18% GST Extra" size="small" sx={{ mt: 1, color: "white" }} />
                  </Box>
                </Box>

                {/* Features */}
                <CardContent>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {hall.features.map((f, idx) => (
                          <TableRow key={idx} hover>
                            <TableCell sx={{ border: "none", py: 1.5 }}>
                              <Box display="flex" alignItems="center" gap={2}>
                                <Box
                                  sx={{
                                    p: 1,
                                    borderRadius: 2,
                                    bgcolor: alpha(hall.color, 0.1),
                                    color: hall.color,
                                    display: "flex",
                                  }}
                                >
                                  {f.icon}
                                </Box>
                                <Typography fontWeight={600}>{f.label}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ border: "none", py: 1.5, fontWeight: 700 }}>
                              {f.value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        {/* Services */}
        <Box mt={8}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: "center" }}>
            Included Services
          </Typography>
          <Grid container spacing={2}>
            {services.map((s, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 2,
                    alignItems: "center",
                    borderRadius: 2,
                    bgcolor: alpha("#667EEA", 0.04),
                    "&:hover": { bgcolor: alpha("#667EEA", 0.1) },
                  }}
                >
                  <CheckCircleIcon color="primary" fontSize="small" />
                  <Typography variant="body2">{s}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA */}
        <Box textAlign="center" mt={8}>
          <Button
            variant="contained"
            startIcon={<EventAvailableIcon />}
            sx={{
              px: 5,
              py: 1.8,
              borderRadius: 99,
              fontWeight: 700,
              background: "linear-gradient(135deg,#FF6B6B 0%,#FF8E53 100%)",
            }}
          >
            Book Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
