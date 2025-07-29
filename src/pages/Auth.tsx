import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
        if (success) {
          toast({
            title: "¡Bienvenido de vuelta!",
            description: "Has iniciado sesión correctamente.",
          });
          navigate('/');
        } else {
          toast({
            title: "Error de autenticación",
            description: "Credenciales incorrectas. Intenta con demo@teeshack.com / 123456",
            variant: "destructive",
          });
        }
      } else {
        success = await register(formData.email, formData.password, formData.name);
        if (success) {
          toast({
            title: "¡Cuenta creada!",
            description: "Tu cuenta ha sido creada exitosamente.",
          });
          navigate('/');
        } else {
          toast({
            title: "Error de registro",
            description: "Este email ya está registrado.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Algo salió mal. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', name: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-strong">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">TS</span>
            </div>
            <div>
              <CardTitle className="text-2xl">
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? 'Ingresa a tu cuenta de TeeShack' 
                  : 'Únete a la comunidad TeeShack'
                }
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
                variant="accent"
              >
                {isLoading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
              </Button>
            </form>

            {isLogin && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Cuenta de prueba:</p>
                <p className="text-xs font-mono">demo@teeshack.com</p>
                <p className="text-xs font-mono">123456</p>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-1 text-primary hover:underline font-medium"
                >
                  {isLogin ? 'Regístrate' : 'Inicia sesión'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};