"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Typography,
  Box,
  Paper,
  alpha,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
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
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import Link from "next/link";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function PricingSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const halls = [
    {
      name: "Thirumal Thirumagal Vasantha Mahal A/C",
      image: "/firstmahal.jpg",
      color: "#FF6B6B",
      features: [
        { label: "Rent", icon: <CurrencyRupeeIcon /> },
        { label: "Caution Deposit / Maintenance charges", icon: <InfoOutlinedIcon /> },
        { label: "Taxes ( at present 18% )", icon: <GavelIcon /> },
        { label: "Total Capacity ( persons )", icon: <GroupsIcon /> },
        { label: "Marriage Hall", icon: <MeetingRoomIcon /> },
        { label: "Seating Capacity ( persons )", icon: <MeetingRoomIcon /> },
        { label: "Dining Hall", icon: <MeetingRoomIcon /> },
        { label: "A/C Rooms ( including Bride and Bridegroom )", icon: <AcUnitIcon /> },
        { label: "Cooking Vessels and Serving Vessels", icon: <KitchenIcon /> },
        { label: "Parking space for Cars & Two wheelers", icon: <LocalParkingIcon /> },
      ],
    },
    {
      name: "Shri Meenakshi Sundarar Hall",
      image: "/secondmaha;.jpg",
      color: "#667EEA",
      features: [
        { label: "Rent", icon: <CurrencyRupeeIcon /> },
        { label: "Caution Deposit / Maintenance charges", icon: <InfoOutlinedIcon /> },
        { label: "Taxes ( at present 18% )", icon: <GavelIcon /> },
        { label: "Total Capacity ( persons )", icon: <GroupsIcon /> },
        { label: "Marriage Hall", icon: <MeetingRoomIcon /> },
        { label: "Seating Capacity ( persons )", icon: <MeetingRoomIcon /> },
        { label: "Dining Hall", icon: <MeetingRoomIcon /> },
        { label: "A/C Rooms ( including Bride and Bridegroom )", icon: <AcUnitIcon /> },
        { label: "Cooking Vessels and Serving Vessels", icon: <KitchenIcon /> },
        { label: "Parking space for Cars & Two wheelers", icon: <LocalParkingIcon /> },
      ],
    },
  ];

  const cautionServices = [
    "Mugappu Pandal",
    "Plantain Trees (2 Nos)",
    "Decorative Serial Lights at Mandapam",
    "Security at Car Parking Area",
    "Water Supply",
    "Gas Cylinder",
    "Electricity",
    "Marriage & Dining Hall Cleaning",
    "Rooms Cleaning",
    "Vessels Cleaning",
    "Leaf Removal",
    "Garbage Cleaning",
    "Sanitary Charges",
    "Generator Standby (running charges extra)",
  ];

  const terms = [
    "Outside Flower and Interior Decorators are not allowed.",
    "Outside items (Cooking vessels, cameras, sound equipment) need prior approval.",
    "Stage power usage should not exceed 3000 watts.",
    "Management is not responsible for valuables or belongings.",
    "Do not use the Lift for shifting materials.",
    "Children must be accompanied while using the Lift.",
    "Bookings must be informed at least one day earlier.",
    "All Government Rules including CORONA guidelines must be followed.",
    "Marriage Packages available on request.",
    "Cancellation not allowed; postponement only. No refund.",
    "GST charged extra as applicable.",
    "By booking, you agree to all terms.",
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box
      sx={{
        fontFamily: "'Inter', 'Roboto', sans-serif",
        position: "relative",
        minHeight: "100vh", // ensure container covers full viewport height
        width: "100%",
      }}
    >
      {/* Background Image with Blur */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          height: "100vh",
          width: "100%",
          zIndex: -1,
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "contain",
          },
        }}
      >
        <Image src="/about.jpg" alt="Background" fill style={{ objectFit: "cover" }} />
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Title */}
        <MotionBox
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          textAlign="center"
          mt={10}
          mb={8}
        >
         <Typography 
                     variant="h1" 
                     className={mounted ? 'animate-on-scroll' : ''}
                     sx={{ 
                       fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem', lg: '3rem' },
                       fontWeight: 800,
                       textAlign: 'center',
                       lineHeight: 1.5,
                       background: 'linear-gradient(135deg, #ff0000ff 0%, #FFA500 50%, #ff0000ff 100%)',
                       backgroundClip: 'text',
                       WebkitBackgroundClip: 'text',
                       WebkitTextFillColor: 'transparent',
                      //  animation: `${mounted ? fadeIn : 'none'} 1s ease-out, 3s ease-in-out infinite`,
                     //   textShadow: '0 0 30px rgba(255, 140, 0, 0.5)',
                       letterSpacing: '-0.02em',
                      //  opacity: mounted ? 1 : 0,
                      //  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                       transition: 'all 0.8s ease-out',
                     }}
                   >
                     Thirumal Thirumagal Vasantha Mahal A/C  Shri Meenakshi Sundarar Hall A/C
                   </Typography>
                   <Typography fontWeight={800} color="#fbff07ff" fontSize={{ xs: '1rem', sm: '1.2rem', md: '1.4rem', lg: '1.2rem' }} mt={2} sx={{textShadow: '0 0 30px rgba(0, 0, 0, 0.9)'}} >
               Day Rent Timing: (2 PM – 2 PM) hr.
            </Typography>
        </MotionBox>

        {/* Notes */}
    
 <Link href={"/contact"} >
        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            startIcon={<EventAvailableIcon />}
            sx={{
              mb:{ xs: 2, md: 20 },
              mt: { xs: 2, md: 5 },
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
        {/* Hall Cards */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
          {halls.map((hall, i) => (
            <MotionCard
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              sx={{
                width: { xs: "100%", md: "48%" },
                borderRadius: 5,
                overflow: "hidden",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                backdropFilter: "blur(6px)",
              }}
            >
              <Box sx={{ position: "relative", height: 220 }}>
                <Image src={hall.image} alt={hall.name} fill style={{ objectFit: "cover" }} />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    // background: alpha("#000", 0.4),
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    p: 3,
                  }}
                >
                  <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
                    {hall.name}
                  </Typography>
                </Box>
              </Box>
              <Box p={3}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {hall.features.map((f, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        flex: { xs: "1 1 100%", md: "1 1 48%" },
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: "grey.50",
                        "&:hover": { bgcolor: "grey.100" },
                        transition: "0.2s",
                      }}
                    >
                      <Box color="primary.main">{f.icon}</Box>
                      <Typography color="black" variant="body2" fontWeight={600}>
                        {f.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </MotionCard>
          ))}
        </Box>

                {/* Note */}
       <Fade in={mounted} timeout={800}>
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 4,
      mb: 8,
      mt: 8,
      // backdropFilter: "blur(10px)",
      // background: alpha("#8e44ad", 0.85), // semi-transparent purple background
      textAlign: "center",
    }}
  >
    <Typography fontWeight={400} color="error" textAlign={"start"} letterSpacing={2}> {/* white text for contrast */}
     *** CAUTION: For the Caution Deposit/Maintenance charges following services
      will be provided (will vary depending upon the consumption of
      Electricity and Gas)
    </Typography>
  </Paper>
</Fade>


       

       


        {/* Services Covered */}
        <Box mt={10} sx={{ background: "#ffffffff", p: "1.2rem", borderRadius: "20px" }}>
          <Typography variant="h3" textAlign="center" fontWeight={800} mb={4}>
            Services Covered in Caution Deposit
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {cautionServices.map((s, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" },
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderRadius: 3,
                  // bgcolor: alpha("#667EEA", 0.04),
                  "&:hover": { bgcolor: alpha("#667EEA", 0.1) },
                  transition: "0.2s",
                }}
              >
                <CheckCircleIcon color="primary" fontSize="small" />
                <Typography variant="body2">{s}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
 <Link href={"/contact"} >
        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            startIcon={<EventAvailableIcon />}
            sx={{
              mb: "20px",
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
         {/* Note */}
        <Fade in={mounted} timeout={800}>
  <Paper
    elevation={0}
    sx={{
      p: 3, 
      borderRadius: 4,
      mb: 8,
      mt: 8,
      // backdropFilter: "blur(10px)",
      // background: alpha("#4a90e2", 0.85), // changed background color
      textAlign: "center",
    }}
  >
    <Typography fontWeight={400} color="error" letterSpacing={2} textAlign={'start'}> {/* changed text color */}
      *** NOTE:  Generator Stand by Charges: Generator running charges will be extra
      per hour basic during Electricity / power cut. Other Terms & Conditions
    </Typography>
  </Paper>
</Fade>

        {/* Terms & Conditions */}
        <Box mt={10} sx={{ background: "#ffffffff", p: "1.2rem", borderRadius: "20px" }}>
          <Typography variant="h3" textAlign="center" fontWeight={800} mb={4}>
            Terms & Conditions
          </Typography>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              background: alpha("#000", 0.02),
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <List>
              {terms.map((t, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <InfoOutlinedIcon color="error" />
                  </ListItemIcon>
                  <ListItemText primary={t} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* CTA */}
        <Link href={"/contact"} >
        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            startIcon={<EventAvailableIcon />}
            sx={{
              mb: "20px",
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
      </Container>
    </Box>
  );
}
