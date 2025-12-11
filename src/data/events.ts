
export type Event = {
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

export const events: Event[] = [
  // Main Stage Events
  {
    id: "event-1",
    title: "Eventsphere Opening Ceremony",
    description: "Official inauguration of Eventsphere 2025 with special performances and guest speeches.",
    date: "May 15, 2025",
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
    date: "May 15, 2025",
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
    date: "May 16, 2025",
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
    description: "Laugh out loud with top comedians performing their best routines exclusively for Eventsphere 2025.",
    date: "May 16, 2025",
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
    date: "May 17, 2025",
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
    description: "College bands compete for the title of Eventsphere 2025 Best Band with original compositions.",
    date: "May 15, 2025",
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
    date: "May 17, 2025",
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
    date: "May 16, 2025",
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
    date: "May 17, 2025",
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
    date: "June 10, 2025",
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
    date: "June 17, 2025",
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
    date: "July 5, 2025",
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
    date: "July 15, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "YMCA Grounds",
    city: "Chennai",
    category: "concert",
    venue: "main-stage",
    featured: true,
  },
];
