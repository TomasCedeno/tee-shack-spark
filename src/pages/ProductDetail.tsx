import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Truck, RotateCcw, Shield, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import products from '@/data/products.json';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = products.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <Link to="/products">
          <Button>Volver a Productos</Button>
        </Link>
      </div>
    );
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selección requerida",
        description: "Por favor selecciona una talla y color",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
    });

    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link 
          to="/products" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a productos
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-muted rounded-xl overflow-hidden">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index 
                      ? 'border-primary' 
                      : 'border-transparent hover:border-muted-foreground'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart 
                  className={`h-5 w-5 ${
                    isFavorite ? 'fill-red-500 text-red-500' : ''
                  }`} 
                />
              </Button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-rating text-rating'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reseñas)
              </span>
              <Link 
                to={`/product/${product.id}/reviews`}
                className="text-sm text-primary hover:underline"
              >
                Ver reseñas
              </Link>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.featured && (
                <Badge className="bg-accent text-accent-foreground">
                  Destacado
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive">
                  -{discountPercentage}% OFF
                </Badge>
              )}
              <Badge variant={product.inStock ? "default" : "secondary"}>
                {product.inStock ? "En Stock" : "Agotado"}
              </Badge>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-price">
              €{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                €{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <Separator />

          {/* Options */}
          <div className="space-y-6">
            {/* Colors */}
            <div>
              <h3 className="font-medium mb-3">Color: {selectedColor || 'Selecciona'}</h3>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedColor === color
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="font-medium mb-3">Talla: {selectedSize || 'Selecciona'}</h3>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border transition-colors flex items-center justify-center font-medium ${
                      selectedSize === size
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-3">
            <Button
              className="w-full bg-gradient-accent hover:opacity-90"
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.inStock ? 'Agregar al Carrito' : 'Agotado'}
            </Button>
            
            <Link to="/cart">
              <Button variant="outline" className="w-full" size="lg">
                Ver Carrito
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Envío Gratis</p>
                <p className="text-xs text-muted-foreground">Pedidos +€50</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <RotateCcw className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Devoluciones</p>
                <p className="text-xs text-muted-foreground">30 días</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Garantía</p>
                <p className="text-xs text-muted-foreground">1 año</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="care">Cuidados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="mt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Material</p>
                  <p className="text-muted-foreground">100% Algodón Orgánico</p>
                </div>
                <div>
                  <p className="font-medium">Corte</p>
                  <p className="text-muted-foreground">Regular Fit</p>
                </div>
                <div>
                  <p className="font-medium">Cuidado</p>
                  <p className="text-muted-foreground">Lavado a máquina 30°C</p>
                </div>
                <div>
                  <p className="font-medium">Origen</p>
                  <p className="text-muted-foreground">Fabricado en España</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="care" className="mt-6">
            <div className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Lavar con colores similares</li>
                <li>• No usar lejía</li>
                <li>• Secar al aire libre</li>
                <li>• Planchar a temperatura media</li>
                <li>• No limpiar en seco</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};