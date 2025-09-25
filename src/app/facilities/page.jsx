"use client";

import FAQSection from "@/Components/FaqComponents";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

// Facility data
const facilities = [
  { title: "Spacious Parking", image: "/facilities/parking.jpg" },
  { title: "Modern Kitchen", image: "/facilities/kitchen.jpg" },
  { title: "Outdoor Lawn", image: "/facilities/outdoor.jpg" },
  { title: "Indoor Halls", image: "/facilities/indoor.jpg" },
  { title: "Banquet Hall", image: "/facilities/hall.jpg" },
  { title: "VIP Rooms", image: "/facilities/room.jpg" },
  { title: "Decoration Setup", image: "/facilities/decor.jpg" },
  { title: "Lighting & Sound", image: "/facilities/sound.jpg" },
];

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function FacilitiesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", width: "100%" }}>
        
        {/* Hero Banner Full Width */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Box
            sx={{
              width: "100%",
              height: { xs: 280, md: 420 },
              backgroundImage: "url('/facilites.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",

              alignItems: "center",
              textAlign: "center",
              color: "#fff",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4))",
              }}
            />
            <Box sx={{ position: "relative", zIndex: 2, px: 2 }}>
              <Typography
                variant={isMobile ? "h4" : "h2"}
                fontWeight={800}
                sx={{ mb: 2 }}
              >
                Our Facilities
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: 800,
                  mx: "auto",
                  fontWeight: 400,
                  opacity: 0.9,
                }}
              >
                Premium amenities designed to make every event comfortable,
                memorable, and world-class.
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: "center", marginTop: "4rem" }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: "#000",
              fontWeight: 600,
              fontSize: { xs: "1.4rem", md: "2rem" },
            }}
          >
            Ready to celebrate your special moment with us?
          </Typography>
          <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
            <Link href="/calender">
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "50px",
                  padding: "14px 42px",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#fff",
                  background: "linear-gradient(135deg, #F97A00 0%, #FF9800 100%)",
                  transition: "all 0.4s ease",
                  boxShadow: "0 8px 25px rgba(249, 122, 0, 0.35)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #ff8f2e 0%, #f57c00 100%)",
                    boxShadow: "0 12px 30px rgba(249, 122, 0, 0.55)",
                  },
                }}
              >
                Book Your Event Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Facilities Grid Full Width */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginTop: "4rem", width: "100%" }}
        >
          <Grid
            container
            spacing={3}
            sx={{ px: { xs: 2, sm: 4, md: 6 }, maxWidth: "100%" }}
          >
            {facilities.map((facility, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    translateY: -6,
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Card
                    elevation={4}
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      border: "1px solid #f1f1f1",
                    }}
                  >
                    <Box
                      component="img"
                      src={facility.image}
                      alt={facility.title}
                      sx={{
                        width: "100%",
                        height: { xs: 160, md: 200 },
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                        "&:hover": { transform: "scale(1.08)" },
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          color: "#333",
                          mt: 1,
                        }}
                      >
                        {facility.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>

      {/* FAQ Section */}
      <FAQSection />
    </>
  );
}
