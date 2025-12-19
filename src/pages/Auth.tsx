import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogIn, UserPlus, Mail, Key, User } from "lucide-react";
import { Loader } from "lucide-react";
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/components/ui/use-toast';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, signup, isAuthenticated } = useAuth();
  const { toast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await login(email, password);
    setIsSubmitting(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!name) {
      toast({
        title: "Name is required",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    const { error } = await signup(name, email, password);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-milan-50 to-milan-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-milan-800">Milan 2024</h1>
          <p className="text-milan-600">The Cultural Festival of NIT Rourkela</p>
        </div>
        
        <Card className="border-milan-200 shadow-lg">
          <CardHeader>
            <Tabs defaultValue="login" value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </TabsTrigger>
              </TabsList>
          
              <TabsContent value="login" className="pt-4">
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </TabsContent>
              
              <TabsContent value="signup" className="pt-4">
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Sign up to experience Milan 2024</CardDescription>
              </TabsContent>
            </Tabs>
          </CardHeader>
          
          <CardContent>
            {activeTab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="pl-10"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password"
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="pl-10"
                      required 
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-milan-600 hover:bg-milan-700" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="John Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="pl-10"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="pl-10"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="••••••••"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="pl-10"
                      required 
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-milan-600 hover:bg-milan-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pt-4">
            <div className="text-center text-sm text-muted-foreground">
              {activeTab === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button 
                    type="button" 
                    className="text-milan-600 hover:underline"
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button 
                    type="button" 
                    className="text-milan-600 hover:underline"
                    onClick={() => setActiveTab("login")}
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
