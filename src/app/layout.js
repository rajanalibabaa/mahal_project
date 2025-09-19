// app/layout.js
import ThemeRegistry from '@/Components/ThemeRegistry/ThemeRegistry';
import Navbar from '@/Components/Navbar';

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
          </main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
