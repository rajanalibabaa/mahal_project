// app/layout.js
import ThemeRegistry from '@/Components/ThemeRegistry/ThemeRegistry';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// ✅ Global SEO Metadata for your Mahal project
export const metadata = {
  title: "Thirumal Thirumagal Vasantha Mahal | Shri Meenakshi Sundarar Hall | Best Marriage Hall in Chennai ",
  description:
    "Book Thirumal Thirumagal Vasantha Mahal, the best marriage hall in Chennai with AC halls, catering, parking & decoration packages. Perfect for weddings, receptions & events.",
  keywords:
    "marriage hall in Chennai, Shri Meenakshi Sundarar Hall, wedding halls Chennai, banquet halls, reception halls, affordable marriage halls,•	Marriage hall in Padi,Marriage hall in Kolathur,Marriage hall in Korattur,Marriage hall in Ambattur,Marriage hall in Anna Nagar,Wedding halls in Padi,Wedding halls in Kolathur,Wedding halls in Korattur,Wedding halls in Ambattur,Wedding halls in Anna Nagar,Banquet halls in Padi,Banquet halls in Kolathur,Banquet halls in Korattur,Banquet halls in Ambattur,	Banquet halls in Anna Nagar",
  openGraph: {
    title: "Thirumal Thirumagal Vasantha Mahal | Best Marriage Hall in Chennai | Affordable marriage hall in Padi|•	Budget marriage hall in Kolathur| AC marriage hall in Korattur| Best wedding hall in Ambattur| Luxury marriage hall in Anna Nagar| Small marriage hall in Kolathur| Large marriage hall in Ambattur| Marriage hall with catering in Padi| Marriage hall with decoration in Anna Nagar| Marriage hall booking in Korattur| Cheap and best marriage hall in Kolathur| Top wedding halls in Anna Nagar",
    description:
      "Thirumal Thirumagal Vasantha Mahal , a premium wedding venue in Chennai offering AC halls, catering, decoration, and affordable packages,	Mini halls in Ambattur,Party halls in Anna Nagar,Engagement halls in Kolathur,	Reception halls in Padi,Birthday party halls in Korattur,Function halls near Ambattur,Banquet & marriage halls near Anna Nagar",
    url: "https://yourdomain.com",
    siteName: "Sri Venkateswara Mahal",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg", // 🔄 replace with your hall image
        width: 1200,
        height: 630,
        alt: "Thirumal Thirumagal Vasantha Mahal | Shri Meenakshi Sundarar Hall | Best - Marriage Hall in Chennai",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navbar />

          {/* Main page content only */}
          <main>{children}</main>

          {/* Floating WhatsApp Button */}
          <Box
            component="a"
            href="https://wa.me/919444048899"
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

          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
