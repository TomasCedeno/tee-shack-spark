import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

export const CartSidebar: React.FC = () => {
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="ml-auto w-full max-w-md bg-background shadow-strong border-l">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Carrito de Compras</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Trash2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Tu carrito está vacío</h3>
                <p className="text-muted-foreground mb-4">
                  Agrega algunos productos para comenzar
                </p>
                <Button onClick={() => setIsCartOpen(false)}>
                  Seguir Comprando
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                    <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.size}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.color}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            €{(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>€{getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                  <Button className="w-full bg-gradient-accent hover:opacity-90" size="lg">
                    Proceder al Checkout
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsCartOpen(false)}
                >
                  Seguir Comprando
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};