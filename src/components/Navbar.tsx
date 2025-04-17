
import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ShoppingCart, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from '@/hooks/use-cart';
import AuthButton from './AuthButton';

const Navbar = () => {
  const { totalItems } = useCart();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-milan-600">Milan 2024</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium transition-colors hover:text-milan-600">
            Home
          </Link>
          <Link to="/tickets" className="font-medium transition-colors hover:text-milan-600">
            Tickets
          </Link>
          <Link to="/schedule" className="font-medium transition-colors hover:text-milan-600">
            Schedule
          </Link>
          <Link to="/sponsors" className="font-medium transition-colors hover:text-milan-600">
            Sponsors
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <AuthButton />
          
          <Link to="/cart">
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-milan-600 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t">
        <div className="container flex justify-between py-2">
          <Link to="/" className="flex flex-col items-center text-xs font-medium">
            <span className="text-milan-600">Home</span>
          </Link>
          <Link to="/tickets" className="flex flex-col items-center text-xs font-medium">
            <Ticket className="h-5 w-5 mb-1" />
            <span>Tickets</span>
          </Link>
          <Link to="/schedule" className="flex flex-col items-center text-xs font-medium">
            <Calendar className="h-5 w-5 mb-1" />
            <span>Schedule</span>
          </Link>
          <Link to="/sponsors" className="flex flex-col items-center text-xs font-medium">
            <Award className="h-5 w-5 mb-1" />
            <span>Sponsors</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
