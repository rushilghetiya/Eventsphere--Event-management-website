
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Mail, Phone, MessageSquare } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We have received your message and will get back to you shortly.",
    });
    // Reset form
    (e.target as HTMLFormElement).reset();
  };
  
  return (
    <div className="container py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-milan-800">Contact Us</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Have questions or need assistance? Reach out to our team and we'll get back to you as soon as possible.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="What is this regarding?" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Type your message here..." 
                  rows={5} 
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full bg-milan-600 hover:bg-milan-700">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14767.262289338461!2d74.79009442466761!3d24.583220635379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e56550a14411%3A0xdbd8c28455b868b0!2sIndia!5e0!3m2!1sen!2sin!4v1623525824976!5m2!1sen!2sin" 
              height="250" 
              style={{ border: 0, width: '100%' }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Office Location"
            />
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-milan-600" />
                <div>
                  <p className="font-medium">Office Address</p>
                  <p className="text-sm text-muted-foreground">
                    123 Eventsphere Plaza, Tech Park<br />
                    Bangalore, Karnataka 560001<br />
                    India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-milan-600" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-sm text-milan-600">
                    info@eventsphere.com
                  </p>
                  <p className="text-sm text-milan-600">
                    support@eventsphere.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5 text-milan-600" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-sm text-milan-600">
                    +91 98765 43210
                  </p>
                  <p className="text-sm text-milan-600">
                    +91 87654 32109
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
