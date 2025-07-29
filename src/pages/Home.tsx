import React from 'react';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/products/ProductCard';
import { Link } from 'react-router-dom';
import productsData from '@/data/products.json';
import heroImage from '@/assets/hero-tshirts.jpg';

export const Home: React.FC = () => {
  const featuredProducts = productsData.filter(product => product.featured).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-black/30" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`
          }}
        />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-accent text-accent-foreground" variant="secondary">
              Nueva Colección 2024
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Estilo que 
              <span className="block bg-gradient-accent bg-clip-text text-transparent">
                Te Define
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto animate-slide-up">
              Descubre nuestra colección de camisetas premium. Calidad excepcional, 
              diseños únicos y comodidad sin igual.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
              <Link to="/products">
                <Button size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground">
                  Explorar Colección
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Ver Ofertas
              </Button>
            </div>
          </div>
        </div>
        
        {/* Hero Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Envío Gratis</h3>
              <p className="text-muted-foreground">En pedidos superiores a €50. Entrega en 24-48h.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Garantía de Calidad</h3>
              <p className="text-muted-foreground">30 días para cambios y devoluciones sin preguntas.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Headphones className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Soporte 24/7</h3>
              <p className="text-muted-foreground">Asistencia personalizada cuando la necesites.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">Productos Destacados</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo Más Popular
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre los productos favoritos de nuestros clientes. 
              Seleccionados por su calidad, estilo y valoraciones.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/products">
              <Button size="lg" variant="outline">
                Ver Toda la Colección
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-primary-foreground/80">Clientes Felices</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-primary-foreground/80">Diseños Únicos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-primary-foreground/80 flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                Valoración
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-primary-foreground/80">Envío Express</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};