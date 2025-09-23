"use client";
import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    altNumber: "",
    message: "",
    startDateTime: "",
    endDateTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState({
    open: false,
    message: "",
    success: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("formData :",formData)

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxoMV6OpxobuZkOkPXl0F1e08-wziZgDh9MHDKfi0uB7HH9ehQd8dkp1ER5vD8v1dkT/exec",
        {
          method: "POST",
          mode:"no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("res :", response);

      setFormData({
        name: "",
        number: "",
        altNumber: "",
        message: "",
        startDateTime: "",
        endDateTime: "",
      });

      setDialog({
        open: true,
        message: "Form submitted successfully!",
        success: true,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setDialog({
        open: true,
        message: "Failed to submit form. Please try again.",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/thirumal2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "2rem 1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Container with responsive layout */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          width: "100%",
          maxWidth: "1200px",
          marginTop: "4rem",
        }}
      >
        {/* Contact Form */}
        <div
          style={{
            flex: "1 1 400px",
            minWidth: "300px",
            maxWidth: "600px",
            padding: "30px",
            borderRadius: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Contact / Booking
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                padding: "15px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="tel"
              name="number"
              placeholder="Enter your phone number"
              value={formData.number}
              onChange={handleChange}
              required
              style={{
                padding: "15px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="tel"
              name="altNumber"
              placeholder="Enter alternate phone number"
              value={formData.altNumber}
              onChange={handleChange}
              style={{
                padding: "15px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            {/* Booking Start DateTime */}
            <label style={{ fontWeight: "bold" }}>Booking Start</label>
            <input
              type="datetime-local"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
              required
              style={{
                padding: "15px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            {/* Booking End DateTime */}
            <label style={{ fontWeight: "bold" }}>Booking End</label>
            <input
              type="datetime-local"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleChange}
              required
              style={{
                padding: "15px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <textarea
              name="message"
              placeholder="Write your message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              style={{
                padding: "15px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px",
                background: loading
                  ? "gray"
                  : "linear-gradient(90deg, #cc4334, #dc45bb)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) =>
                !loading && (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div
          style={{
            flex: "1 1 400px",
            minWidth: "300px",
            maxWidth: "600px",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.7261555812393!2d80.1884081!3d13.1012479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5263f3bff3a9db%3A0xd4ea3840d363ce02!2sThirumal%20Thirumagal%20Vasantha%20Mahal!5e0!3m2!1sen!2sin!4v1727000000000!5m2!1sen!2sin"
            style={{ border: 0, width: "100%", height: "100%" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Dialog Box */}
      {dialog.open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px 30px",
              borderRadius: "10px",
              textAlign: "center",
              maxWidth: "400px",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            <h3
              style={{
                color: dialog.success ? "green" : "red",
                marginBottom: "10px",
              }}
            >
              {dialog.success ? "Success" : "Error"}
            </h3>
            <p>{dialog.message}</p>
            <button
              onClick={() => setDialog({ ...dialog, open: false })}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                background: "linear-gradient(90deg, #cc4334, #dc45bb)",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
