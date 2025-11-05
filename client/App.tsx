import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";

// Pages
import Index from "./pages/Index";
import Homestays from "./pages/Homestays";
import HomestayDetail from "./pages/HomestayDetail";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { Placeholder } from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

// Icons for placeholders
import { Compass, BookOpen, Users, BarChart3 } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/homestays" element={<Homestays />} />
            <Route path="/homestays/:id" element={<HomestayDetail />} />
            <Route
              path="/destinations"
              element={
                <Placeholder
                  title="Explore Destinations"
                  description="Discover amazing places to visit with detailed information about attractions, local guides, and travel tips."
                  icon={<Compass size={80} />}
                />
              }
            />
            <Route
              path="/guides"
              element={
                <Placeholder
                  title="Local Guides & Experiences"
                  description="Connect with experienced local guides who share authentic experiences, tips, and insights about their communities."
                  icon={<BookOpen size={80} />}
                />
              }
            />
            <Route
              path="/dashboard/:role"
              element={
                <Placeholder
                  title="Dashboard"
                  description="Manage your account, bookings, listings, and more in one centralized location."
                  icon={<BarChart3 size={80} />}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
