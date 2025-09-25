// app/layout.js
import ThemeRegistry from '@/Components/ThemeRegistry/ThemeRegistry';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
export const metadata = {
  title: "Mahal Project",
  description: "Welcome to Mahal Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <main >
            <Navbar />
            {children}
            <Box
          component="a"
          href="https://wa.me/919444048899" // replace with your number
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#25D366",
            color: "white",
            borderRadius: "50%",
            width: 60,
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
            zIndex: 2000,
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0px 6px 16px rgba(0,0,0,0.4)",
            },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 35 }} />
        </Box>
            <Footer/>
          </main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
