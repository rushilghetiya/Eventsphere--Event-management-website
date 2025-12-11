
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Ticket } from "lucide-react";
import { TicketType, useCart } from '@/hooks/use-cart';
import { useState } from 'react';

type TicketCardProps = {
  ticket: TicketType;
  featured?: boolean;
};

const TicketCard: React.FC<TicketCardProps> = ({ ticket, featured = false }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const increaseQuantity = () => {
    if (ticket.availableCount && quantity >= ticket.availableCount) return;
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const cardClasses = featured 
    ? "border-milan-600 shadow-md shadow-milan-100 transform hover:scale-105 transition-all" 
    : "hover:border-milan-400 transition-colors";
  
  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'vip': return 'bg-milan-600 text-white';
      case 'proshow': return 'bg-indigo-600 text-white';
      case 'comedy': return 'bg-amber-500 text-white';
      case 'earlybird': return 'bg-emerald-600 text-white';
      case 'celebrity': return 'bg-pink-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };
  
  return (
    <Card className={`${cardClasses} h-full flex flex-col`}>
      <div 
        className="h-40 bg-cover bg-center rounded-t-lg relative"
        style={{ backgroundImage: `url(${ticket.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent rounded-t-lg"></div>
        <div className={`absolute top-2 right-2 ${getBadgeColor(ticket.category)} px-2 py-1 rounded-full text-xs font-bold`}>
          {ticket.category === 'vip' ? 'VIP' : 
           ticket.category === 'proshow' ? 'Pro Show' : 
           ticket.category === 'comedy' ? 'Comedy Night' : 
           ticket.category === 'celebrity' ? 'Celebrity' : 'Early Bird'}
        </div>
        
        {featured && (
          <div className="absolute top-2 left-2 bg-white text-milan-800 px-2 py-1 rounded-full text-xs font-bold flex items-center animate-pulse-slow">
            <Ticket className="h-3 w-3 mr-1" />
            Featured
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{ticket.name}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">{ticket.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3 flex-grow">
        <p className="text-2xl font-bold text-milan-700">{formatPrice(ticket.price)}</p>
        {ticket.availableCount && (
          <p className="text-xs text-muted-foreground mt-1">
            {ticket.availableCount} tickets remaining
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-3 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8" 
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8" 
              onClick={increaseQuantity}
              disabled={ticket.availableCount ? quantity >= ticket.availableCount : false}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button 
            onClick={() => {
              addToCart(ticket, quantity);
              setQuantity(1);
            }}
            className="bg-milan-600 hover:bg-milan-700"
          >
            Add to cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
