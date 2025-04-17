
import React from 'react';
import { Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/data/events";
import { getCategoryColor, getCategoryIcon } from "@/utils/eventUtils";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const CategoryIcon = getCategoryIcon(event.category);
  
  return (
    <Card className={`overflow-hidden hover:shadow-md transition-all duration-300 ${event.featured ? 'border-milan-600' : ''}`}>
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
            {CategoryIcon && <CategoryIcon className="h-4 w-4" />}
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
  );
};

export default EventCard;
