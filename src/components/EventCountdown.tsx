import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { events } from "@/data/events";

const EventCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Get the next featured event
  const nextFeaturedEvent = events
    .filter(event => event.featured)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  useEffect(() => {
    if (!nextFeaturedEvent) return;

    const calculateTimeLeft = () => {
      const eventDate = new Date(nextFeaturedEvent.date);
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [nextFeaturedEvent]);

  if (!nextFeaturedEvent) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Next Big Event</h2>
          <p className="text-muted-foreground">Don't miss out on the most anticipated event!</p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden border-2 border-primary/20 shadow-xl">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
            <h3 className="text-2xl md:text-3xl font-bold text-center">
              {nextFeaturedEvent.title}
            </h3>
          </div>
          
          <CardContent className="p-8">
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Seconds' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="text-center p-4 rounded-xl bg-gradient-to-b from-muted to-muted/50 border border-border/50"
                >
                  <div className="text-3xl md:text-5xl font-bold text-primary animate-pulse">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>{nextFeaturedEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>{nextFeaturedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{nextFeaturedEvent.location}, {nextFeaturedEvent.city}</span>
              </div>
            </div>

            <p className="text-center mt-6 text-muted-foreground max-w-2xl mx-auto">
              {nextFeaturedEvent.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EventCountdown;
