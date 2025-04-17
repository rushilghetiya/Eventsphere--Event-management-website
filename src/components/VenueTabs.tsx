
import React from 'react';
import { MapPin } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VenueTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const VenueTabs: React.FC<VenueTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center">
      <TabsList className="bg-muted/60">
        <TabsTrigger 
          value="all-venues" 
          className="flex items-center gap-1"
          onClick={() => onTabChange("all-venues")}
        >
          <MapPin className="h-4 w-4" />
          <span>All Venues</span>
        </TabsTrigger>
        <TabsTrigger 
          value="main-stage" 
          className="flex items-center gap-1"
          onClick={() => onTabChange("main-stage")}
        >
          <MapPin className="h-4 w-4" />
          <span>Main Stage</span>
        </TabsTrigger>
        <TabsTrigger 
          value="auditorium" 
          className="flex items-center gap-1"
          onClick={() => onTabChange("auditorium")}
        >
          <MapPin className="h-4 w-4" />
          <span>Auditorium</span>
        </TabsTrigger>
        <TabsTrigger 
          value="open-air" 
          className="flex items-center gap-1"
          onClick={() => onTabChange("open-air")}
        >
          <MapPin className="h-4 w-4" />
          <span>Open Air</span>
        </TabsTrigger>
        <TabsTrigger 
          value="workshop-hall" 
          className="flex items-center gap-1"
          onClick={() => onTabChange("workshop-hall")}
        >
          <MapPin className="h-4 w-4" />
          <span>Workshop Hall</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default VenueTabs;
