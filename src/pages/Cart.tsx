
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, CreditCard } from "lucide-react";
import { useCart } from '@/hooks/use-cart';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  if (items.length === 0) {
    return (
      <div className="container py-20">
        <div className="max-w-md mx-auto text-center space-y-6">
          <ShoppingCart className="h-16 w-16 mx-auto text-milan-400" />
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">
            You haven't added any tickets to your cart yet.
          </p>
          <Button 
            className="bg-milan-600 hover:bg-milan-700 mt-4"
            onClick={() => navigate('/tickets')}
          >
            View Tickets
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <Button variant="outline" size="sm" onClick={clearCart}>
          Clear cart
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map(({ ticket, quantity }) => (
            <Card key={ticket.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div 
                  className="w-full sm:w-40 h-32 sm:h-auto bg-center bg-cover"
                  style={{ backgroundImage: `url(${ticket.image})` }}
                ></div>
                <div className="flex-1 flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{ticket.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{ticket.description}</p>
                    <div className="mt-2 flex items-center">
                      <div className="font-bold text-milan-700">{formatPrice(ticket.price)}</div>
                      <span className="mx-2 text-muted-foreground">×</span>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => updateQuantity(ticket.id, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => updateQuantity(ticket.id, quantity + 1)}
                          disabled={ticket.availableCount ? quantity >= ticket.availableCount : false}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="text-muted-foreground text-sm">
                      Subtotal: <span className="font-bold text-foreground">{formatPrice(ticket.price * quantity)}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeFromCart(ticket.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map(({ ticket, quantity }) => (
                <div key={ticket.id} className="flex justify-between text-sm">
                  <span>{ticket.name} × {quantity}</span>
                  <span className="font-medium">{formatPrice(ticket.price * quantity)}</span>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between font-medium">
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
            <CardFooter>
              <Button 
                className="w-full bg-milan-600 hover:bg-milan-700"
                onClick={() => navigate('/checkout')}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Need help? <Link to="/contact" className="text-milan-600 hover:underline">Contact our support team</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
