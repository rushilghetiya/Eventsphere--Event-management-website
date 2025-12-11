
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export type TicketType = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'vip' | 'proshow' | 'comedy' | 'earlybird' | 'celebrity';
  image: string;
  availableCount?: number;
  eventId?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  eventCity?: string;
};

type CartItem = {
  ticket: TicketType;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (ticket: TicketType, quantity?: number) => void;
  removeFromCart: (ticketId: string) => void;
  updateQuantity: (ticketId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('eventsphereCart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse saved cart', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('eventsphereCart', JSON.stringify(items));
  }, [items]);
  
  const addToCart = (ticket: TicketType, quantity = 1) => {
    setItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.ticket.id === ticket.id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Updated quantity",
          description: `${ticket.name} quantity updated in your cart.`,
        });
        
        return updatedItems;
      } else {
        toast({
          title: "Added to cart",
          description: `${ticket.name} added to your cart.`,
        });
        
        return [...prev, { ticket, quantity }];
      }
    });
  };
  
  const removeFromCart = (ticketId: string) => {
    setItems(prev => {
      const ticketToRemove = prev.find(item => item.ticket.id === ticketId);
      
      if (ticketToRemove) {
        toast({
          title: "Removed from cart",
          description: `${ticketToRemove.ticket.name} removed from your cart.`,
        });
      }
      
      return prev.filter(item => item.ticket.id !== ticketId);
    });
  };
  
  const updateQuantity = (ticketId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(ticketId);
      return;
    }
    
    setItems(prev => 
      prev.map(item => 
        item.ticket.id === ticketId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce(
    (total, item) => total + item.ticket.price * item.quantity, 
    0
  );
  
  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        totalItems,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
