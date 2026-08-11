"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Magnetic } from "@/components/ui/Magnetic";
import { apiClient } from "@/lib/axios";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await apiClient.post('/api/contact', data);

      if (response.status >= 200 && response.status < 300) {
        setStatus("success");
      } else {
        setStatus("idle");
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background/25 text-foreground flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-foreground">
            Get in touch.
          </h1>
          <p className="text-lg text-muted-foreground">
            Have a question or want to collaborate? Send a message below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-background/40 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl shadow-black/5 border border-border"
        >
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center text-center py-12"
            >
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-foreground">Message Sent!</h2>
              <p className="text-muted-foreground">We&apos;ll get back to you as soon as possible.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                  <input required type="text" id="name" name="name" className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <input required type="email" id="email" name="email" className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="github" className="text-sm font-medium text-foreground">GitHub (Optional)</label>
                  <input type="text" id="github" name="github" className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground" placeholder="github.com/username" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="instagram" className="text-sm font-medium text-foreground">Instagram (Optional)</label>
                  <input type="text" id="instagram" name="instagram" className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground" placeholder="@username" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <textarea required id="message" name="message" rows={5} className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-foreground" placeholder="What's on your mind?"></textarea>
              </div>

              <div className="pt-4 flex justify-end">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:brightness-110 hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100 shadow-lg shadow-primary/20"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                </Magnetic>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
