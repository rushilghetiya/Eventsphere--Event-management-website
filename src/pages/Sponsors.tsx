
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Award, Diamond, Bookmark } from "lucide-react";

type SponsorTier = "platinum" | "gold" | "silver" | "partner";

type Sponsor = {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  tier: SponsorTier;
};

const Sponsors = () => {
  const sponsors: Sponsor[] = [
    // Platinum Sponsors
    {
      id: "plat-1",
      name: "TechCorp Global",
      description: "Leading technology innovation company providing cutting-edge solutions worldwide.",
      logo: "https://via.placeholder.com/300x150?text=TechCorp",
      website: "https://example.com",
      tier: "platinum",
    },
    {
      id: "plat-2",
      name: "Finanzo Inc.",
      description: "International financial services corporation supporting arts and culture worldwide.",
      logo: "https://via.placeholder.com/300x150?text=Finanzo",
      website: "https://example.com",
      tier: "platinum",
    },
    
    // Gold Sponsors
    {
      id: "gold-1",
      name: "Bevera Drinks",
      description: "Premium beverage company known for quality and innovation in the drinks industry.",
      logo: "https://via.placeholder.com/300x150?text=Bevera",
      website: "https://example.com",
      tier: "gold",
    },
    {
      id: "gold-2",
      name: "Connecta Telecom",
      description: "Telecommunications provider offering nationwide coverage and innovative solutions.",
      logo: "https://via.placeholder.com/300x150?text=Connecta",
      website: "https://example.com",
      tier: "gold",
    },
    {
      id: "gold-3",
      name: "EduLearn Systems",
      description: "Educational technology company revolutionizing learning experiences globally.",
      logo: "https://via.placeholder.com/300x150?text=EduLearn",
      website: "https://example.com",
      tier: "gold",
    },
    
    // Silver Sponsors
    {
      id: "silver-1",
      name: "FoodDelight",
      description: "Gourmet food company specializing in ready-to-eat meals and catering services.",
      logo: "https://via.placeholder.com/300x150?text=FoodDelight",
      website: "https://example.com",
      tier: "silver",
    },
    {
      id: "silver-2",
      name: "SportsFit",
      description: "Sports equipment and fitness products manufacturer promoting active lifestyles.",
      logo: "https://via.placeholder.com/300x150?text=SportsFit",
      website: "https://example.com",
      tier: "silver",
    },
    {
      id: "silver-3",
      name: "MediaPulse",
      description: "Digital media company specializing in content creation and marketing solutions.",
      logo: "https://via.placeholder.com/300x150?text=MediaPulse",
      website: "https://example.com",
      tier: "silver",
    },
    {
      id: "silver-4",
      name: "CreativeDesigns",
      description: "Creative agency known for innovative design solutions and branding expertise.",
      logo: "https://via.placeholder.com/300x150?text=CreativeDesigns",
      website: "https://example.com",
      tier: "silver",
    },
    
    // Partners
    {
      id: "partner-1",
      name: "LocalCafe",
      description: "Popular local cafe providing refreshments and snacks during the festival.",
      logo: "https://via.placeholder.com/300x150?text=LocalCafe",
      website: "https://example.com",
      tier: "partner",
    },
    {
      id: "partner-2",
      name: "PrintPro",
      description: "Printing services company handling all promotional materials for the event.",
      logo: "https://via.placeholder.com/300x150?text=PrintPro",
      website: "https://example.com",
      tier: "partner",
    },
    {
      id: "partner-3",
      name: "TravelEase",
      description: "Travel agency offering special packages for festival attendees.",
      logo: "https://via.placeholder.com/300x150?text=TravelEase",
      website: "https://example.com",
      tier: "partner",
    },
  ];
  
  const getTierIcon = (tier: SponsorTier) => {
    switch (tier) {
      case 'platinum':
        return <Diamond className="h-5 w-5" />;
      case 'gold':
        return <Star className="h-5 w-5" />;
      case 'silver':
        return <Award className="h-5 w-5" />;
      case 'partner':
        return <Bookmark className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  const getTierColor = (tier: SponsorTier) => {
    switch (tier) {
      case 'platinum':
        return "text-milan-800 border-milan-600";
      case 'gold':
        return "text-amber-700 border-amber-400";
      case 'silver':
        return "text-gray-700 border-gray-400";
      case 'partner':
        return "text-blue-700 border-blue-400";
      default:
        return "";
    }
  };
  
  // Group sponsors by tier
  const sponsorsByTier = sponsors.reduce((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = [];
    }
    acc[sponsor.tier].push(sponsor);
    return acc;
  }, {} as Record<SponsorTier, Sponsor[]>);
  
  // Define tier order and labels
  const tierOrder: SponsorTier[] = ["platinum", "gold", "silver", "partner"];
  const tierLabels = {
    platinum: "Platinum Sponsors",
    gold: "Gold Sponsors",
    silver: "Silver Sponsors",
    partner: "Partners & Supporters"
  };
  
  return (
    <div className="container py-10 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-milan-800">Our Sponsors</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Milan 2024 is made possible by the generous support of our sponsors and partners.
          We thank them for their contribution to making this cultural festival a success.
        </p>
      </div>
      
      {tierOrder.map(tier => (
        <div key={tier} className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            {getTierIcon(tier)}
            <h2 className="text-2xl font-semibold text-center">{tierLabels[tier]}</h2>
          </div>
          
          <div className={`grid grid-cols-1 ${tier === 'platinum' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {sponsorsByTier[tier]?.map(sponsor => (
              <Card 
                key={sponsor.id} 
                className={`hover:shadow-md transition-all duration-300 border-2 ${getTierColor(sponsor.tier)}`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{sponsor.name}</CardTitle>
                  <CardDescription>{sponsor.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-4">
                  <div 
                    className="h-28 w-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${sponsor.logo})` }}
                  />
                </CardContent>
                <CardFooter className="pt-0">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      <span>Visit Website</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
      
      <div className="text-center mt-12 space-y-4">
        <h2 className="text-xl font-semibold">Interested in becoming a sponsor?</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Join our growing list of sponsors and support the biggest cultural festival of NIT Rourkela.
          We offer various sponsorship packages to suit your needs.
        </p>
        <Button className="bg-milan-600 hover:bg-milan-700">
          Contact Us About Sponsorship
        </Button>
      </div>
    </div>
  );
};

export default Sponsors;
