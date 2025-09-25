'use client';
import React, { useEffect, useState } from 'react';
import { 
  Grid, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Container,
  useTheme,
  useMediaQuery,
  alpha,
  Button
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const eventTypes = [
  {
    id: 1,
    title: 'Wedding',
    image: '/wedding.jpg',
    description: 'Make your special day memorable',
    color: '#FF6B6B'
  },
  {
    id: 2,
    title: 'Reception',
    image: '/reception.jpg',
    description: 'Celebrate with family and friends',
    color: '#4ECDC4'
  },
  {
    id: 3,
    title: 'Engagement',
    image: '/engament.jpg',
    description: 'Begin your journey together',
    color: '#FFD166'
  },
  {
    id: 4,
    title: 'Birthday Party',
    image: '/birthday.jpg',
    description: 'Celebrate another year of life',
    color: '#6A0572'
  },
  {
    id: 5,
    title: 'Seemantham/Valaikappu',
    image: '/seemantham.jpg',
    description: 'Traditional baby shower ceremony',
    color: '#118AB2'
  },
  {
    id: 6,
    title: 'Poonal/Upanayanam',
    image: '/poonal.jpg',
    description: 'Sacred thread ceremony',
    color: '#06D6A0'
  },
  {
    id: 7,
    title: 'Manjal Neerattu (Puberty)',
    image: '/puberty.jpg',
    description: 'Coming of age celebration',
    color: '#FF9E00'
  },
  {
    id: 8,
    title: 'Wedding Anniversary',
    image: '/weddingAnnevesry.jpg',
    description: 'Celebrate years of togetherness',
    color: '#9A031E'
  },
  {
    id: 9,
    title: 'Sangeet & Mehandi',
    image: '/sangeeth.jpg',
    description: 'Pre-wedding festivities',
    color: '#7209B7'
  }
];


const MotionCard = motion(Card);

export default function EventTypesGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -15,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    hover: {
      y: -15,
      rotateY: 5,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box sx={{ 
      py: 10, 
    //   background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(255, 107, 107, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
      }
    }}>
      <Container maxWidth="lg">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 800,
              background: '#143D60',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            Events We Host
          </Typography>
          <Typography
            variant="h6"
            sx={{ 
              mb: 6, 
              maxWidth: '600px', 
              mx: 'auto',
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontWeight: 300,
              lineHeight: 1.6
            }}
          >
            From traditional ceremonies to modern celebrations, we make every occasion special and unforgettable
          </Typography>
        </motion.div>

        {/* Event Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
       <Grid container justifyContent="space-evenly"   spacing={6}>
    {eventTypes.map((event, index) => (
      <Grid item xs={12} sm={6} md={4} key={event.id}>
        <MotionCard
          variants={cardVariants}
          whileHover="hover"
          onHoverStart={() => setHoveredCard(event.id)}
          onHoverEnd={() => setHoveredCard(null)}
          sx={{
            minWidth: 350,
            height: "100%",
            borderRadius: "24px",
            overflow: "hidden",
            background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            cursor: "pointer",
            boxShadow:
              "0 10px 40px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(45deg, ${alpha(
                event.color,
                0.1
              )} 0%, transparent 100%)`,
              opacity: 0,
              transition: "opacity 0.3s ease",
            },
            "&:hover::before": {
              opacity: 1,
            },
          }}
        >
                  {/* Image Container */}
                  <Box sx={{ 
                    position: 'relative', 
                    height: 240,
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5'
                  }}>
                    <motion.div
                      variants={imageVariants}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        style={{ 
                          objectFit: 'cover',
                        }}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </motion.div>
                    
                    {/* Overlay on hover */}
                    <AnimatePresence>
                      {hoveredCard === event.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(180deg, transparent 0%, ${alpha(event.color, 0.8)} 100%)`,
                            display: 'flex',
                            alignItems: 'flex-end',
                            padding: '1.5rem',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ 
                              color: 'white', 
                              fontSize: '0.95rem',
                              fontWeight: 500,
                              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                            }}
                          >
                            {event.description}
                          </Typography>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Color accent bar */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${event.color}, ${alpha(event.color, 0.7)})`,
                      }}
                    />
                  </Box>

                  {/* Card Content */}
                  <CardContent sx={{ 
                    p: 3,
                    textAlign: 'center',
                    background: 'transparent',
                    position: 'relative'
                  }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#2d3748',
                        mb: 1,
                        fontSize: '1.3rem',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {event.title}
                    </Typography>
                    
                  

                    {/* Animated decorative element */}
                    <Box
                      sx={{
                        width: '60px',
                        height: '3px',
                        background: `linear-gradient(90deg, ${event.color}, ${alpha(event.color, 0.5)})`,
                        borderRadius: '3px',
                        mx: 'auto',
                        mt: 2,
                        opacity: hoveredCard === event.id ? 1 : 0.7,
                        transform: hoveredCard === event.id ? 'scaleX(1.5)' : 'scaleX(1)',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>
        {/* Call to Action */}
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
      </Container>
    </Box>
  );
}