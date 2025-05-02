"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const signupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  function onSubmit(data: SignupFormValues) {
    console.log("Signup with:", data);
    // Handle your signup logic here
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Sign up to enjoy fast grocery shopping.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-muted-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter password"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-muted-foreground"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Agree to Terms */}
                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="leading-none">
                        <FormLabel>I agree to the Terms & Conditions</FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Sign Up
              </Button>

              {/* Login Link */}
              <div className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-orange-500 underline hover:text-orange-600"
                >
                  Log In
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
