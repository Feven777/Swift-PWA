"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface ContactDeliveryPersonProps {
  phone: string;
}

export default function ContactDeliveryPerson({
  phone,
}: ContactDeliveryPersonProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("call");

  const handleCall = () => {
    //  this would initiate a call
    window.location.href = `tel:${phone}`;
    setOpen(false);
  };

  const handleSendMessage = () => {
    //  this would send the message to the delivery person
    alert(`Message sent: ${message}`);
    setMessage("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="mt-1 text-gray-600 flex items-center gap-1 px-0 text-xs sm:text-sm"
        >
          <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Contact</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[90vw] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Contact Delivery Person</DialogTitle>
          <DialogDescription>
            Choose how you want to contact your delivery person.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="call">Call</TabsTrigger>
            <TabsTrigger value="message">Message</TabsTrigger>
          </TabsList>
          <TabsContent value="call" className="mt-3 sm:mt-4">
            <div className="flex flex-col items-center justify-center py-3 sm:py-4">
              <Phone className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 mb-3 sm:mb-4" />
              <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">
                Call Delivery Person
              </p>
              <p className="text-center text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Call your delivery person directly to discuss your order.
              </p>
              <p className="font-medium text-base sm:text-lg mb-4 sm:mb-6">
                {phone}
              </p>
              <Button onClick={handleCall} className="w-full">
                Call Now
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="message" className="mt-3 sm:mt-4">
            <div className="flex flex-col py-2 sm:py-4">
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Send a quick message to your delivery person about your order.
              </p>
              <div className="grid gap-3 sm:gap-4">
                <div className="grid gap-1 sm:gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[80px] sm:min-h-[100px] text-sm"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="mt-3 sm:mt-4 sm:justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="sm:w-auto w-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="sm:w-auto w-full"
              >
                Send Message
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// This component is used in the ContactDeliveryPerson component
function Label({
  htmlFor,
  children,
  className = "",
}: {
  htmlFor: string; // Explicitly typed as string
  children: React.ReactNode; // Explicitly typed as ReactNode
  className?: string; // Optional string type for className
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  );
}
