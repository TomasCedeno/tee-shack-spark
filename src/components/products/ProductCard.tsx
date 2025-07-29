import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  sizes: string[];
  colors: string[];
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0], // Default size
      color: product.colors[0], // Default color
    });
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div 
        className="group relative bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          
          {/* Hover Image */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-accent text-accent-foreground">
                Destacado
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="destructive">
                -{discountPercentage}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary">
                Agotado
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className={`h-8 w-8 transition-all duration-300 ${
                isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
              }`}
              onClick={toggleFavorite}
            >
              <Heart 
                className={`h-4 w-4 transition-colors ${
                  isFavorite ? 'fill-red-500 text-red-500' : ''
                }`} 
              />
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              className={`h-8 w-8 transition-all duration-300 delay-75 ${
                isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
              }`}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Add to Cart */}
          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}>
            <Button
              className="w-full bg-gradient-accent hover:opacity-90"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? 'Agregar al Carrito' : 'Agotado'}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-rating text-rating'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews})
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-price">
              €{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                €{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Colors Preview */}
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-border"
                style={{ 
                  backgroundColor: color === 'Negro' ? '#000' : 
                                  color === 'Blanco' ? '#fff' :
                                  color === 'Gris' ? '#6b7280' :
                                  color === 'Azul' ? '#3b82f6' :
                                  color === 'Verde' ? '#10b981' :
                                  color === 'Rojo' ? '#ef4444' : '#8b5cf6'
                }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground ml-1">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};