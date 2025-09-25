"use client";

import { Box, Grid, Card, CardContent, Typography, useTheme, useMediaQuery,Button } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import CountUp from "react-countup";

const statsData = [
  {
    count: 10000,
    suffix: "+",
    subtitle: "Happy Couples",
    image: "/status1.jpg",
    gradient: "#f84f4fff",
  },
  {
    count: 5,
    suffix: ".0⭐",
    subtitle: "Star Rating",
    image: "/status2.jpg",
    gradient: "#f84f4fff",
  },
  {
    count: 1000,
    suffix: "+",
    subtitle: "Weddings Hosted",
    image: "/status3.jpg",
    gradient: "#f84f4fff",
  },
  {
    count: 150,
    suffix: "+",
    subtitle: "Specialized Services",
    image: "/status4.jpg",
    gradient: "#f84f4fff",
  },
  {
    count: 1000,
    suffix: "+",
    subtitle: "Cultural Events",
    image: "/status5.jpg",
    gradient: "#f84f4fff",
  },
  {
    count: 550,
    suffix: "+",
    subtitle: "Premium Venues",
    image: "/status6.jpg",
    gradient: "#f84f4fff",
  },
];

// Animation variants
const cardVariants = {
  hiddenLeft: { opacity: 0, x: -80, scale: 0.95 },
  hiddenRight: { opacity: 0, x: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 },
  },
};

export default function StatsSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: "#ffffff",
        position: "relative",
      }}
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: { xs: 2, md: 7 },
            fontWeight: 800,
            textAlign: "center",
            background: "#2e3133ff",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            letterSpacing: "-0.02em",
            textShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          Our Mahal Journey
        </Typography>
      </motion.div>

      {/* First Row → 4 Cards */}
      <Grid container spacing={3} justifyContent="space-evenly" maxWidth="lg" sx={{ mx: "auto" }}>
        {statsData.slice(0, 4).map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={index % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card
                elevation={4}
                sx={{
                  borderRadius: 4,
                  textAlign: "center",
                  height: "100%",
                  background: "#fff",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                <CardContent>
                  <Box sx={{ display: "inline-flex", justifyContent: "center", mb: 2 }}>
                    <img src={stat.image} alt={stat.subtitle} style={{ width: 250, height: 200 }} />
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ background: stat.gradient, backgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    <CountUp start={0} end={stat.count} duration={2} suffix={stat.suffix} enableScrollSpy />
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {stat.subtitle}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Second Row → 2 Cards Centered */}
      <Grid container spacing={3} justifyContent="center" maxWidth="lg" sx={{ mx: "auto", mt: 4 }}>
        {statsData.slice(4, 6).map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={index % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card
                elevation={4}
                sx={{
                  borderRadius: 4,
                  textAlign: "center",
                  height: "100%",
                  background: "#fff",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                <CardContent>
                  <Box sx={{ display: "inline-flex", justifyContent: "center", mb: 2 }}>
                    <img src={stat.image} alt={stat.subtitle} style={{ width: 250, height: 200 }} />
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ background: stat.gradient, backgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    <CountUp start={0} end={stat.count} duration={2.5} suffix={stat.suffix} enableScrollSpy />
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {stat.subtitle}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          style={{ textAlign: 'center', marginTop: '5rem' }}
        >
          <Typography
            variant="h5"
            sx={{ 
              mb: 3, 
              color: '#000000ff',
              fontWeight: 600,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Ready to celebrate your special moment with us now ?
          </Typography>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
<Link href="/calender">
            <Button
  variant="outlined"
  size="large"
  sx={{
    position: "relative",
    overflow: "hidden",
    borderRadius: "50px",
    padding: "16px 48px",
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "white",
    border: "none",
    background: "#F97A00",
    // backgroundSize: "300% 300%",
    animation: "gradientShift 6s ease infinite",
    // boxShadow: "0 10px 30px rgba(255, 107, 107, 0.4)",
    cursor: "pointer",
   

    // bubble container
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 0%, transparent 40%)",
      backgroundSize: "200% 200%",
      opacity: 0.6,
      animation: "bubbles 6s linear infinite",
    },
  }}
>
  Book Your Event Now
</Button>
</Link>

          </motion.div>
        </motion.div>
    </Box>
  );
}
