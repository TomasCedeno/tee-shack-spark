import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const OrderConfirmation: React.FC = () => {
  // Mock order data
  const orderNumber = 'TS-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-foreground mb-4">
          ¡Pedido Confirmado!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Gracias por tu compra. Tu pedido ha sido recibido y está siendo procesado.
        </p>

        {/* Order Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-left">Detalles del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Número de Pedido:</span>
              <span className="text-primary font-mono">{orderNumber}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Fecha de Pedido:</span>
              <span>{new Date().toLocaleDateString('es-ES')}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Entrega Estimada:</span>
              <span>{estimatedDelivery}</span>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 rounded-lg bg-muted/50">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Confirmación por Email</h3>
            <p className="text-sm text-muted-foreground">
              Recibirás un email de confirmación con los detalles de tu pedido
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-muted/50">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Preparación</h3>
            <p className="text-sm text-muted-foreground">
              Tu pedido será preparado y empaquetado en nuestro almacén
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-muted/50">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Envío</h3>
            <p className="text-sm text-muted-foreground">
              Te notificaremos cuando tu pedido sea enviado con el código de seguimiento
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button className="w-full sm:w-auto bg-gradient-accent hover:opacity-90">
              Seguir Comprando
            </Button>
          </Link>
          
          <Link to="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Volver al Inicio
            </Button>
          </Link>
        </div>

        {/* Support */}
        <div className="mt-12 p-6 rounded-lg bg-muted/30">
          <h3 className="font-semibold mb-2">¿Necesitas ayuda?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button variant="outline" size="sm">
              Chat en Vivo
            </Button>
            <Button variant="outline" size="sm">
              Enviar Email
            </Button>
            <Button variant="outline" size="sm">
              Llamar: +34 123 456 789
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};