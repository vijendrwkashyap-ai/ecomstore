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
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from local storage on mount
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

  // Save cart to local storage on change
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
      clearCart
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
