"use client";
import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    altNumber: "",
    message: "",
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

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxoMV6OpxobuZkOkPXl0F1e08-wziZgDh9MHDKfi0uB7HH9ehQd8dkp1ER5vD8v1dkT/exec",
        {
          method: "POST",
          mode: "no-cors",
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/thirumal2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "90%",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          marginTop: "5rem",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Contact Us</h2>

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
              !loading &&
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
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
