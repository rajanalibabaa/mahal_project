"use client";
import React, { useState } from "react";
import {
  Grid,
  CardMedia,
  Typography,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "@/Components/Footer";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      title: "Grand Dining Hall",
      description:
        "Spacious dining area to serve large gatherings with comfort and style.",
      image: "/gallery/gal1.JPG",
    },
    {
      title: "Traditional Dining Experience",
      description: "Spacious dining hall with neatly arranged banana leaf seat",
      image: "/gallery/gal2.JPG",
    },
    {
      title: "Spacious Parking",
      description:
        "Ample parking space designed for convenience and safety of all guests.",
      image: "/gallery/gal3.JPG",
    },
    {
      title: "Stage & Lighting",
      description:
        "Well-lit stage setup with vibrant lighting arrangements for the perfect ambience.",
      image: "/gallery/gal4.JPG",
    },
    {
      title: "Modern Architectural Design",
      description:
        "A perfect blend of modern style and cultural richness reflected in the Mahal’s interior.",

      image: "/gallery/gal5.JPG",
    },
    {
      title: "Luxurious Interior",
      description:
        "Beautifully designed interiors with modern architecture blended with tradition.",

      image: "/gallery/gal6.JPG",
    },
    {
      title: "Elegant Exterior",
      description:
        "A grand exterior that creates the perfect first impression for your special day.",
      image: "/gallery/gal7.JPG",
    },
    {
      title: "Grand Mahal Entrance",
      description:
        "A majestic entrance with traditional architecture that welcomes guests with elegance.",
      image: "/gallery/gal8.JPG",
    },
    {
      title: "Divine Blessings",
      description:
        "Traditional temple setup within the Mahal for conducting rituals and seeking blessings before the ceremony.",
      image: "/gallery/gal9.JPG",
    },
    {
      title: "Sacred Temple Space",
      description:
        "A serene and divine temple inside the Mahal, providing a spiritual ambience for auspicious beginnings.",
      image: "/gallery/gal10.JPG",
    },
    {
      title: "Majestic Mahal Exterior",
      description:
        "A stunning exterior view of the Mahal, designed with elegance and traditional charm.",
      image: "/gallery/gal11.JPG",
    },
    {
      title: "Floral Archway Welcome",
      description:
        "Elegant floral arch and decorative lights at the entrance, creating a warm and festive vibe.",
      image: "/gallery/gal12.JPG",
    },
    {
      title: "Stunning Decorations",
      description:
        "Exquisite floral and theme-based decorations to make your celebration unforgettable.",
      image: "/gallery/gal13.JPG",
    },
    {
      title: "Easy Access & Navigation",
      description:
        "Wide entry and exit points with clear directions, ensuring smooth vehicle movement.",
      image: "/gallery/gal14.JPG",
    },
    {
      title: "Secure Vehicle Parking",
      description:
        "Well-monitored parking area with proper lighting and security arrangements for guests’ safety.",
      image: "/gallery/gal15.JPG",
    },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // mobile screen
  const handleImageOnclick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 2, mt: "5rem" }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Photo Gallery
          </Typography>
          <Typography variant="body1" sx={{ color: "gray", mt: 1 }}>
            Explore our Thirumal Thirumagal Vasantha Mahal gallery of
            informative and inspiring images
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {galleryItems.map((item, index) => {
            const itemsPerRow = 3;
            const rowNumber = Math.floor(index / itemsPerRow); // 0-based row index
            const positionInRow = index % itemsPerRow;

            // Reverse pattern for every other row
            const isFirstOfRow =
              rowNumber % 2 === 0
                ? positionInRow === 0
                : positionInRow === itemsPerRow - 1;

            let mdSize = isFirstOfRow ? 6 : 3; // desktop

            return (
              <Grid
                key={index}
                item
                xs={4} // 3 per row on mobile
                sm={6}
                md={mdSize}
                sx={{
                  flexGrow: 1,
                  minWidth: 0,
                  display: "flex",
                  ...(isFirstOfRow &&
                    !isMobile && {
                      flexBasis: "45vw",
                      maxWidth: "45vw",
                    }),
                }}
              >
                <Paper
                  onClick={() => {
                    handleImageOnclick(item.image);
                  }}
                  elevation={3}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 2,
                    height: {
                      xs: 120,
                      sm: 180,
                      md: 200,
                    },
                    width: {
                      xs: 120, // mobile
                      sm: 200, // tablet
                      md: "100%", // desktop
                    },
                    flexGrow: 1,
                    "&:hover": { "& .overlay": { opacity: 1 } },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                    sx={{ width: "100%", objectFit: "cover" }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {item.title}
                    </Typography>
                    {item.description && (
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, textAlign: "center", px: 1 }}
                      >
                        {item.description}
                      </Typography>
                    )}
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <Dialog open={open} onClose={handleClose} maxWidth="md">
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "red",
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent sx={{ p: 0 }}>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </DialogContent>
        </Dialog>
      </Box>
      <Footer />
    </>
  );
};

export default Gallery;
