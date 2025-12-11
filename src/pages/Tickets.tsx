import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketCard from '@/components/TicketCard';
import { TicketType } from '@/hooks/use-cart';
import { Ticket, Star, MicVocal, Sparkles } from "lucide-react";

const Tickets = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const tickets: TicketType[] = [
    // VIP Tickets
    {
      id: "vip-1",
      name: "VIP All Access Pass",
      description: "Get exclusive access to all events, premium seating, and meet & greet opportunities with performers.",
      price: 5000,
      category: "vip",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uY2VydCUyMHZpcHxlbnwwfHwwfHx8MA%3D%3D",
      availableCount: 50,
    },
    {
      id: "vip-2",
      name: "VIP Weekend Pass",
      description: "Premium access to all weekend events with exclusive lounge access and complementary refreshments.",
      price: 3500,
      category: "vip",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbmNlcnQlMjB2aXB8ZW58MHx8MHx8fDA%3D",
      availableCount: 75,
    },
    {
      id: "vip-3",
      name: "VIP Single Day Pass",
      description: "Experience Eventsphere 2026 in style with premium seating and fast-track entry for one day of your choice.",
      price: 2000,
      category: "vip",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbmNlcnQlMjB2aXB8ZW58MHx8MHx8fDA%3D",
      availableCount: 100,
    },
    
    // Pro Shows
    {
      id: "proshow-1",
      name: "Star Night Concert",
      description: "Featuring top artists and bands performing live on the main stage with spectacular lighting and sound.",
      price: 1500,
      category: "proshow",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D",
      availableCount: 200,
    },
    {
      id: "proshow-2",
      name: "EDM Night",
      description: "Dance to the beats of popular DJs in this high-energy electronic dance music event.",
      price: 1200,
      category: "proshow",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVkbSUyMHBhcnR5fGVufDB8fDB8fHww",
      availableCount: 300,
    },
    {
      id: "proshow-3",
      name: "Cultural Night",
      description: "Experience the rich cultural diversity through traditional performances and modern interpretations.",
      price: 800,
      category: "proshow",
      image: "https://images.unsplash.com/photo-1604514821845-93281d4df2b7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3VsdHVyYWwlMjBkYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
      availableCount: 250,
    },
    
    // Comedy Nights
    {
      id: "comedy-1",
      name: "Stand-up Comedy Night",
      description: "Laugh out loud with top comedians performing their best routines exclusively for Eventsphere 2026.",
      price: 800,
      category: "comedy",
      image: "https://images.unsplash.com/photo-1575503802870-45de6a6217c8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RhbmQlMjB1cCUyMGNvbWVkeXxlbnwwfHwwfHx8MA%3D%3D",
      availableCount: 150,
    },
    {
      id: "comedy-2",
      name: "Comedy Improv Show",
      description: "Witness spontaneous comedy as performers create hilarious scenes based on audience suggestions.",
      price: 600,
      category: "comedy",
      image: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1wcm92JTIwY29tZWR5fGVufDB8fDB8fHww",
      availableCount: 100,
    },
    
    // Early Bird
    {
      id: "earlybird-1",
      name: "Early Bird General Pass",
      description: "Get access to all standard events at a discounted early bird rate. Limited availability!",
      price: 1000,
      category: "earlybird",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVzdGl2YWx8ZW58MHx8MHx8fDA%3D",
      availableCount: 100,
    },
    {
      id: "earlybird-2",
      name: "Early Bird Day Pass",
      description: "Single day access to all standard events at special early bird pricing. Book soon!",
      price: 500,
      category: "earlybird",
      image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmVzdGl2YWx8ZW58MHx8MHx8fDA%3D",
      availableCount: 200,
    },
  ];
  
  const filteredTickets = activeTab === "all" 
    ? tickets 
    : tickets.filter(ticket => ticket.category === activeTab);
  
  return (
    <div className="container py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-milan-800">Eventsphere 2026 Tickets</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Secure your spot at Eventsphere 2026! Choose from our various ticket options below and prepare for an unforgettable experience.
        </p>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center">
          <TabsList className="bg-muted/60">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Ticket className="h-4 w-4" />
              <span>All Tickets</span>
            </TabsTrigger>
            <TabsTrigger value="vip" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>VIP</span>
            </TabsTrigger>
            <TabsTrigger value="proshow" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span>Pro Shows</span>
            </TabsTrigger>
            <TabsTrigger value="comedy" className="flex items-center gap-1">
              <MicVocal className="h-4 w-4" />
              <span>Comedy</span>
            </TabsTrigger>
            <TabsTrigger value="earlybird" className="flex items-center gap-1">
              <Ticket className="h-4 w-4" />
              <span>Early Bird</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map(ticket => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                featured={ticket.id === "vip-1" || ticket.id === "earlybird-1"} 
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tickets;
