
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Calendar, Clock, MapPin, Share2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { toast } from "@/components/ui/use-toast";

const Confirmation = () => {
  const orderNumber = `EVS-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleDateString();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleDownloadTickets = async () => {
    setIsGenerating(true);
    
    try {
      // Create a new PDF document
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // First load the image
      const imgUrl = 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1600&h=800&q=80';
      
      // Create a new image element
      const img = new Image();
      img.crossOrigin = "Anonymous"; // This is important for CORS
      
      // Wait for the image to load before proceeding
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => {
          reject(new Error("Failed to load image"));
        };
        img.src = imgUrl;
      });
      
      // Add the image to the PDF document
      doc.addImage(img, 'JPEG', 0, 0, 297, 210); // A4 dimensions in landscape

      // Add semi-transparent overlay to make text more readable
      doc.setFillColor(0, 0, 0, 0.4);
      doc.rect(0, 0, 297, 210, 'F');

      // Set text colors and fonts
      doc.setTextColor(255, 255, 255);
      
      // Add event logo/name
      doc.setFontSize(40);
      doc.text('EVENTSPHERE', 148.5, 40, { align: 'center' });
      
      // Add ticket details
      doc.setFontSize(16);
      doc.text('OFFICIAL EVENT TICKET', 148.5, 55, { align: 'center' });
      
      // Add horizontal line
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);
      doc.line(40, 65, 257, 65);
      
      // Ticket information
      doc.setFontSize(14);
      const startY = 85;
      const leftX = 60;
      const rightX = 237;
      
      doc.text(`Order Number: ${orderNumber}`, leftX, startY);
      doc.text(`Order Date: ${orderDate}`, rightX, startY, { align: 'right' });
      
      doc.text('Event: Eventsphere 2024', leftX, startY + 20);
      doc.text('Date: May 15-17, 2024', rightX, startY + 20, { align: 'right' });
      
      doc.text('Venue: Eventsphere Campus Ground', leftX, startY + 40);
      doc.text('Gates Open: 9:00 AM', rightX, startY + 40, { align: 'right' });
      
      // Add footer with additional information
      doc.setFontSize(12);
      doc.text('This ticket serves as proof of purchase. Please present this ticket at the entrance.', 148.5, 160, { align: 'center' });
      
      // Add bottom border
      doc.line(40, 170, 257, 170);
      
      // Save the PDF
      doc.save(`Eventsphere-Ticket-${orderNumber}.pdf`);
      toast({
        title: "Success",
        description: "Your tickets have been downloaded successfully!",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="container py-12 max-w-3xl">
      <div className="text-center mb-8 space-y-4">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle className="h-14 w-14 text-green-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Thank You For Your Order!</h1>
        <p className="text-muted-foreground">
          Your tickets have been booked successfully. We've sent a confirmation email with all the details.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="bg-milan-50 border-b">
          <CardTitle className="flex items-center justify-between">
            <span>Order Details</span>
            <span className="text-milan-600">#{orderNumber}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">{orderDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium">Credit Card</p>
            </div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg space-y-3 mt-4">
            <h3 className="font-semibold">Event Information</h3>
            <div className="flex items-start">
              <Calendar className="h-5 w-5 mr-3 mt-0.5 text-milan-600" />
              <div>
                <p className="font-medium">Eventsphere 2024</p>
                <p className="text-sm text-muted-foreground">May 15-17, 2024</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-3 mt-0.5 text-milan-600" />
              <div>
                <p className="font-medium">Event Time</p>
                <p className="text-sm text-muted-foreground">Gates open at 9:00 AM</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 mt-0.5 text-milan-600" />
              <div>
                <p className="font-medium">Venue</p>
                <p className="text-sm text-muted-foreground">Eventsphere Campus Ground</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-between gap-4">
          <Button 
            variant="outline"
            className="w-full md:w-auto flex items-center"
            onClick={handleDownloadTickets}
            disabled={isGenerating}
          >
            <Download className="h-4 w-4 mr-2" />
            {isGenerating ? "Generating..." : "Download Tickets"}
          </Button>
          <Button 
            variant="outline"
            className="w-full md:w-auto flex items-center"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share with Friends
          </Button>
        </CardFooter>
      </Card>
      
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">
          Need assistance? Contact our support team at <span className="text-milan-600">support@eventsphere.com</span>
        </p>
        <Link to="/tickets">
          <Button variant="outline">
            Browse More Tickets
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
