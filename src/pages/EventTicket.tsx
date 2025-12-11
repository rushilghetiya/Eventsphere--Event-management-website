import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { events } from '@/data/events';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Minus, Plus, ArrowLeft, Ticket } from "lucide-react";
import { useCart, TicketType } from '@/hooks/use-cart';
import { getCategoryColor, getCategoryIcon } from "@/utils/eventUtils";

const eventImages: Record<string, string> = {
  "event-10": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60",
  "event-11": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=60",
  "event-12": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60",
  "event-13": "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&auto=format&fit=crop&q=60",
};

const defaultImage = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60";

const ticketTiers = [
  { id: 'general', name: 'General Admission', priceMultiplier: 1, description: 'Standard entry with general standing area' },
  { id: 'premium', name: 'Premium Pass', priceMultiplier: 1.5, description: 'Priority entry, closer to stage' },
  { id: 'vip', name: 'VIP Experience', priceMultiplier: 2.5, description: 'Meet & greet, exclusive lounge, best viewing area' },
];

const EventTicket = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedTier, setSelectedTier] = useState('general');
  const [quantity, setQuantity] = useState(1);
  
  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <Link to="/schedule">
          <Button>Back to Schedule</Button>
        </Link>
      </div>
    );
  }

  const CategoryIcon = getCategoryIcon(event.category);
  const basePrice = event.featured ? 2500 : 1000;
  const currentTier = ticketTiers.find(t => t.id === selectedTier) || ticketTiers[0];
  const ticketPrice = Math.round(basePrice * currentTier.priceMultiplier);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    const ticket: TicketType = {
      id: `${event.id}-${selectedTier}`,
      name: `${event.title} - ${currentTier.name}`,
      description: event.description,
      price: ticketPrice,
      category: 'celebrity',
      image: eventImages[event.id] || defaultImage,
      availableCount: 100,
      eventId: event.id,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      eventCity: event.city,
    };
    
    addToCart(ticket, quantity);
    setQuantity(1);
  };

  return (
    <div className="container py-8 max-w-5xl">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Event Image & Info */}
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src={eventImages[event.id] || defaultImage} 
              alt={event.title}
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge className={`${getCategoryColor(event.category)} mb-2`}>
                {CategoryIcon && <CategoryIcon className="h-3 w-3 mr-1" />}
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{event.title}</h1>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{event.description}</p>
              
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-milan-600" />
                  <div>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-milan-600" />
                  <div>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-milan-600" />
                  <div>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-sm text-muted-foreground">{event.city}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Ticket Selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                Select Tickets
              </CardTitle>
              <CardDescription>Choose your ticket tier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ticketTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTier === tier.id 
                      ? 'border-milan-600 bg-milan-50' 
                      : 'border-border hover:border-milan-300'
                  }`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                    <p className="font-bold text-milan-700">
                      {formatPrice(Math.round(basePrice * tier.priceMultiplier))}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Ticket Type</span>
                <span className="font-medium">{currentTier.name}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Quantity</span>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-milan-700">
                    {formatPrice(ticketPrice * quantity)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-milan-600 hover:bg-milan-700 h-12 text-lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventTicket;
