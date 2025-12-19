
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from '@/hooks/use-cart';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Building, CheckCircle2, Mail } from "lucide-react";
import { useToast } from '@/components/ui/use-toast';
import { jsPDF } from 'jspdf';
import { supabase } from '@/integrations/supabase/client';

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const generatePdfBase64 = async (orderNumber: string, orderDate: string): Promise<string> => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Purple gradient background
    doc.setFillColor(124, 58, 237);
    doc.rect(0, 0, 297, 210, 'F');
    
    // Add overlay gradient effect
    doc.setFillColor(168, 85, 247);
    doc.rect(0, 0, 297, 70, 'F');

    doc.setTextColor(255, 255, 255);
    
    // Header
    doc.setFontSize(40);
    doc.text('EVENTSPHERE', 148.5, 35, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text('OFFICIAL EVENT TICKET', 148.5, 50, { align: 'center' });
    
    // Divider line
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(40, 75, 257, 75);
    
    // Order info
    doc.setFontSize(14);
    const startY = 95;
    const leftX = 60;
    const rightX = 237;
    
    doc.text(`Order Number: ${orderNumber}`, leftX, startY);
    doc.text(`Order Date: ${orderDate}`, rightX, startY, { align: 'right' });
    
    doc.text(`Attendee: ${formData.firstName} ${formData.lastName}`, leftX, startY + 20);
    doc.text(`Email: ${formData.email}`, rightX, startY + 20, { align: 'right' });
    
    // Tickets info
    doc.setFontSize(12);
    let ticketY = startY + 45;
    items.forEach(({ ticket, quantity }) => {
      doc.text(`${ticket.name} x ${quantity}`, leftX, ticketY);
      ticketY += 10;
    });
    
    // Footer
    doc.setFontSize(12);
    doc.text('This ticket serves as proof of purchase. Please present at the entrance.', 148.5, 175, { align: 'center' });
    
    doc.line(40, 185, 257, 185);
    
    doc.setFontSize(10);
    doc.text('support@eventsphere.com | www.eventsphere.com', 148.5, 195, { align: 'center' });

    // Return as base64
    return doc.output('datauristring').split(',')[1];
  };

  const sendTicketEmail = async (orderNumber: string, orderDate: string) => {
    const pdfBase64 = await generatePdfBase64(orderNumber, orderDate);
    const total = Math.round(subtotal * 1.05);

    const ticketItems = items.map(({ ticket, quantity }) => ({
      name: ticket.name,
      quantity,
      price: ticket.price,
      eventDate: ticket.eventDate,
      eventTime: ticket.eventTime,
      eventLocation: ticket.eventLocation
    }));

    const { data, error } = await supabase.functions.invoke('send-ticket-email', {
      body: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        orderNumber,
        orderDate,
        items: ticketItems,
        subtotal,
        total,
        pdfBase64
      }
    });

    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }

    return data;
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  if (items.length === 0) {
    navigate('/tickets');
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const orderNumber = `EVS-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDate = new Date().toLocaleDateString();
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Send email with PDF ticket
      await sendTicketEmail(orderNumber, orderDate);
      
      clearCart();
      
      toast({
        title: "Payment successful!",
        description: "Your tickets have been emailed to you.",
      });
      
      // Store order info for confirmation page
      sessionStorage.setItem('orderInfo', JSON.stringify({
        orderNumber,
        orderDate,
        email: formData.email,
        firstName: formData.firstName
      }));
      
      navigate('/confirmation');
    } catch (error) {
      console.error('Error processing order:', error);
      toast({
        title: "Payment processed",
        description: "Tickets booked but email delivery failed. You can download from confirmation page.",
      });
      
      sessionStorage.setItem('orderInfo', JSON.stringify({
        orderNumber,
        orderDate,
        email: formData.email,
        firstName: formData.firstName
      }));
      
      clearCart();
      navigate('/confirmation');
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="container py-8 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">Complete your purchase</p>
      </div>
      
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                  <CardDescription>We'll send your tickets and updates to this email</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="First Name" 
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Last Name" 
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Your PDF ticket will be sent to this email</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      placeholder="Phone Number" 
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required 
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Payment Method</CardTitle>
                  <CardDescription>Select your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 border rounded-md p-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer">
                        <CreditCard className="h-5 w-5 mr-2 text-milan-600" />
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border rounded-md p-4">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex items-center cursor-pointer">
                        <Building className="h-5 w-5 mr-2 text-milan-600" />
                        Net Banking
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border rounded-md p-4">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center cursor-pointer">
                        <span className="h-5 w-5 mr-2 rounded-full bg-milan-600 text-white flex items-center justify-center text-xs font-bold">UPI</span>
                        UPI Payment
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === "card" && (
                    <div className="mt-4 space-y-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input id="expiryDate" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input id="nameOnCard" placeholder="Name on Card" required />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex flex-col items-center space-y-4">
                        <p className="text-sm text-muted-foreground">Scan the QR code to pay</p>
                        <div className="p-4 bg-white rounded-xl border-2 border-primary/20 shadow-lg">
                          <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=eventsphere@upi&pn=Eventsphere&am=" 
                            alt="UPI QR Code"
                            className="w-48 h-48"
                          />
                        </div>
                        <div className="text-center space-y-1">
                          <p className="font-semibold text-primary">eventsphere@upi</p>
                          <p className="text-xs text-muted-foreground">Scan with any UPI app (GPay, PhonePe, Paytm)</p>
                        </div>
                        <div className="space-y-2 w-full">
                          <Label htmlFor="upiId">Or enter your UPI ID</Label>
                          <Input id="upiId" placeholder="yourname@upi" />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Button 
              className="w-full mt-6 bg-milan-600 hover:bg-milan-700 h-12"
              type="submit"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>Complete Payment</>
              )}
            </Button>
          </form>
        </div>
        
        <div className="md:col-span-2">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map(({ ticket, quantity }) => (
                <div key={ticket.id} className="flex justify-between">
                  <div>
                    <div className="font-medium">{ticket.name}</div>
                    <div className="text-sm text-muted-foreground">Qty: {quantity}</div>
                  </div>
                  <div className="font-medium">{formatPrice(ticket.price * quantity)}</div>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Service Fee</span>
                <span>{formatPrice(subtotal * 0.05)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(subtotal * 1.05)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
