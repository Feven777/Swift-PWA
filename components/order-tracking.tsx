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

        {/* Need Help Section */}
        <div className="tracking-help-container">
          <h2 className="tracking-section-title">Need Help?</h2>
          <div className="tracking-help-buttons">
            <button className="tracking-help-button tracking-outline-button">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Report an Issue
            </button>
            <button className="tracking-help-button tracking-outline-button">
              Contact Support
            </button>
            <button className="tracking-help-button tracking-primary-button">
              Track Another Order
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="tracking-footer">
        <div className="tracking-footer-container">
          <div className="tracking-footer-grid">
            <div className="tracking-footer-column">
              <h3>Swift Delivery</h3>
              <p className="tracking-footer-links">
                Making grocery delivery simple, fast, and convenient.
              </p>
              <div className="tracking-social-icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </div>
            </div>

            <div className="tracking-footer-column">
              <h3>Shop</h3>
              <ul className="tracking-footer-links">
                <li>Groceries</li>
                <li>Fresh Produce</li>
                <li>Meal Kits</li>
                <li>Deals & Offers</li>
              </ul>
            </div>

            <div className="tracking-footer-column">
              <h3>Help</h3>
              <ul className="tracking-footer-links">
                <li>Track Order</li>
                <li>Delivery Info</li>
                <li>Returns & Refunds</li>
                <li>Contact Support</li>
              </ul>
            </div>

            <div className="tracking-footer-column">
              <h3>About</h3>
              <ul className="tracking-footer-links">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
          </div>

          <div className="tracking-footer-bottom">
            <p>© 2023 Swift Delivery. All rights reserved.</p>
            <div className="tracking-footer-legal">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </footer>

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
