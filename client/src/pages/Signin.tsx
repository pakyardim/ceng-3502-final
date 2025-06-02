import { useMutation } from '@tanstack/react-query';
import type React from 'react';

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { login } from '@/fetchers/login';
import { useAuth } from '@/contexts/authContext';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function AdminSignInPage() {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    retry: 1,
    onSuccess: (data) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      localStorage.setItem('authToken', data.token);
      setAuthToken(data.token);
      navigate('/tickets', { replace: true });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      username: formData.username,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-medium shadow-lg">
              <Shield className="h-4 w-4" />
              Admin Portal
            </div>
          </div>

          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Sign In
              </CardTitle>
              <CardDescription className="text-gray-600">
                Access the FlyTicket administration dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error.message}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700 font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      name="username"
                      type="username"
                      placeholder="admin"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  size="lg"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </div>
                  ) : (
                    'Sign In to Admin Portal'
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>
                    <span className="font-medium">Username:</span> admin
                  </div>
                  <div>
                    <span className="font-medium">Password:</span> admin123
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  This is a secure admin portal. All activities are logged and monitored.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
