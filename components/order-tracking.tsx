"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "../app/tracking.css";

import {
  CheckCircle,
  Package,
  Truck,
  Home,
  Clock,
  Phone,
  AlertCircle,
} from "lucide-react";

export default function OrderTracking({
  orderNumber,
}: {
  orderNumber: string;
}) {
  const mapRef = useRef(null);

  const [order] = useState({
    id: orderNumber, // Use the orderNumber here
    store: "Fresh Mart Supermarket",
    date: "May 15, 2023 2:30 PM",
    total: 78.95,
    status: "being_packed", // order_placed, being_packed, out_for_delivery, delivered
    estimatedTime: "25:45",
    estimatedArrival: "2:30pm - 3:00pm arrival",
    deliveryPerson: {
      name: "Michael Rodriguez",
      phone: "+251912345678",
      image: "/delivery-person.png",
    },
    tracking: {
      distance: "1.5 miles away",
      eta: "~20 minutes",
    },
    items: [
      {
        id: 1,
        name: "Organic Bananas",
        qty: 1,
        price: 3.99,
        image: "/banana.png",
      },
      {
        id: 2,
        name: "Whole Grain Bread",
        qty: 2,
        price: 4.49,
        image: "/bread.png",
      },
      {
        id: 3,
        name: "Free Range Eggs (12pk)",
        qty: 1,
        price: 5.99,
        image: "/eggs.png",
      },
      {
        id: 4,
        name: "Organic Milk (1 Gallon)",
        qty: 1,
        price: 4.99,
        image: "/milk.png",
      },
      {
        id: 5,
        name: "Avocados (4pk)",
        qty: 1,
        price: 6.99,
        image: "/avocado.png",
      },
    ],
  });

  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [address, setAddress] = useState("New York");
  const [newAddress, setNewAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("home");
  const [contactTab, setContactTab] = useState("call");
  const [message, setMessage] = useState("");

  const savedAddresses = [
    {
      id: "home",
      label: "Home",
      address: "123 Main St, Addis Ababa",
      isDefault: true,
    },
    {
      id: "work",
      label: "Work",
      address: "456 Office Blvd, Addis Ababa",
      isDefault: false,
    },
    {
      id: "other",
      label: "Other",
      address: "789 Other Ave, Addis Ababa",
      isDefault: false,
    },
  ];

  // Initialize the map
  useEffect(() => {
    // Function to initialize the map
    const initMap = () => {
      if (!mapRef.current) return;

      // Check if Google Maps API is loaded
      if (window.google && window.google.maps) {
        // Addis Ababa coordinates
        const addisAbaba = { lat: 9.0222, lng: 38.7468 };

        // Create the map
        const map = new window.google.maps.Map(mapRef.current, {
          center: addisAbaba,
          zoom: 13,
          disableDefaultUI: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        // Delivery route coordinates (simplified for demo)
        const deliveryRoute = [
          { lat: 9.0222, lng: 38.7468 }, // Start point
          { lat: 9.03, lng: 38.76 },
          { lat: 9.035, lng: 38.77 },
          { lat: 9.04, lng: 38.78 }, // Destination
        ];

        // Create delivery person marker
        const deliveryMarker = new window.google.maps.Marker({
          position: deliveryRoute[1],
          map: map,
          icon: {
            url: "/delivery-marker.png",
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });

        // Create destination marker
        const destinationMarker = new window.google.maps.Marker({
          position: deliveryRoute[deliveryRoute.length - 1],
          map: map,
          icon: {
            url: "/destination-marker.png",
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });

        // Draw the route path
        const routePath = new window.google.maps.Polyline({
          path: deliveryRoute,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 3,
        });

        routePath.setMap(map);
      } else {
        // If Google Maps API is not loaded, load it
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
        }&callback=initializeMap`;
        script.async = true;
        script.defer = true;

        // Define the callback function globally
        window.initializeMap = initMap;

        document.head.appendChild(script);
      }
    };

    // Call initMap when component mounts
    initMap();

    // Cleanup function
    return () => {
      if (window.initializeMap) {
        delete window.initializeMap;
      }
    };
  }, []);

  const handleSaveAddress = () => {
    if (selectedAddress === "new" && newAddress.trim()) {
      setAddress(newAddress);
    } else {
      const selected = savedAddresses.find(
        (addr) => addr.id === selectedAddress
      );
      if (selected) {
        setAddress(selected.address);
      }
    }
    setShowAddressDialog(false);
  };

  useEffect(() => {
    const defaultAddress = savedAddresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      setAddress(defaultAddress.address);
      setSelectedAddress(defaultAddress.id);
    }
  }, []);

  const handleCall = () => {
    // In a real app, this would initiate a call
    window.location.href = `tel:${order.deliveryPerson.phone}`;
    setShowContactDialog(false);
  };

  const handleSendMessage = () => {
    // In a real app, this would send the message to the delivery person
    alert(`Message sent: ${message}`);
    setMessage("");
    setShowContactDialog(false);
  };

  return (
    <div className="tracking-container">
      {/* Main Content */}
      <main className="tracking-main">
        {/* Order Header */}
        <div className="tracking-order-header">
          <div>
            <h1 className="tracking-order-id">Order #{order.id}</h1>
            <p className="tracking-store-name">{order.store}</p>
          </div>
          <div>
            <p className="tracking-order-date">{order.date}</p>
            <p className="tracking-order-total">${order.total.toFixed(2)}</p>
          </div>
        </div>

        {/* Order Status */}
        <div className="tracking-status-container">
          <h2 className="tracking-section-title">Order Status</h2>
          <div className="tracking-status-progress">
            <div className="tracking-progress-bar">
              <div
                className="tracking-progress-fill"
                style={{
                  width:
                    order.status === "order_placed"
                      ? "25%"
                      : order.status === "being_packed"
                      ? "50%"
                      : order.status === "out_for_delivery"
                      ? "75%"
                      : "100%",
                }}
              ></div>
            </div>
            <div className="tracking-status-steps">
              <div className="tracking-status-step">
                <div className="tracking-status-icon tracking-completed">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <p className="tracking-status-label">Order Placed</p>
                <p className="tracking-status-time">2:15pm</p>
              </div>
              <div className="tracking-status-step">
                <div
                  className={`tracking-status-icon ${
                    order.status === "being_packed" ||
                    order.status === "out_for_delivery" ||
                    order.status === "delivered"
                      ? "tracking-completed"
                      : ""
                  }`}
                >
                  <Package className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <p className="tracking-status-label">Being Packed</p>
                <p className="tracking-status-time">2:30pm</p>
              </div>
              <div className="tracking-status-step">
                <div
                  className={`tracking-status-icon ${
                    order.status === "out_for_delivery" ||
                    order.status === "delivered"
                      ? "tracking-current"
                      : ""
                  }`}
                >
                  <Truck className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <p className="tracking-status-label">Out for Delivery</p>
                <p className="tracking-status-time">2:45pm</p>
              </div>
              <div className="tracking-status-step">
                <div
                  className={`tracking-status-icon ${
                    order.status === "delivered" ? "tracking-completed" : ""
                  }`}
                >
                  <Home className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <p className="tracking-status-label">Delivered</p>
                <p className="tracking-status-time">Expected 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="tracking-delivery-info">
          {/* Estimated Delivery Time */}
          <div className="tracking-info-card">
            <div className="tracking-info-icon">
              <Clock className="h-4 w-4 text-green-500" />
            </div>
            <div className="tracking-info-content">
              <h3 className="tracking-info-label">Estimated Delivery Time</h3>
              <p className="tracking-delivery-time">{order.estimatedTime}</p>
              <p className="tracking-arrival-time">{order.estimatedArrival}</p>
            </div>
          </div>

          {/* Delivery Person */}
          <div className="tracking-info-card">
            <div className="tracking-delivery-person-img">
              <Image
                src={order.deliveryPerson.image || "/placeholder.svg"}
                alt={order.deliveryPerson.name}
                width={60}
                height={60}
                className="tracking-delivery-person-img"
              />
            </div>
            <div className="tracking-info-content">
              <h3 className="tracking-info-label">Delivery Person</h3>
              <p className="tracking-person-name">
                {order.deliveryPerson.name}
              </p>
              <p className="tracking-person-phone">
                {order.deliveryPerson.phone}
              </p>
              <button
                className="tracking-contact-button"
                onClick={() => setShowContactDialog(true)}
              >
                <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Contact</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Tracking */}
        <div className="tracking-map-container">
          <h2 className="tracking-section-title">Live Tracking</h2>
          <div className="tracking-map" ref={mapRef}>
            {/* Map will be rendered here by JavaScript */}
            <div className="tracking-map-badge tracking-map-badge-left">
              <div className="tracking-map-indicator"></div>
              <span>{order.tracking.distance}</span>
            </div>
            <div className="tracking-map-badge tracking-map-badge-right">
              <div className="tracking-map-indicator"></div>
              <span>Arriving in {order.tracking.eta}</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="tracking-items-container">
          <h2 className="tracking-section-title">Order Items</h2>
          <div>
            {order.items.map((item) => (
              <div key={item.id} className="tracking-item">
                <div className="tracking-item-image">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                  />
                </div>
                <div className="tracking-item-details">
                  <h3 className="tracking-item-name">{item.name}</h3>
                  <p className="tracking-item-qty">Qty: {item.qty}</p>
                </div>
                <div className="tracking-item-price">
                  ${item.price.toFixed(2)}
                </div>
              </div>
            ))}

            <div className="tracking-total-row">
              <p>Total</p>
              <p>${order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Address Dialog */}
      {showAddressDialog && (
        <div
          className="tracking-dialog-overlay"
          onClick={() => setShowAddressDialog(false)}
        >
          <div className="tracking-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="tracking-dialog-header">
              <h2 className="tracking-dialog-title">Delivery Address</h2>
              <p className="tracking-dialog-description">
                Select or enter your delivery address.
              </p>
            </div>
            <div className="tracking-dialog-content">
              <div className="tracking-address-options">
                {savedAddresses.map((addr) => (
                  <div key={addr.id} className="tracking-address-option">
                    <input
                      type="radio"
                      id={addr.id}
                      name="address"
                      value={addr.id}
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                    />
                    <label htmlFor={addr.id}>
                      <span className="tracking-address-label">
                        {addr.label}
                        {addr.isDefault && (
                          <span className="tracking-address-default">
                            Default
                          </span>
                        )}
                      </span>
                      <span className="tracking-address-detail">
                        {addr.address}
                      </span>
                    </label>
                  </div>
                ))}
                <div className="tracking-address-option">
                  <input
                    type="radio"
                    id="new"
                    name="address"
                    value="new"
                    checked={selectedAddress === "new"}
                    onChange={() => setSelectedAddress("new")}
                  />
                  <label htmlFor="new">
                    <span className="tracking-address-label">New Address</span>
                    <input
                      type="text"
                      placeholder="Enter a new address"
                      value={newAddress}
                      onChange={(e) => {
                        setNewAddress(e.target.value);
                        setSelectedAddress("new");
                      }}
                      className="tracking-search-input"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="tracking-dialog-footer">
              <button
                className="tracking-help-button tracking-outline-button"
                onClick={() => setShowAddressDialog(false)}
              >
                Cancel
              </button>
              <button
                className="tracking-help-button tracking-primary-button"
                onClick={handleSaveAddress}
                disabled={selectedAddress === "new" && !newAddress.trim()}
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Dialog */}
      {showContactDialog && (
        <div
          className="tracking-dialog-overlay"
          onClick={() => setShowContactDialog(false)}
        >
          <div className="tracking-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="tracking-dialog-header">
              <h2 className="tracking-dialog-title">Contact Delivery Person</h2>
              <p className="tracking-dialog-description">
                Choose how you want to contact your delivery person.
              </p>
            </div>
            <div className="tracking-dialog-content">
              <div className="tracking-tabs">
                <div className="tracking-tabs-list">
                  <button
                    className={`tracking-tab ${
                      contactTab === "call" ? "tracking-tab-active" : ""
                    }`}
                    onClick={() => setContactTab("call")}
                  >
                    Call
                  </button>
                  <button
                    className={`tracking-tab ${
                      contactTab === "message" ? "tracking-tab-active" : ""
                    }`}
                    onClick={() => setContactTab("message")}
                  >
                    Message
                  </button>
                </div>
                {contactTab === "call" ? (
                  <div className="tracking-tab-content">
                    <div className="tracking-call-content">
                      <Phone className="tracking-call-icon" />
                      <p className="tracking-call-title">
                        Call Delivery Person
                      </p>
                      <p className="tracking-call-description">
                        Call your delivery person directly to discuss your
                        order.
                      </p>
                      <p className="tracking-call-number">
                        {order.deliveryPerson.phone}
                      </p>
                      <button
                        className="tracking-help-button tracking-primary-button"
                        onClick={handleCall}
                      >
                        Call Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="tracking-tab-content">
                    <div className="tracking-message-content">
                      <p className="tracking-message-description">
                        Send a quick message to your delivery person about your
                        order.
                      </p>
                      <div className="tracking-message-input-container">
                        <label htmlFor="message">Message</label>
                        <textarea
                          id="message"
                          placeholder="Type your message here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="tracking-message-textarea"
                        ></textarea>
                      </div>
                      <div className="tracking-dialog-footer">
                        <button
                          className="tracking-help-button tracking-outline-button"
                          onClick={() => setShowContactDialog(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="tracking-help-button tracking-primary-button"
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
