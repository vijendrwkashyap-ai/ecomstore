"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  toggleCart: () => void;
  isCartOpen: boolean;
  cartTotal: number;
  cartCount: number;
  clearCart: () => void;
  // Shiprocket Integrated Handler
  openSr: (url: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('denimx_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('denimx_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id && i.size === item.size);
      if (existingItem) {
        return prevCart.map(i => 
          (i.id === item.id && i.size === item.size) 
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        );
      }
      return [...prevCart, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setCart(prevCart => prevCart.filter(i => !(i.id === id && i.size === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prevCart => prevCart.map(i => 
      (i.id === id && i.size === size) ? { ...i, quantity } : i
    ));
  };
  
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('denimx_cart');
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // ULTIMATE SHIPROCKET BYPASS HANDLER
  const openSr = (url: string) => {
     const width = 480;
     const height = 750;
     const left = (window.screen.width / 2) - (width / 2);
     const top = (window.screen.height / 2) - (height / 2);

     const popup = window.open(
        url,
        "ShiprocketCheckout",
        `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`
     );

     if (popup) {
        popup.focus();
     } else {
        // Fallback for popup blockers
        window.location.href = url;
     }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      toggleCart, 
      isCartOpen, 
      cartTotal, 
      cartCount,
      clearCart,
      openSr
    }}>
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
