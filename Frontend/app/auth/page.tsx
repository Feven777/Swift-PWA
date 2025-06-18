import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Authentication | Swift Grocery Delivery",
  description: "Sign in or create an account with Swift Grocery Delivery",
};

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm />
    </div>
  );
}
