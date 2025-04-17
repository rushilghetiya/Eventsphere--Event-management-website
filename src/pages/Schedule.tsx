
import React, { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { events } from "@/data/events";
import { groupEventsByDate } from "@/utils/eventUtils";
import EventsByDate from "@/components/EventsByDate";
import VenueTabs from "@/components/VenueTabs";

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("all-venues");
  
  const filteredEvents = activeTab === "all-venues" 
    ? events 
    : events.filter(event => event.venue === activeTab);
  
  // Group events by date
  const eventsByDate = groupEventsByDate(filteredEvents);
  
  const sortedDates = Object.keys(eventsByDate).sort();
  
  return (
    <div className="container py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-milan-800">Eventsphere Schedule</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Plan your Eventsphere experience! Browse events by location and date to make the most of our concerts and events.
        </p>
      </div>
      
      <Tabs defaultValue="all-venues" value={activeTab} className="w-full">
        <VenueTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-8">
            {sortedDates.map(date => (
              <EventsByDate key={date} date={date} events={eventsByDate[date]} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Schedule;
