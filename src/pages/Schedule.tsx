
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Music, Users, MicVocal, Sparkles } from "lucide-react";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  city: string;
  category: "concert" | "comedy" | "cultural" | "workshop";
  venue: "main-stage" | "auditorium" | "open-air" | "workshop-hall";
  featured?: boolean;
};

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("all-venues");
  
  const events: Event[] = [
    // Main Stage Events
    {
      id: "event-1",
      title: "Eventsphere Opening Ceremony",
      description: "Official inauguration of Eventsphere 2024 with special performances and guest speeches.",
      date: "May 15, 2024",
      time: "9:00 AM - 11:00 AM",
      location: "Main Stage",
      city: "Mumbai",
      category: "cultural",
      venue: "main-stage",
    },
    {
      id: "event-2",
      title: "Star Night Concert",
      description: "Featuring top artists and bands performing live with spectacular lighting and sound.",
      date: "May 15, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "Main Stage",
      city: "Mumbai",
      category: "concert",
      venue: "main-stage",
    },
    {
      id: "event-3",
      title: "EDM Night",
      description: "Dance to the beats of popular DJs in this high-energy electronic dance music event.",
      date: "May 16, 2024",
      time: "8:00 PM - 11:00 PM",
      location: "Main Stage",
      city: "Mumbai",
      category: "concert",
      venue: "main-stage",
    },

    // Auditorium Events
    {
      id: "event-4",
      title: "Stand-up Comedy Night",
      description: "Laugh out loud with top comedians performing their best routines exclusively for Eventsphere 2024.",
      date: "May 16, 2024",
      time: "6:00 PM - 8:00 PM", 
      location: "Auditorium",
      city: "Delhi",
      category: "comedy",
      venue: "auditorium",
    },
    {
      id: "event-5",
      title: "Cultural Performance",
      description: "Experience the rich cultural diversity through traditional dance and music performances.",
      date: "May 17, 2024",
      time: "4:00 PM - 6:00 PM",
      location: "Auditorium",
      city: "Bangalore",
      category: "cultural",
      venue: "auditorium",
    },
    
    // Open Air Events
    {
      id: "event-6",
      title: "Battle of Bands",
      description: "College bands compete for the title of Eventsphere 2024 Best Band with original compositions.",
      date: "May 15, 2024",
      time: "3:00 PM - 6:00 PM",
      location: "Open Air Arena",
      city: "Chennai",
      category: "concert",
      venue: "open-air",
    },
    {
      id: "event-7",
      title: "Cultural Night",
      description: "Experience the rich cultural diversity through traditional performances and modern interpretations.",
      date: "May 17, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "Open Air Arena",
      city: "Hyderabad",
      category: "cultural",
      venue: "open-air",
    },
    
    // Workshop Hall Events
    {
      id: "event-8",
      title: "Music Production Workshop",
      description: "Learn music production techniques from industry professionals in this interactive session.",
      date: "May 16, 2024",
      time: "11:00 AM - 1:00 PM",
      location: "Workshop Hall",
      city: "Kolkata",
      category: "workshop",
      venue: "workshop-hall",
    },
    {
      id: "event-9",
      title: "Dance Workshop",
      description: "Learn popular dance styles from professional choreographers in this hands-on workshop.",
      date: "May 17, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "Workshop Hall",
      city: "Pune",
      category: "workshop",
      venue: "workshop-hall",
    },
    
    // Adding celebrity concerts as requested
    {
      id: "event-10",
      title: "Arijit Singh Live in Concert",
      description: "An unforgettable night with Arijit Singh performing his biggest hits live on stage.",
      date: "June 10, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "Jawaharlal Nehru Stadium",
      city: "Delhi",
      category: "concert",
      venue: "main-stage",
      featured: true,
    },
    {
      id: "event-11",
      title: "A.R. Rahman Musical Night",
      description: "The Mozart of Madras brings his magical compositions to life in this spectacular show.",
      date: "June 17, 2024",
      time: "6:30 PM - 10:30 PM",
      location: "DY Patil Stadium",
      city: "Mumbai",
      category: "concert",
      venue: "main-stage",
      featured: true,
    },
    {
      id: "event-12",
      title: "Badshah DJ Night",
      description: "India's rap sensation Badshah with his electrifying DJ set and live performance.",
      date: "July 5, 2024",
      time: "8:00 PM - 11:30 PM",
      location: "Phoenix Marketcity",
      city: "Bangalore",
      category: "concert",
      venue: "open-air",
      featured: true,
    },
    {
      id: "event-13",
      title: "Shreya Ghoshal Live",
      description: "Spend an evening with the melodious voice of Shreya Ghoshal performing live.",
      date: "July 15, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "YMCA Grounds",
      city: "Chennai",
      category: "concert",
      venue: "main-stage",
      featured: true,
    },
  ];
  
  const getCategoryIcon = (category: Event['category']) => {
    switch (category) {
      case 'concert':
        return <Music className="h-4 w-4" />;
      case 'comedy':
        return <MicVocal className="h-4 w-4" />;
      case 'cultural':
        return <Sparkles className="h-4 w-4" />;
      case 'workshop':
        return <Users className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'concert':
        return "bg-blue-100 text-blue-800";
      case 'comedy':
        return "bg-purple-100 text-purple-800";
      case 'cultural':
        return "bg-amber-100 text-amber-800";
      case 'workshop':
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };
  
  const filteredEvents = activeTab === "all-venues" 
    ? events 
    : events.filter(event => event.venue === activeTab);
  
  // Group events by date
  const eventsByDate = filteredEvents.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, Event[]>);
  
  const sortedDates = Object.keys(eventsByDate).sort();
  
  return (
    <div className="container py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-milan-800">Eventsphere Schedule</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Plan your Eventsphere experience! Browse events by location and date to make the most of our concerts and events.
        </p>
      </div>
      
      <Tabs defaultValue="all-venues" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center">
          <TabsList className="bg-muted/60">
            <TabsTrigger value="all-venues" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>All Venues</span>
            </TabsTrigger>
            <TabsTrigger value="main-stage" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Main Stage</span>
            </TabsTrigger>
            <TabsTrigger value="auditorium" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Auditorium</span>
            </TabsTrigger>
            <TabsTrigger value="open-air" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Open Air</span>
            </TabsTrigger>
            <TabsTrigger value="workshop-hall" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Workshop Hall</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-8">
            {sortedDates.map(date => (
              <div key={date} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-milan-600" />
                  <h2 className="text-xl font-semibold">{date}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {eventsByDate[date].map(event => (
                    <Card key={event.id} className={`overflow-hidden hover:shadow-md transition-all duration-300 ${event.featured ? 'border-milan-600' : ''}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            {event.featured && (
                              <div className="text-xs font-semibold text-red-600 animate-pulse mt-1">
                                Celebrity Event!
                              </div>
                            )}
                          </div>
                          <Badge variant="outline" className={`${getCategoryColor(event.category)} flex items-center gap-1`}>
                            {getCategoryIcon(event.category)}
                            <span>{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
                          </Badge>
                        </div>
                        <CardDescription>{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}, {event.city}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Schedule;
