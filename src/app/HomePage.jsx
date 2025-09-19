// app/page.js
'use client';
import { Collections, EventAvailable } from '@mui/icons-material';
import { Box, Container, Typography, Button, keyframes } from '@mui/material';
import { useEffect, useState } from 'react';

// Keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;



const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 99, 72, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 20px rgba(255, 99, 72, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 99, 72, 0);
  }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const glow = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.6));
  }
  50% { 
    filter: drop-shadow(0 0 25px rgba(255, 140, 0, 0.8));
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const textGlow = keyframes`
  0%, 100% { 
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5),
                 0 0 20px rgba(255, 140, 0, 0.3),
                 0 0 30px rgba(255, 69, 0, 0.2);
  }
  50% { 
    text-shadow: 0 0 15px rgba(255, 215, 0, 0.7),
                 0 0 25px rgba(255, 140, 0, 0.5),
                 0 0 35px rgba(255, 69, 0, 0.3);
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Add some interactive effects on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const position = el.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.8) {
          el.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(0deg, rgba(10, 25, 41, 0.68) 50%, rgba(26, 58, 95, 0.5) 100%, rgba(10, 25, 41, 0.39) 100%), url("/hero-background.jpg") center/cover no-repeat fixed',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Animated decorative elements */}
          <Box sx={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
            animation: `${float} 6s ease-in-out infinite`,
            filter: 'blur(15px)',
          }} />
          
          <Box sx={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            mt: 2,
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            // background: 'radial-gradient(circle, rgba(255, 140, 0, 0.2) 0%, transparent 70%)',
            animation: `${float} 8s ease-in-out infinite 1s`,
            // filter: 'blur(10px)',
          }} />

          <Typography 
            variant="h1" 
            className={mounted ? 'animate-on-scroll' : ''}
            sx={{ 
              fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem', lg: '4.5rem' },
              fontWeight: 800,
              textAlign: 'center',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: `${mounted ? fadeIn : 'none'} 1s ease-out, 3s ease-in-out infinite`,
            //   textShadow: '0 0 30px rgba(255, 140, 0, 0.5)',
              letterSpacing: '-0.02em',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            Thirumal Thirumagal Vasantha Mahal A/C
          </Typography>

          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 3,
              width: '100%',
              maxWidth: '700px',
              mx: 'auto',
              position: 'relative',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.2s',
            }}
          >
            {/* Sunrise glow effect behind */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '100px',
                background: 'radial-gradient(ellipse at center, rgba(255, 217, 61, 0.4) 0%, rgba(255, 179, 71, 0.3) 40%, transparent 70%)',
                filter: 'blur(25px)',
                zIndex: 0,
                animation: `${pulse} 4s ease-in-out infinite`,
              }}
            />
            
            {/* Left sunrise line */}
            <Box
              sx={{
                flex: 1,
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #ff4757, #ff6348, #ff7675, #ff9ff3, #feca57, #ff6348, #ff4757)',
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, transparent, #ff4757, #feca57, #ff6348, transparent)',
                  animation: `${shimmer} 3s ease-in-out infinite`,
                },
              }}
            />
            
            {/* Center & symbol with sunrise colors */}
            <Typography
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 400,
                fontFamily: '"Playfair Display", serif',
                background: 'linear-gradient(135deg, #ff4757 0%, #ff6348 25%, #feca57 50%, #ff9ff3 75%, #ff6348 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                px: 3,
                position: 'relative',
                zIndex: 1,
                animation: `${glow} 2s ease-in-out infinite alternate, ${scaleIn} 1s ease-out`,
              }}
            >
              &
            </Typography>
            
            {/* Right sunrise line */}
            <Box
              sx={{
                flex: 1,
                height: '4px',
                background: 'linear-gradient(90deg, #ff4757, #ff6348, #feca57, #ff9ff3, #ff7675, #ff6348, #ff4757, transparent)',
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, transparent, #ff6348, #feca57, #ff4757, transparent)',
                  animation: `${shimmer} 3s ease-in-out infinite reverse`,
                },
              }}
            />
          </Box>
          
          <Typography 
            variant="h2" 
            className={mounted ? 'animate-on-scroll' : ''}
            sx={{ 
              fontSize: { xs: '1.3rem', sm: '1.8rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 600,
              mb: 4,
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.95)',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.4s',
              '& span': {
                background: 'linear-gradient(45deg, #FFD700, #FFA500, #FF8C00)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '0.8em',
                animation: `${textGlow} 3s ease-in-out infinite`,
              }
            }}
          >
            Shri Meenakshi Sundarar Hall A/C
          </Typography>
          
          <Typography 
            variant="body1" 
            className={mounted ? 'animate-on-scroll' : ''}
            sx={{ 
              mb: 5,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem', lg: '1.4rem' },
              textAlign: 'center',
              maxWidth: '900px',
              mx: 'auto',
              fontWeight: 300,
              letterSpacing: '0.02em',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 1px 10px rgba(0, 0, 0, 0.2)',
              px: { xs: 2, md: 0 },
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.6s',
            }}
          >
            Experience the perfect blend of tradition and luxury.
            <br />
            <Box component="span" sx={{ 
              fontSize: '0.9em', 
              opacity: 0.8,
              fontStyle: 'italic',
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Creating memories that last a lifetime in Chennai's premier wedding venues
            </Box>
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: { xs: 2, md: 3 }, 
            flexWrap: 'wrap',
            px: { xs: 2, md: 0 },
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.8s',
          }}>
            <Button 
              variant="contained" 
              size="large"
              startIcon={<EventAvailable />}
              className={mounted ? 'animate-on-scroll' : ''}
              sx={{
                background: 'linear-gradient(135deg, #FF8C00 0%, #FF6348 50%, #FF4757 100%)',
                color: 'white',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.2rem' },
                borderRadius: '50px',
                fontWeight: 600,
                boxShadow: '0 10px 30px rgba(255, 140, 0, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                textTransform: 'none',
                letterSpacing: '0.5px',
                animation: `${mounted ? pulse : 'none'} 2s infinite 2s`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #FF4757 0%, #FF6348 50%, #FF8C00 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
                '&:hover': {
                  transform: 'translateY(-3px) scale(1.02)',
                  boxShadow: '0 15px 40px rgba(255, 140, 0, 0.6)',
                  animation: 'none',
                  '&::before': {
                    opacity: 1,
                  }
                },
                '& .MuiButton-startIcon': {
                  transition: 'transform 0.3s ease',
                },
                '&:hover .MuiButton-startIcon': {
                  transform: 'rotate(10deg) scale(1.1)',
                }
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Book Your Dream Event</span>
            </Button>
            
            <Button 
              variant="outlined" 
              size="large"
              startIcon={<Collections />}
              className={mounted ? 'animate-on-scroll' : ''}
              sx={{
                borderColor: 'rgba(255, 215, 0, 0.7)',
                color: 'white',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.2rem' },
                borderRadius: '50px',
                borderWidth: 2,
                fontWeight: 600,
                backdropFilter: 'blur(20px)',
                background: 'rgba(255, 215, 0, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'none',
                letterSpacing: '0.5px',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 0,
                  height: 0,
                  background: 'rgba(255, 215, 0, 0.1)',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  transition: 'width 0.5s ease, height 0.5s ease',
                },
                                '&:hover': {
                  borderColor: '#FFD700',
                  backgroundColor: 'rgba(255, 215, 0, 0.15)',
                  transform: 'translateY(-3px) scale(1.02)',
                  boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)',
                  '&::before': {
                    width: '300px',
                    height: '300px',
                  }
                },
                '& .MuiButton-startIcon': {
                  transition: 'transform 0.3s ease',
                },
                '&:hover .MuiButton-startIcon': {
                  transform: 'rotate(-10deg) scale(1.1)',
                }
              }}
            >
              Explore Gallery
            </Button>
          </Box>
          
          {/* Scroll indicator */}
          <Box sx={{
            position: 'absolute',
            mt: 5,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: `${float} 2s ease-in-out infinite`,
            cursor: 'pointer',
            // opacity: 0.7,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1,
            }
          }}>
            <Box sx={{
              width: '30px',
              height: '50px',
              border: '2px solid rgba(255, 215, 0, 0.5)',
              borderRadius: '25px',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '10px',
                backgroundColor: '#FFD700',
                borderRadius: '2px',
                animation: `${float} 1.5s ease-in-out infinite`,
              }
            }} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
