"use client";
import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Trash2, AlertCircle } from "lucide-react";
import ProfileSidebar from "@/components/profile-sidebar";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SettingsPage() {
  // Account information state
  const [accountInfo, setAccountInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
  });

  // Password state
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    marketing: true,
    dataSharing: true,
    activityTracking: true,
  });

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Visa", last4: "4242", expiry: "04/25" },
    { id: 2, type: "Mastercard", last4: "8888", expiry: "12/26" },
  ]);

  // Addresses state
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      isDefault: true,
      street: "123 Main Street, Apt 4B",
      city: "Addis Ababa",
      state: "NY",
      zip: "10001",
    },
    {
      id: 2,
      name: "Work",
      isDefault: false,
      street: "456 Business Ave, Floor 10",
      city: "Addis Ababa",
      state: "NY",
      zip: "10002",
    },
  ]);

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState({
    account: false,
    password: false,
  });

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState({
    deleteAccount: false,
    deletePayment: null as number | null,
    deleteAddress: null as number | null,
    addPayment: false,
    addAddress: false,
  });

  // Add these new state variables after the existing dialog states
  const [editingPayment, setEditingPayment] = useState<number | null>(null);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);

  // New payment method state
  const [newPayment, setNewPayment] = useState({
    cardNumber: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  // New address state
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  });

  // Add these new state variables after the newAddress state
  const [editPayment, setEditPayment] = useState({
    cardNumber: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [editAddress, setEditAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  });

  // Form validation state
  const [errors, setErrors] = useState({
    account: {} as Record<string, string>,
    password: {} as Record<string, string>,
    newPayment: {} as Record<string, string>,
    newAddress: {} as Record<string, string>,
    editPayment: {} as Record<string, string>,
    editAddress: {} as Record<string, string>,
  });

  // Handle account info change
  const handleAccountInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAccountInfo((prev) => ({
      ...prev,
      [id.replace("account-", "")]: value,
    }));

    // Clear error if field is filled
    if (value.trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        account: { ...prev.account, [id.replace("account-", "")]: "" },
      }));
    }
  };

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPassword((prev) => ({ ...prev, [id.replace("password-", "")]: value }));

    // Clear error if field is filled
    if (value.trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        password: { ...prev.password, [id.replace("password-", "")]: "" },
      }));
    }
  };

  // Handle privacy setting toggle
  const handlePrivacyToggle = (setting: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({ ...prev, [setting]: !prev[setting] }));

    // Show toast notification
    toast({
      title: "Setting updated",
      description: `${
        setting.charAt(0).toUpperCase() +
        setting.slice(1).replace(/([A-Z])/g, " $1")
      } has been ${!privacySettings[setting] ? "enabled" : "disabled"}.`,
    });
  };

  // Handle account info submission
  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: Record<string, string> = {};
    if (!accountInfo.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!accountInfo.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!accountInfo.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(accountInfo.email))
      newErrors.email = "Email is invalid";
    if (!accountInfo.phone.trim()) newErrors.phone = "Phone number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, account: newErrors }));
      return;
    }

    // Submit form
    setIsSubmitting((prev) => ({ ...prev, account: true }));

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting((prev) => ({ ...prev, account: false }));
      toast({
        title: "Account updated",
        description: "Your account information has been updated successfully.",
      });
    }, 1000);
  };

  // Handle password submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: Record<string, string> = {};
    if (!password.current.trim())
      newErrors.current = "Current password is required";
    if (!password.new.trim()) newErrors.new = "New password is required";
    else if (password.new.length < 8)
      newErrors.new = "Password must be at least 8 characters";
    if (!password.confirm.trim())
      newErrors.confirm = "Please confirm your password";
    else if (password.new !== password.confirm)
      newErrors.confirm = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, password: newErrors }));
      return;
    }

    // Submit form
    setIsSubmitting((prev) => ({ ...prev, password: true }));

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting((prev) => ({ ...prev, password: false }));
      setPassword({ current: "", new: "", confirm: "" });
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
    }, 1000);
  };

  // Add these new functions before the handleDeletePayment function

  // Handle edit payment method
  const handleEditPaymentClick = (id: number) => {
    const paymentToEdit = paymentMethods.find((method) => method.id === id);
    if (paymentToEdit) {
      setEditPayment({
        cardNumber: `**** **** **** ${paymentToEdit.last4}`,
        name: "John Doe", //  this would come from the API
        expiry: paymentToEdit.expiry,
        cvv: "",
      });
      setEditingPayment(id);
    }
  };

  // Handle edit address
  const handleEditAddressClick = (id: number) => {
    const addressToEdit = addresses.find((address) => address.id === id);
    if (addressToEdit) {
      setEditAddress({
        name: addressToEdit.name,
        street: addressToEdit.street,
        city: addressToEdit.city,
        state: addressToEdit.state,
        zip: addressToEdit.zip,
        isDefault: addressToEdit.isDefault,
      });
      setEditingAddress(id);
    }
  };

  // Handle save edited payment
  const handleSaveEditedPayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: Record<string, string> = {};
    if (!editPayment.expiry.trim())
      newErrors.expiry = "Expiry date is required";
    else if (!/^\d{2}\/\d{2}$/.test(editPayment.expiry))
      newErrors.expiry = "Invalid expiry date (MM/YY)";

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, editPayment: newErrors }));
      return;
    }

    // Update payment method
    if (editingPayment !== null) {
      setPaymentMethods((prev) =>
        prev.map((method) =>
          method.id === editingPayment
            ? {
                ...method,
                expiry: editPayment.expiry,
              }
            : method
        )
      );

      // Reset form and close dialog
      setEditPayment({ cardNumber: "", name: "", expiry: "", cvv: "" });
      setEditingPayment(null);

      toast({
        title: "Payment method updated",
        description: "Your payment method has been updated successfully.",
      });
    }
  };

  // Handle save edited address
  const handleSaveEditedAddress = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: Record<string, string> = {};
    if (!editAddress.name.trim()) newErrors.name = "Name is required";
    if (!editAddress.street.trim())
      newErrors.street = "Street address is required";
    if (!editAddress.city.trim()) newErrors.city = "City is required";
    if (!editAddress.state.trim()) newErrors.state = "State is required";
    if (!editAddress.zip.trim()) newErrors.zip = "ZIP code is required";
    else if (!/^\d{5}(-\d{4})?$/.test(editAddress.zip))
      newErrors.zip = "Invalid ZIP code";

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, editAddress: newErrors }));
      return;
    }

    // Update address
    if (editingAddress !== null) {
      setAddresses((prev) => {
        // If edited address is being set as default, update all others
        if (
          editAddress.isDefault &&
          !prev.find((a) => a.id === editingAddress)?.isDefault
        ) {
          prev = prev.map((address) => ({
            ...address,
            isDefault: false,
          }));
        }

        return prev.map((address) =>
          address.id === editingAddress
            ? {
                ...address,
                name: editAddress.name,
                street: editAddress.street,
                city: editAddress.city,
                state: editAddress.state,
                zip: editAddress.zip,
                isDefault: editAddress.isDefault || address.isDefault, // Keep default if it was already default
              }
            : address
        );
      });

      // Reset form and close dialog
      setEditAddress({
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        isDefault: false,
      });
      setEditingAddress(null);

      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      });
    }
  };

  // Add these handlers for input changes
  const handleEditPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEditPayment((prev) => ({
      ...prev,
      [id.replace("edit-payment-", "")]: value,
    }));

    // Clear error if field is filled
    if (value.trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        editPayment: {
          ...(prev.editPayment || {}),
          [id.replace("edit-payment-", "")]: "",
        },
      }));
    }
  };

  const handleEditAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setEditAddress((prev) => ({
      ...prev,
      [id.replace("edit-address-", "")]: type === "checkbox" ? checked : value,
    }));

    // Clear error if field is filled
    if (value.trim() !== "" || type === "checkbox") {
      setErrors((prev) => ({
        ...prev,
        editAddress: {
          ...(prev.editAddress || {}),
          [id.replace("edit-address-", "")]: "",
        },
      }));
    }
  };

  // Handle delete payment method
  const handleDeletePayment = (id: number) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
    setDialogOpen((prev) => ({ ...prev, deletePayment: null }));
    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed successfully.",
    });
  };

  // Handle delete address
  const handleDeleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
    setDialogOpen((prev) => ({ ...prev, deleteAddress: null }));
    toast({
      title: "Address removed",
      description: "Your address has been removed successfully.",
    });
  };

  // Handle set default address
  const handleSetDefaultAddress = (id: number) => {
    setAddresses((prev) =>
      prev.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
    toast({
      title: "Default address updated",
      description: "Your default address has been updated successfully.",
    });
  };

  // Handle new payment method change
  const handleNewPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewPayment((prev) => ({
      ...prev,
      [id.replace("new-payment-", "")]: value,
    }));

    // Clear error if field is filled
    if (value.trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        newPayment: {
          ...prev.newPayment,
          [id.replace("new-payment-", "")]: "",
        },
      }));
    }
  };

  // Handle new address change
  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [id.replace("new-address-", "")]: type === "checkbox" ? checked : value,
    }));

    // Clear error if field is filled
    if (value.trim() !== "" || type === "checkbox") {
      setErrors((prev) => ({
        ...prev,
        newAddress: {
          ...prev.newAddress,
          [id.replace("new-address-", "")]: "",
        },
      }));
    }
  };

  // Handle add payment method
  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: Record<string, string> = {};
    if (!newPayment.cardNumber.trim())
      newErrors.cardNumber = "Card number is required";
    else if (!/^\d{16}$/.test(newPayment.cardNumber.replace(/\s/g, "")))
      newErrors.cardNumber = "Invalid card number";
    if (!newPayment.name.trim()) newErrors.name = "Name is required";
    if (!newPayment.expiry.trim()) newErrors.expiry = "Expiry date is required";
    else if (!/^\d{2}\/\d{2}$/.test(newPayment.expiry))
      newErrors.expiry = "Invalid expiry date (MM/YY)";
    if (!newPayment.cvv.trim()) newErrors.cvv = "CVV is required";
    else if (!/^\d{3,4}$/.test(newPayment.cvv)) newErrors.cvv = "Invalid CVV";

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, newPayment: newErrors }));
      return;
    }

    // Add payment method
    const newId = Math.max(...paymentMethods.map((method) => method.id), 0) + 1;
    const cardType = newPayment.cardNumber.startsWith("4")
      ? "Visa"
      : "Mastercard";
    const last4 = newPayment.cardNumber.slice(-4);

    setPaymentMethods((prev) => [
      ...prev,
      { id: newId, type: cardType, last4, expiry: newPayment.expiry },
    ]);

    // Reset form and close dialog
    setNewPayment({ cardNumber: "", name: "", expiry: "", cvv: "" });
    setDialogOpen((prev) => ({ ...prev, addPayment: false }));

    toast({
      title: "Payment method added",
      description: "Your new payment method has been added successfully.",
    });
  };

  // Handle add address
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: Record<string, string> = {};
    if (!newAddress.name.trim()) newErrors.name = "Name is required";
    if (!newAddress.street.trim())
      newErrors.street = "Street address is required";
    if (!newAddress.city.trim()) newErrors.city = "City is required";
    if (!newAddress.state.trim()) newErrors.state = "State is required";
    if (!newAddress.zip.trim()) newErrors.zip = "ZIP code is required";
    else if (!/^\d{5}(-\d{4})?$/.test(newAddress.zip))
      newErrors.zip = "Invalid ZIP code";

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, newAddress: newErrors }));
      return;
    }

    // Add address
    const newId = Math.max(...addresses.map((address) => address.id), 0) + 1;

    setAddresses((prev) => {
      // If new address is default, update all others
      if (newAddress.isDefault) {
        prev = prev.map((address) => ({
          ...address,
          isDefault: false,
        }));
      }

      return [
        ...prev,
        {
          id: newId,
          name: newAddress.name,
          street: newAddress.street,
          city: newAddress.city,
          state: newAddress.state,
          zip: newAddress.zip,
          isDefault: newAddress.isDefault || prev.length === 0, // First address is default
        },
      ];
    });

    // Reset form and close dialog
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false,
    });
    setDialogOpen((prev) => ({ ...prev, addAddress: false }));

    toast({
      title: "Address added",
      description: "Your new address has been added successfully.",
    });
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    //this would call an API to delete the account
    setDialogOpen((prev) => ({ ...prev, deleteAccount: false }));

    toast({
      title: "Account deleted",
      description: "Your account has been deleted successfully.",
      variant: "destructive",
    });

    // Redirect to home page after a delay
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Import ProfileSidebar component */}
        <div className="hidden lg:block">
          <ProfileSidebar activePage="settings" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Settings
          </h1>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAccountSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="account-firstName">First Name</Label>
                        <Input
                          id="account-firstName"
                          value={accountInfo.firstName}
                          onChange={handleAccountInfoChange}
                          className={
                            errors.account.firstName ? "border-red-500" : ""
                          }
                        />
                        {errors.account.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.account.firstName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-lastName">Last Name</Label>
                        <Input
                          id="account-lastName"
                          value={accountInfo.lastName}
                          onChange={handleAccountInfoChange}
                          className={
                            errors.account.lastName ? "border-red-500" : ""
                          }
                        />
                        {errors.account.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.account.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-email">Email</Label>
                      <Input
                        id="account-email"
                        type="email"
                        value={accountInfo.email}
                        onChange={handleAccountInfoChange}
                        className={errors.account.email ? "border-red-500" : ""}
                      />
                      {errors.account.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.account.email}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-phone">Phone Number</Label>
                      <Input
                        id="account-phone"
                        type="tel"
                        value={accountInfo.phone}
                        onChange={handleAccountInfoChange}
                        className={errors.account.phone ? "border-red-500" : ""}
                      />
                      {errors.account.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.account.phone}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isSubmitting.account}
                    >
                      {isSubmitting.account ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password-current">Current Password</Label>
                      <Input
                        id="password-current"
                        type="password"
                        value={password.current}
                        onChange={handlePasswordChange}
                        className={
                          errors.password.current ? "border-red-500" : ""
                        }
                      />
                      {errors.password.current && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password.current}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-new">New Password</Label>
                      <Input
                        id="password-new"
                        type="password"
                        value={password.new}
                        onChange={handlePasswordChange}
                        className={errors.password.new ? "border-red-500" : ""}
                      />
                      {errors.password.new && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password.new}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-confirm">
                        Confirm New Password
                      </Label>
                      <Input
                        id="password-confirm"
                        type="password"
                        value={password.confirm}
                        onChange={handlePasswordChange}
                        className={
                          errors.password.confirm ? "border-red-500" : ""
                        }
                      />
                      {errors.password.confirm && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password.confirm}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isSubmitting.password}
                    >
                      {isSubmitting.password
                        ? "Updating..."
                        : "Update Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Manage your privacy preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing" className="font-medium">
                        Marketing Communications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive emails about promotions and new features
                      </p>
                    </div>
                    <Switch
                      id="marketing"
                      checked={privacySettings.marketing}
                      onCheckedChange={() => handlePrivacyToggle("marketing")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-sharing" className="font-medium">
                        Data Sharing
                      </Label>
                      <p className="text-sm text-gray-500">
                        Allow us to use your data to improve our services
                      </p>
                    </div>
                    <Switch
                      id="data-sharing"
                      checked={privacySettings.dataSharing}
                      onCheckedChange={() => handlePrivacyToggle("dataSharing")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="activity-tracking"
                        className="font-medium"
                      >
                        Activity Tracking
                      </Label>
                      <p className="text-sm text-gray-500">
                        Track your browsing activity to personalize
                        recommendations
                      </p>
                    </div>
                    <Switch
                      id="activity-tracking"
                      checked={privacySettings.activityTracking}
                      onCheckedChange={() =>
                        handlePrivacyToggle("activityTracking")
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible actions for your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      setDialogOpen((prev) => ({
                        ...prev,
                        deleteAccount: true,
                      }))
                    }
                  >
                    Delete Account
                  </Button>

                  <Dialog
                    open={dialogOpen.deleteAccount}
                    onOpenChange={(open) =>
                      setDialogOpen((prev) => ({
                        ...prev,
                        deleteAccount: open,
                      }))
                    }
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to delete your account?
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>
                          All your data, including order history, saved
                          addresses, and payment methods will be permanently
                          deleted.
                        </AlertDescription>
                      </Alert>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() =>
                            setDialogOpen((prev) => ({
                              ...prev,
                              deleteAccount: false,
                            }))
                          }
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteAccount}
                        >
                          Delete Account
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between p-4 border rounded-md"
                      >
                        <div className="flex items-center">
                          <CreditCard className="h-6 w-6 text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium">
                              {method.type} ending in {method.last4}
                            </p>
                            <p className="text-sm text-gray-500">
                              Expires {method.expiry}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPaymentClick(method.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() =>
                              setDialogOpen((prev) => ({
                                ...prev,
                                deletePayment: method.id,
                              }))
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          <Dialog
                            open={dialogOpen.deletePayment === method.id}
                            onOpenChange={(open) =>
                              setDialogOpen((prev) => ({
                                ...prev,
                                deletePayment: open ? method.id : null,
                              }))
                            }
                          >
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Remove Payment Method</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to remove this payment
                                  method?
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex items-center p-4 border rounded-md">
                                <CreditCard className="h-6 w-6 text-gray-500 mr-3" />
                                <div>
                                  <p className="font-medium">
                                    {method.type} ending in {method.last4}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Expires {method.expiry}
                                  </p>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    setDialogOpen((prev) => ({
                                      ...prev,
                                      deletePayment: null,
                                    }))
                                  }
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleDeletePayment(method.id)}
                                >
                                  Remove
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}

                    {paymentMethods.length === 0 && (
                      <div className="text-center py-8 border rounded-md border-dashed">
                        <p className="text-gray-500">
                          No payment methods added yet
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() =>
                      setDialogOpen((prev) => ({ ...prev, addPayment: true }))
                    }
                  >
                    Add Payment Method
                  </Button>

                  <Dialog
                    open={dialogOpen.addPayment}
                    onOpenChange={(open) =>
                      setDialogOpen((prev) => ({ ...prev, addPayment: open }))
                    }
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Payment Method</DialogTitle>
                        <DialogDescription>
                          Enter your card details to add a new payment method.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddPayment} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-payment-cardNumber">
                            Card Number
                          </Label>
                          <Input
                            id="new-payment-cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={newPayment.cardNumber}
                            onChange={handleNewPaymentChange}
                            className={
                              errors.newPayment.cardNumber
                                ? "border-red-500"
                                : ""
                            }
                          />
                          {errors.newPayment.cardNumber && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.newPayment.cardNumber}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-payment-name">Name on Card</Label>
                          <Input
                            id="new-payment-name"
                            placeholder="John Doe"
                            value={newPayment.name}
                            onChange={handleNewPaymentChange}
                            className={
                              errors.newPayment.name ? "border-red-500" : ""
                            }
                          />
                          {errors.newPayment.name && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.newPayment.name}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-payment-expiry">
                              Expiry Date
                            </Label>
                            <Input
                              id="new-payment-expiry"
                              placeholder="MM/YY"
                              value={newPayment.expiry}
                              onChange={handleNewPaymentChange}
                              className={
                                errors.newPayment.expiry ? "border-red-500" : ""
                              }
                            />
                            {errors.newPayment.expiry && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.newPayment.expiry}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-payment-cvv">CVV</Label>
                            <Input
                              id="new-payment-cvv"
                              placeholder="123"
                              value={newPayment.cvv}
                              onChange={handleNewPaymentChange}
                              className={
                                errors.newPayment.cvv ? "border-red-500" : ""
                              }
                            />
                            {errors.newPayment.cvv && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.newPayment.cvv}
                              </p>
                            )}
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() =>
                              setDialogOpen((prev) => ({
                                ...prev,
                                addPayment: false,
                              }))
                            }
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Add Payment Method
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={editingPayment !== null}
                    onOpenChange={(open) => !open && setEditingPayment(null)}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Payment Method</DialogTitle>
                        <DialogDescription>
                          Update your card details.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleSaveEditedPayment}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="edit-payment-cardNumber">
                            Card Number
                          </Label>
                          <Input
                            id="edit-payment-cardNumber"
                            value={editPayment.cardNumber}
                            disabled
                            className="bg-gray-100"
                          />
                          <p className="text-xs text-gray-500">
                            Card number cannot be edited
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-payment-name">
                            Name on Card
                          </Label>
                          <Input
                            id="edit-payment-name"
                            value={editPayment.name}
                            disabled
                            className="bg-gray-100"
                          />
                          <p className="text-xs text-gray-500">
                            Name cannot be edited
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-payment-expiry">
                              Expiry Date
                            </Label>
                            <Input
                              id="edit-payment-expiry"
                              placeholder="MM/YY"
                              value={editPayment.expiry}
                              onChange={handleEditPaymentChange}
                              className={
                                errors.editPayment?.expiry
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                            {errors.editPayment?.expiry && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.editPayment.expiry}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-payment-cvv">CVV</Label>
                            <Input
                              id="edit-payment-cvv"
                              placeholder="For verification only"
                              value={editPayment.cvv}
                              onChange={handleEditPaymentChange}
                              className={
                                errors.editPayment?.cvv ? "border-red-500" : ""
                              }
                            />
                            {errors.editPayment?.cvv && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.editPayment.cvv}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              Enter for verification only
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setEditingPayment(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>View your past transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between p-4 border-b">
                      <div>
                        <p className="font-medium">Order #12345</p>
                        <p className="text-sm text-gray-500">March 25, 2025</p>
                      </div>
                      <p className="font-medium">$45.99</p>
                    </div>
                    <div className="flex justify-between p-4 border-b">
                      <div>
                        <p className="font-medium">Order #12346</p>
                        <p className="text-sm text-gray-500">March 20, 2025</p>
                      </div>
                      <p className="font-medium">$32.75</p>
                    </div>
                    <div className="flex justify-between p-4 border-b">
                      <div>
                        <p className="font-medium">Order #12347</p>
                        <p className="text-sm text-gray-500">March 15, 2025</p>
                      </div>
                      <p className="font-medium">$67.50</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Addresses</CardTitle>
                  <CardDescription>
                    Manage your delivery locations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="flex items-center justify-between p-4 border rounded-md"
                      >
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{address.name}</p>
                            {address.isDefault && (
                              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {address.street}
                          </p>
                          <p className="text-sm text-gray-500">
                            {address.city}, {address.state} {address.zip}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!address.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleSetDefaultAddress(address.id)
                              }
                            >
                              Set as Default
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditAddressClick(address.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() =>
                              setDialogOpen((prev) => ({
                                ...prev,
                                deleteAddress: address.id,
                              }))
                            }
                            disabled={addresses.length === 1} // Prevent deleting the only address
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          <Dialog
                            open={dialogOpen.deleteAddress === address.id}
                            onOpenChange={(open) =>
                              setDialogOpen((prev) => ({
                                ...prev,
                                deleteAddress: open ? address.id : null,
                              }))
                            }
                          >
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Remove Address</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to remove this address?
                                </DialogDescription>
                              </DialogHeader>
                              <div className="p-4 border rounded-md">
                                <p className="font-medium">{address.name}</p>
                                <p className="text-sm text-gray-500">
                                  {address.street}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {address.city}, {address.state} {address.zip}
                                </p>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    setDialogOpen((prev) => ({
                                      ...prev,
                                      deleteAddress: null,
                                    }))
                                  }
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    handleDeleteAddress(address.id)
                                  }
                                >
                                  Remove
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}

                    {addresses.length === 0 && (
                      <div className="text-center py-8 border rounded-md border-dashed">
                        <p className="text-gray-500">No addresses added yet</p>
                      </div>
                    )}
                  </div>

                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() =>
                      setDialogOpen((prev) => ({ ...prev, addAddress: true }))
                    }
                  >
                    Add New Address
                  </Button>

                  <Dialog
                    open={dialogOpen.addAddress}
                    onOpenChange={(open) =>
                      setDialogOpen((prev) => ({ ...prev, addAddress: open }))
                    }
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                        <DialogDescription>
                          Enter your address details below.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddAddress} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-address-name">Address Name</Label>
                          <Input
                            id="new-address-name"
                            placeholder="Home, Work, etc."
                            value={newAddress.name}
                            onChange={handleNewAddressChange}
                            className={
                              errors.newAddress.name ? "border-red-500" : ""
                            }
                          />
                          {errors.newAddress.name && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.newAddress.name}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-address-street">
                            Street Address
                          </Label>
                          <Input
                            id="new-address-street"
                            placeholder="123 Main St, Apt 4B"
                            value={newAddress.street}
                            onChange={handleNewAddressChange}
                            className={
                              errors.newAddress.street ? "border-red-500" : ""
                            }
                          />
                          {errors.newAddress.street && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.newAddress.street}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-address-city">City</Label>
                            <Input
                              id="new-address-city"
                              placeholder="Addis Ababa"
                              value={newAddress.city}
                              onChange={handleNewAddressChange}
                              className={
                                errors.newAddress.city ? "border-red-500" : ""
                              }
                            />
                            {errors.newAddress.city && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.newAddress.city}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-address-state">State</Label>
                            <Input
                              id="new-address-state"
                              placeholder="NY"
                              value={newAddress.state}
                              onChange={handleNewAddressChange}
                              className={
                                errors.newAddress.state ? "border-red-500" : ""
                              }
                            />
                            {errors.newAddress.state && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.newAddress.state}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-address-zip">ZIP Code</Label>
                          <Input
                            id="new-address-zip"
                            placeholder="10001"
                            value={newAddress.zip}
                            onChange={handleNewAddressChange}
                            className={
                              errors.newAddress.zip ? "border-red-500" : ""
                            }
                          />
                          {errors.newAddress.zip && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.newAddress.zip}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="new-address-isDefault"
                            checked={newAddress.isDefault}
                            onChange={handleNewAddressChange}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <Label htmlFor="new-address-isDefault">
                            Set as default address
                          </Label>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() =>
                              setDialogOpen((prev) => ({
                                ...prev,
                                addAddress: false,
                              }))
                            }
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Add Address
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={editingAddress !== null}
                    onOpenChange={(open) => !open && setEditingAddress(null)}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Address</DialogTitle>
                        <DialogDescription>
                          Update your address details below.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleSaveEditedAddress}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="edit-address-name">
                            Address Name
                          </Label>
                          <Input
                            id="edit-address-name"
                            placeholder="Home, Work, etc."
                            value={editAddress.name}
                            onChange={handleEditAddressChange}
                            className={
                              errors.editAddress?.name ? "border-red-500" : ""
                            }
                          />
                          {errors.editAddress?.name && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.editAddress.name}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-address-street">
                            Street Address
                          </Label>
                          <Input
                            id="edit-address-street"
                            placeholder="123 Main St, Apt 4B"
                            value={editAddress.street}
                            onChange={handleEditAddressChange}
                            className={
                              errors.editAddress?.street ? "border-red-500" : ""
                            }
                          />
                          {errors.editAddress?.street && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.editAddress.street}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-address-city">City</Label>
                            <Input
                              id="edit-address-city"
                              placeholder="Addis Ababa"
                              value={editAddress.city}
                              onChange={handleEditAddressChange}
                              className={
                                errors.editAddress?.city ? "border-red-500" : ""
                              }
                            />
                            {errors.editAddress?.city && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.editAddress.city}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-address-state">State</Label>
                            <Input
                              id="edit-address-state"
                              placeholder="NY"
                              value={editAddress.state}
                              onChange={handleEditAddressChange}
                              className={
                                errors.editAddress?.state
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                            {errors.editAddress?.state && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.editAddress.state}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-address-zip">ZIP Code</Label>
                          <Input
                            id="edit-address-zip"
                            placeholder="10001"
                            value={editAddress.zip}
                            onChange={handleEditAddressChange}
                            className={
                              errors.editAddress?.zip ? "border-red-500" : ""
                            }
                          />
                          {errors.editAddress?.zip && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.editAddress.zip}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="edit-address-isDefault"
                            checked={editAddress.isDefault}
                            onChange={handleEditAddressChange}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <Label htmlFor="edit-address-isDefault">
                            Set as default address
                          </Label>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setEditingAddress(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
