import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ThumbsUp, ChevronLeft, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import products from '@/data/products.json';

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    productId: 1,
    userName: 'María García',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face',
    rating: 5,
    comment: 'Excelente calidad y muy cómoda. El algodón es suave y el corte perfecto.',
    date: '2024-01-15',
    helpful: 12,
    verified: true
  },
  {
    id: 2,
    productId: 1,
    userName: 'Carlos Ruiz',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    rating: 4,
    comment: 'Muy buena camiseta, aunque pensé que sería un poco más gruesa.',
    date: '2024-01-10',
    helpful: 8,
    verified: true
  },
  {
    id: 3,
    productId: 1,
    userName: 'Ana López',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    rating: 5,
    comment: 'Perfecta! La compré en negro y blanco. Súper recomendada.',
    date: '2024-01-08',
    helpful: 15,
    verified: false
  }
];

export const ProductReviews: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');

  const product = products.find(p => p.id === parseInt(id || '0'));
  const productReviews = mockReviews.filter(review => review.productId === parseInt(id || '0'));

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

  const handleSubmitReview = () => {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para dejar una reseña",
        variant: "destructive",
      });
      return;
    }

    if (newRating === 0 || !newReview.trim()) {
      toast({
        title: "Completa la reseña",
        description: "Por favor selecciona una calificación y escribe un comentario",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally submit to your backend
    toast({
      title: "Reseña enviada",
      description: "Tu reseña ha sido enviada correctamente",
    });

    setNewReview('');
    setNewRating(0);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    productReviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const totalReviews = productReviews.length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link 
          to={`/product/${id}`}
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver al producto
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Reseñas de {product.name}
        </h1>
        <p className="text-muted-foreground">
          {totalReviews} {totalReviews === 1 ? 'reseña' : 'reseñas'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Calificación General</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {product.rating}
                </div>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-rating text-rating'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Basado en {totalReviews} reseñas
                </p>
              </div>

              <Separator />

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingDistribution[rating as keyof typeof ratingDistribution];
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm w-3">{rating}</span>
                      <Star className="h-3 w-3 fill-rating text-rating" />
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-rating h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-6">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Write Review */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Escribe una Reseña</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {user ? (
                <>
                  {/* Rating Input */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Tu Calificación
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setNewRating(rating)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              rating <= newRating
                                ? 'fill-rating text-rating'
                                : 'text-muted-foreground hover:text-rating'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment Input */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Tu Comentario
                    </label>
                    <Textarea
                      placeholder="Comparte tu experiencia con este producto..."
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button 
                    className="w-full bg-gradient-accent hover:opacity-90"
                    onClick={handleSubmitReview}
                  >
                    Enviar Reseña
                  </Button>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">
                    Inicia sesión para escribir una reseña
                  </p>
                  <Link to="/auth">
                    <Button>Iniciar Sesión</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Más Recientes</SelectItem>
                <SelectItem value="oldest">Más Antiguos</SelectItem>
                <SelectItem value="highest">Mayor Calificación</SelectItem>
                <SelectItem value="lowest">Menor Calificación</SelectItem>
                <SelectItem value="helpful">Más Útiles</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por estrellas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las calificaciones</SelectItem>
                <SelectItem value="5">5 estrellas</SelectItem>
                <SelectItem value="4">4 estrellas</SelectItem>
                <SelectItem value="3">3 estrellas</SelectItem>
                <SelectItem value="2">2 estrellas</SelectItem>
                <SelectItem value="1">1 estrella</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {productReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={review.userAvatar} />
                      <AvatarFallback>
                        {review.userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{review.userName}</h4>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Compra verificada
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('es-ES')}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-rating text-rating'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Comment */}
                      <p className="text-muted-foreground leading-relaxed">
                        {review.comment}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-4 pt-2">
                        <Button variant="ghost" size="sm" className="h-8">
                          <ThumbsUp className="h-3 w-3 mr-2" />
                          Útil ({review.helpful})
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {productReviews.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No hay reseñas aún</h3>
              <p className="text-muted-foreground">
                Sé el primero en dejar una reseña de este producto
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};