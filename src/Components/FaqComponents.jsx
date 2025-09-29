"use client";
import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";

// FAQ Data
const faqs = [
  {
    question: "What is the capacity of the Mahal?",
    answer:
      "The Mahal can hold up to 1000+ guests comfortably for weddings, receptions, and other functions.",
  },
  
  {
    question: "Do you provide catering?",
    answer:
      "Yes, catering services are available with only vegetarian .",
  },
  {
    question: "Can we bring our own caterers or decorators?",
    answer:
      "No, outside caterers and decorators are allowed with prior permission.",
  },
  {
    question: "Is parking available?",
    answer: "Yes, we have parking space for all vehicles.",
  },
  {
    question: "Is the hall air-conditioned?",
    answer: "Yes, we have  AC  available.",
  },
  {
    question: "What facilities are included?",
    answer:
      "Basic stage, seating, lighting,  Additional services like catering, decoration, and photography can be arranged.",
  },
  {
    question: "Do you have rooms for the bride and guests?",
    answer: "Yes, we provide a bridal suite and guest rooms.",
  },
  {
    question: "How early should we book?",
    answer:
      "It is best to book 3–12 months in advance, especially during peak wedding season.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellations made in advance may get a partial refund. Please contact us for specific details.",
  },
  { 
    question: "How do we book the Mahal?",
    answer:
      "You can book by calling us, sending an email, or visiting the Mahal directly or through our website.",
  },
];

// Framer Motion Animation Variant
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function FAQSection() {
  return (
    <Container sx={{ py: 10 }}>
      <Box textAlign="center" mb={5}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ letterSpacing: "1px", color: "primary.main" }}
        >
          ❓ Frequently Asked Questions
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Find answers to the most common questions about our Mahal & services
        </Typography>
      </Box>

      <Box maxWidth="md" mx="auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
          >
            <Accordion
              sx={{
                borderRadius: 2,
                mb: 2,
                overflow: "hidden",
                boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:before": { display: "none" },
                "&:hover": {
                  boxShadow: "0 8px 22px rgba(0,0,0,0.2)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  backgroundColor: "rgba(255, 152, 0, 0.1)",
                }}
              >
                {faq.question}
              </AccordionSummary>
              <AccordionDetails sx={{ background: "#fafafa" }}>
                <Typography variant="body1">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
}
