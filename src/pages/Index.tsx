
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Ticket, CalendarCheck, MicVocal, PartyPopper, Star } from 'lucide-react';
import TicketCard from '@/components/TicketCard';
import { TicketType } from '@/hooks/use-cart';
import EventCountdown from '@/components/EventCountdown';
import EventCarousel from '@/components/EventCarousel';

const featuredTickets: TicketType[] = [
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
    id: "earlybird-1",
    name: "Early Bird General Pass",
    description: "Get access to all standard events at a discounted early bird rate. Limited availability!",
    price: 1000,
    category: "earlybird",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVzdGl2YWx8ZW58MHx8MHx8fDA%3D",
    availableCount: 100,
  },
  {
    id: "proshow-1",
    name: "Star Night Concert",
    description: "Featuring top artists and bands performing live on the main stage with spectacular lighting and sound.",
    price: 1500,
    category: "proshow",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D",
    availableCount: 200,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] bg-cover bg-center flex items-center"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3)'
        }}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white">Eventsphere</h1>
            <p className="text-xl md:text-2xl text-white/80">
              Where Experiences Come to Life
            </p>
            <p className="text-lg text-white/70">May 15-17, 2026</p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link to="/tickets">
                <Button size="lg" className="bg-milan-600 hover:bg-milan-700">
                  <Ticket className="mr-2 h-5 w-5" />
                  Get Tickets
                </Button>
              </Link>
              <Link to="/schedule">
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  View Schedule
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Countdown */}
      <EventCountdown />

      {/* Live Event Carousel */}
      <EventCarousel />
      
      {/* Featured Tickets Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-milan-800">Featured Tickets</h2>
            <p className="text-muted-foreground mt-2">Grab your tickets before they're gone!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} featured={true} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/tickets">
              <Button variant="outline" size="lg">
                View All Tickets
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Events Preview */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-milan-800">What's Happening</h2>
            <p className="text-muted-foreground mt-2">Experience the best of Eventsphere</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden group hover:shadow-md transition-all duration-300">
              <div 
                className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3)' }}
              ></div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <PartyPopper className="h-5 w-5 text-milan-600 mr-2" />
                  <h3 className="font-bold text-lg">Pro Shows</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Experience electrifying performances from top artists and bands.
                </p>
                <Link to="/tickets?category=proshow">
                  <Button variant="link" className="p-0 h-auto mt-2 text-milan-600">
                    Get Tickets →
                  </Button>
                </Link>
              </div>
            </Card>
            
            <Card className="overflow-hidden group hover:shadow-md transition-all duration-300">
              <div 
                className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1575503802870-45de6a6217c8?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3)' }}
              ></div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <MicVocal className="h-5 w-5 text-milan-600 mr-2" />
                  <h3 className="font-bold text-lg">Comedy Nights</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Laugh out loud with top comedians performing their best routines.
                </p>
                <Link to="/tickets?category=comedy">
                  <Button variant="link" className="p-0 h-auto mt-2 text-milan-600">
                    Get Tickets →
                  </Button>
                </Link>
              </div>
            </Card>
            
            <Card className="overflow-hidden group hover:shadow-md transition-all duration-300">
              <div 
                className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3)' }}
              ></div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-milan-600 mr-2" />
                  <h3 className="font-bold text-lg">VIP Experience</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Get exclusive access, premium seating, and meet & greet opportunities.
                </p>
                <Link to="/tickets?category=vip">
                  <Button variant="link" className="p-0 h-auto mt-2 text-milan-600">
                    Get Tickets →
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-milan-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Eventsphere?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Don't miss out on the cultural extravaganza. Get your tickets now before they sell out!
          </p>
          <Link to="/tickets">
            <Button size="lg" className="bg-white text-milan-700 hover:bg-gray-100">
              Get Your Tickets Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
