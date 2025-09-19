// app/components/Navbar/Navbar.jsx
'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemText,
  Box,
  Container,
  ListItemButton,
  useScrollTrigger,
  ListItemIcon,
  Divider,
  alpha
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CollectionsIcon from '@mui/icons-material/Collections';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'About Us', href: '/about', icon: <MiscellaneousServicesIcon /> },
  { label: 'Facilities', href: '/facilities', icon: <ApartmentIcon /> },
  { label: 'Gallery', href: '/gallery', icon: <CollectionsIcon /> },
  { label: 'Calendar', href: '/calender', icon: <CalendarMonthIcon /> },
  { label: 'Contact Us', href: '/contact', icon: <ContactMailIcon /> }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ 
      height: '100vh', 
      background: 'linear-gradient(0deg, rgba(10, 25, 41, 0.68) 50%, rgba(26, 58, 95, 0.5) 100%, rgba(10, 25, 41, 0.39) 100%), url("/hero-background.jpg") center/cover no-repeat fixed',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%)',
        pointerEvents: 'none'
      }
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2.5,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        background: alpha('#000000', 0.5),
        backdropFilter: 'blur(10px)',
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'white', 
            fontWeight: 'bold',
            fontSize: '1.5rem',
            letterSpacing: '1px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.52)'
          }}
        >
          Mahal Project
        </Typography>
        <IconButton 
          onClick={handleDrawerToggle} 
          sx={{ 
            color: 'white',
            backgroundColor: alpha('#ffffff', 0.1),
            '&:hover': {
              backgroundColor: alpha('#ffffff', 0.2),
              transform: 'rotate(90deg)',
              transition: 'transform 0.3s ease, background-color 0.2s ease'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ pt: 3 }}>
        {navItems.map((item, index) => (
          <React.Fragment key={item.label}>
            <ListItemButton 
              component={Link}
              href={item.href}
              onClick={handleDrawerToggle}
              sx={{
                color: 'white',
                py: 2.5,
                px: 3,
                mx: 2,
                borderRadius: '12px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: alpha('#ffffff', 0.15),
                  transform: 'translateX(8px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '4px',
                  height: 0,
                  backgroundColor: '#fff',
                  transition: 'height 0.3s ease',
                  borderRadius: '0 2px 2px 0'
                },
                '&:hover::before': {
                  height: '60%',
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: '#ffffff', 
                minWidth: 40,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{
                  fontSize: '1.1rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <>
 
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: trigger 
            ? 'linear-gradient(205deg, #c966ea95 0%, #a24b71bc 100%)' 
            : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        //   backdropFilter: 'blur(200px)',
          borderBottom: trigger 
            ? 'none' 
            : '1px solid rgba(255,255,255,0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: trigger 
            ? '0 8px 32px rgba(31, 38, 135, 0.2)' 
            : 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ 
            height: { xs: 70, md: 80 },
            px: { xs: 2, md: 0 }
          }}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                flexGrow: 1,
                fontWeight: 'bold',
                fontSize: { xs: '1.4rem', md: '1.8rem' },
                color: 'white',
                textDecoration: 'none',
                letterSpacing: '1px',
                textShadow: trigger ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -5,
                  left: 0,
                  width: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #fff, rgba(255,255,255,0.6))',
                  transition: 'width 0.3s ease',
                  borderRadius: '2px'
                },
                '&:hover::after': {
                  width: '100%',
                }
              }}
            >
              Mahal Project
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              gap: 1,
              alignItems: 'center',
              background: trigger ? alpha('#ffffff', 0.1) : 'transparent',
              borderRadius: '50px',
              px: 2,
              py: 0.5,
              backdropFilter: 'blur(100px) saturate(200%)',
              border: trigger ? '1px solid rgba(255,255,255,0.2)' : 'none',
              transition: 'all 0.3s ease'
            }}>
              {navItems.map((item, index) => (
                <React.Fragment key={item.label}>
                  <Button
                    component={Link}
                    href={item.href}
                    startIcon={item.icon}
                    sx={{
                      color: 'white',
                      px: 2.5,
                      py: 1.2,
                      borderRadius: '25px',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden',
                      '&:hover': {
                        backgroundColor: alpha('#ffffff', 0.15),
                        transform: 'translateY(-2px)',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                      },
                      '& .MuiButton-startIcon': {
                        mr: 1,
                        transition: 'all 0.3s ease'
                      },
                      '&:hover .MuiButton-startIcon': {
                        transform: 'rotate(360deg) scale(1.1)'
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: '100%',
                        background: alpha('#ffffff', 0.1),
                        transition: 'width 0.3s ease',
                        borderRadius: '25px',
                        zIndex: -1
                      },
                      '&:hover::before': {
                        width: '100%',
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                  {index < navItems.length - 1 && (
                    <Divider 
                      orientation="vertical" 
                      flexItem 
                      sx={{ 
                        mx: 0.5,
                        height: '20px',
                        alignSelf: 'center',
                        backgroundColor: alpha('#ffffff', 0.3),
                      }} 
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={handleDrawerToggle}
                sx={{ 
                  color: 'white',
                  backgroundColor: alpha('#ffffff', 0.15),
                  backdropFilter: 'blur(10px)',
                  ml: 1,
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.25),
                    transform: 'scale(1.05)',
                    transition: 'all 0.2s ease'
                  }
                }}
              >
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: { xs: '85%', sm: 320 },
            maxWidth: '100%',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
