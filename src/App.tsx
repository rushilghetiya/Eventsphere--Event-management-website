
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Tickets from "./pages/Tickets";
import Schedule from "./pages/Schedule";
import Sponsors from "./pages/Sponsors";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { CartProvider } from "./hooks/use-cart";
import { AuthProvider } from "./hooks/use-auth";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <main>
                            <Index />
                          </main>
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/tickets" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <main>
                            <Tickets />
                          </main>
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/schedule" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <main>
                            <Schedule />
                          </main>
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/sponsors" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <main>
                            <Sponsors />
                          </main>
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/contact" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <main>
                            <Contact />
                          </main>
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/cart" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <main>
                            <Cart />
                          </main>
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/checkout" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <main>
                            <Checkout />
                          </main>
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/confirmation" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <main>
                            <Confirmation />
                          </main>
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="*" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <main>
                            <NotFound />
                          </main>
                        </>
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
