
import { Event } from "@/data/events";
import { Music, MicVocal, Sparkles, Users } from "lucide-react";

export const getCategoryIcon = (category: Event['category']) => {
  switch (category) {
    case 'concert':
      return Music;
    case 'comedy':
      return MicVocal;
    case 'cultural':
      return Sparkles;
    case 'workshop':
      return Users;
    default:
      return null;
  }
};

export const getCategoryColor = (category: Event['category']) => {
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

export const groupEventsByDate = (events: Event[]) => {
  return events.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, Event[]>);
};
