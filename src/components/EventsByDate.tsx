
import React from 'react';
import { Calendar } from "lucide-react";
import { Event } from "@/data/events";
import EventCard from "./EventCard";

interface EventsByDateProps {
  date: string;
  events: Event[];
}

const EventsByDate: React.FC<EventsByDateProps> = ({ date, events }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-milan-600" />
        <h2 className="text-xl font-semibold">{date}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsByDate;
