"use client";

import { Box, Typography, Grid, Divider } from "@mui/material";
import Image from "next/image";

const EcoFriendly = () => {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 6, md: 0 },
        // backgroundColor: "#F9FAF9",
      }}
    >
      <Grid container justifyContent="center" spacing={{ xs: 2, md: 8 }} alignItems="center">
        {/* Left Section - Text */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" ml={{ xs: 18, md: 0 }} fontWeight={700} color="green" gutterBottom>
            Eco Friendly
          </Typography>

          <Divider
         
            sx={{
              width: 60,
              height: "4px",
              backgroundColor: "green",
              borderRadius: 2,
              mb: 3,
               ml: { xs: 20, md: 0 },
            }}
          />

          <Typography
            variant="body1"
            sx={{
              color: "#444",
              lineHeight: 1.7,
              maxWidth: 500,
            }}
          >
            At our Thirumal Thirumagal Vasantha Mahal & Shri Meenakshi Sundarar Hall, we believe in celebrating responsibly. Our
            eco-friendly practices include minimizing waste, conserving energy,
            and using sustainable materials wherever possible. By blending
            tradition with sustainability, we ensure that your special day is
            also kind to nature.
          </Typography>
        </Grid>

        {/* Right Section - Image */}
        <Grid item xs={12} md={6}>
         <Image
         src='/eco.png'
         alt='Eco Friendly'
         width={500}
         height={500}
         />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EcoFriendly;
