"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

export function AuthForm() {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");

  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRole, setRegisterRole] = useState<
    "buyer" | "manager" | "admin" | "employee"
  >("buyer");
  const [registerSupermarketId, setRegisterSupermarketId] = useState<
    number | undefined
  >(undefined);
  const [registerNameError, setRegisterNameError] = useState("");
  const [registerEmailError, setRegisterEmailError] = useState("");
  const [registerPasswordError, setRegisterPasswordError] = useState("");
  const [registerSupermarketError, setRegisterSupermarketError] = useState("");

  const supermarkets = [
    { id: 1, name: "Shola Supermarket" },
    { id: 2, name: "Safeway Supermarket" },
    { id: 3, name: "Fresh Corner Market" },
    { id: 4, name: "Mafi City Mall Supermarket" },
    { id: 5, name: "Friendship Supermarket" },
    { id: 6, name: "Getfam Supermarket" },
    { id: 7, name: "Zemen Mart" },
  ];

  const router = useRouter();
  const { toast } = useToast();
  const { login, register } = useAuth();

  // Validate login form
  const validateLoginForm = () => {
    let isValid = true;

    // Email validation
    if (!loginEmail) {
      setLoginEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      setLoginEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setLoginEmailError("");
    }

    // Password validation
    if (!loginPassword) {
      setLoginPasswordError("Password is required");
      isValid = false;
    } else if (loginPassword.length < 6) {
      setLoginPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setLoginPasswordError("");
    }

    return isValid;
  };

  // Validate register form
  const validateRegisterForm = () => {
    let isValid = true;

    // Name validation
    if (!registerName) {
      setRegisterNameError("Name is required");
      isValid = false;
    } else if (registerName.length < 2) {
      setRegisterNameError("Name must be at least 2 characters");
      isValid = false;
    } else {
      setRegisterNameError("");
    }

    // Email validation
    if (!registerEmail) {
      setRegisterEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(registerEmail)) {
      setRegisterEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setRegisterEmailError("");
    }

    // Password validation
    if (!registerPassword) {
      setRegisterPasswordError("Password is required");
      isValid = false;
    } else if (registerPassword.length < 6) {
      setRegisterPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setRegisterPasswordError("");
    }

    return isValid;
  };

  // Handle login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(loginEmail, loginPassword);

      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to Swift Grocery Delivery!",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle register submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRegisterForm()) {
      return;
    }

    setIsLoading(true);
    try {
      let supermarketName;
      if (registerRole === "employee" && registerSupermarketId) {
        const selectedSupermarket = supermarkets.find(
          (s) => s.id === registerSupermarketId
        );
        supermarketName = selectedSupermarket?.name;
      }
      const success = await register(
        registerName,
        registerEmail,
        registerPassword,
        registerRole,
        registerSupermarketId,
        supermarketName
      );

      if (success) {
        toast({
          title: "Registration successful",
          description: "Welcome to Swift Grocery Delivery!",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Registration failed",
          description: "Email already exists. Please try another email.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Swift Grocery</CardTitle>
        <CardDescription className="text-center">
          {activeTab === "login"
            ? "Sign in to your account"
            : "Create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                {loginEmailError && (
                  <p className="text-sm font-medium text-destructive">
                    {loginEmailError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                {loginPasswordError && (
                  <p className="text-sm font-medium text-destructive">
                    {loginPasswordError}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon
                      icon="mdi:loading"
                      className="mr-2 h-4 w-4 animate-spin"
                    />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
                {registerNameError && (
                  <p className="text-sm font-medium text-destructive">
                    {registerNameError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="register-email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
                {registerEmailError && (
                  <p className="text-sm font-medium text-destructive">
                    {registerEmailError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="register-password"
                  className="text-sm font-medium"
                >
                  Password
                </label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                {registerPasswordError && (
                  <p className="text-sm font-medium text-destructive">
                    {registerPasswordError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Select
                  value={registerRole}
                  onValueChange={(value) =>
                    setRegisterRole(
                      value as "buyer" | "manager" | "admin" | "employee"
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="manager">Supermarket Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {registerRole === "employee" && (
                <div className="space-y-2">
                  <label htmlFor="supermarket" className="text-sm font-medium">
                    Supermarket
                  </label>
                  <Select
                    value={registerSupermarketId?.toString()}
                    onValueChange={(value) =>
                      setRegisterSupermarketId(Number(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your supermarket" />
                    </SelectTrigger>
                    <SelectContent>
                      {supermarkets.map((supermarket) => (
                        <SelectItem
                          key={supermarket.id}
                          value={supermarket.id.toString()}
                        >
                          {supermarket.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {registerSupermarketError && (
                    <p className="text-sm text-destructive">
                      {registerSupermarketError}
                    </p>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon
                      icon="mdi:loading"
                      className="mr-2 h-4 w-4 animate-spin"
                    />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-gray-500 text-center">
          {activeTab === "login" ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setActiveTab("register")}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
