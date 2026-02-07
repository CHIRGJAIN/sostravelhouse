import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 overflow-hidden rounded-2xl bg-card shadow-xl border border-border"
          >
            <div className="gradient-primary p-4">
              <h3 className="font-heading text-lg font-bold text-primary-foreground">Talk to an Expert</h3>
              <p className="text-sm text-primary-foreground/80">We typically reply within minutes</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="rounded-lg bg-muted p-3 text-sm text-foreground">
                Hi! 👋 How can we help you plan your perfect trip?
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Message"
                />
                <Button size="icon" className="shrink-0" aria-label="Send message">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Or call us: <a href="tel:9811622000" className="font-medium text-primary">9811622000</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label={isOpen ? "Close chat" : "Talk to an expert"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        )}
      </button>
    </div>
  );
}
