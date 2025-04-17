
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Calendar, Clock, MapPin, Share2 } from "lucide-react";
import { Link } from 'react-router-dom';

const Confirmation = () => {
  const orderNumber = `MIL-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleDateString();
  
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
                <p className="font-medium">Milan 2024</p>
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
                <p className="text-sm text-muted-foreground">Milan Campus Ground, NIT Rourkela</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-between gap-4">
          <Button 
            variant="outline"
            className="w-full md:w-auto flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Tickets
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
          Need assistance? Contact our support team at <span className="text-milan-600">support@milan2024.com</span>
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
