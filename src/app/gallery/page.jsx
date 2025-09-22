"use client"
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


const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      title: "Explore Nature",
      description: "Discover the beauty of the natural world",
      image:
        "/gallery/download.jpg",
    },{
      title: "Explore Nature",
      description: "Discover the beauty of the natural world",
      image:
        "/gallery/download.jpg",
    },{
      title: "Explore Nature",
      description: "Discover the beauty of the natural world",
      image:
        "/gallery/download.jpg",
    },{
      title: "Explore Nature",
      description: "Discover the beauty of the natural world",
      image:
        "/gallery/download.jpg",
    },{
      title: "Explore Nature",
      description: "Discover the beauty of the natural world",
      image:
        "/gallery/download.jpg",
    },{
      title: "Explore Nature",
      description: "Discover the beauty of the natural world",
      image:
        "/gallery/download.jpg",
    },{
      title: "Explore Nature",
      description: "Discover the beauty of the natural world",
      image:
        "/gallery/download.jpg",
    },{
      title: "Explore Nature",
      description: "Discover the beauty of the natural world",
      image:
        "/gallery/download.jpg",
    },{
      title: "Explore Nature",
      description: "Discover the beauty of the natural world",
      image:
        "/gallery/download.jpg",
    },{
      title: "Explore Nature",
      description: "Discover the beauty of the natural world",
      image:
        "/gallery/download.jpg",
    },{
      title: "Explore Nature",
      description: "Discover the beauty of the natural world",
      image:
        "/gallery/download.jpg",
    },
  ]
  
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
    <Box sx={{ flexGrow: 1, p: 2 ,mt:"5rem"}}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Photo Gallery
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mt: 1 }}>
          Explore our Thirumal Thirumagal Vasantha Mahal gallery of informative and inspiring images
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
              onClick={()=>{handleImageOnclick(item.image)}}
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
  );
};

export default Gallery;