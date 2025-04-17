
import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from '@/hooks/use-cart';

const Navbar = () => {
  const { totalItems } = useCart();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-milan-600">Milan 2024</span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/" className="font-medium transition-colors hover:text-milan-600">
            Home
          </Link>
          <Link to="/tickets" className="font-medium transition-colors hover:text-milan-600">
            Tickets
          </Link>
          <Link to="/schedule" className="font-medium transition-colors hover:text-milan-600">
            Schedule
          </Link>
          <Link to="/about" className="font-medium transition-colors hover:text-milan-600">
            About
          </Link>
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
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
