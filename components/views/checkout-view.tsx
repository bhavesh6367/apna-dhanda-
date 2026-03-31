"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useShop } from "@/context/shop-context";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Loader2, 
  ArrowRight, 
  Lock, 
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", 
  "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", 
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

const PAYMENT_METHODS = [
  {
    id: 'online',
    label: 'Online Payment',
    sublabel: 'UPI / Cards / Net Banking',
    icon: <CreditCard size={18} />,
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    sublabel: '₹49 extra COD charge',
    icon: <Banknote size={18} />,
  },
  {
    id: 'upi',
    label: 'UPI / QR Code',
    sublabel: 'Pay via any UPI app',
    icon: <Smartphone size={18} />,
  },
];

interface FormErrors {
  [key: string]: string;
}

export function CheckoutView() {
  const { 
    cart, 
    updateCartQty, 
    removeFromCart, 
    setCurrentScreen, 
    setLastOrderId, 
    addNotification,
    setCheckoutTransitioning
  } = useShop();
  
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
    landmark: "",
    note: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFetchingPincode, setIsFetchingPincode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !isSubmitting) {
      addNotification("Your cart is empty", "info");
      setCurrentScreen("home");
    }
  }, [cart, setCurrentScreen, addNotification, isSubmitting]);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 999 ? 0 : 79;
  const codCharge = paymentMethod === 'cod' ? 49 : 0;
  const discount = 0; // Future: add coupon support if needed
  const total = subtotal + shipping + codCharge - discount;

  const isCodAvailable = subtotal <= 5000;

  // Validation logic
  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (value.length < 2) error = "Name must be at least 2 characters";
        else if (!/^[a-zA-Z\s]+$/.test(value)) error = "Name can only contain letters";
        break;
      case "phone":
        if (value.length !== 10) error = "Enter a valid 10-digit number";
        else if (!/^[6-9]\d{9}$/.test(value)) error = "Enter a valid Indian mobile number";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email address";
        break;
      case "pincode":
        if (value.length !== 6) error = "Enter a valid 6-digit pincode";
        break;
      case "address":
        if (value.length < 10) error = "Enter complete address (min 10 chars)";
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    // Clear error on change if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    // Pincode fetch logic
    if (name === "pincode" && (value as string).length === 6) {
      fetchPincodeData(value as string);
    }
  };

  const fetchPincodeData = async (pin: string) => {
    setIsFetchingPincode(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();
      
      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setFormData(prev => ({
          ...prev,
          city: postOffice.District,
          state: postOffice.State
        }));
        setErrors(prev => ({ ...prev, pincode: "" }));
      } else {
        setErrors(prev => ({ ...prev, pincode: "Invalid pincode" }));
      }
    } catch (err) {
      console.error("Pincode fetch error:", err);
    } finally {
      setIsFetchingPincode(false);
    }
  };

  const isFormValid = useMemo(() => {
    return (
      formData.name.length >= 2 &&
      /^[6-9]\d{9}$/.test(formData.phone) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.pincode.length === 6 &&
      formData.city !== "" &&
      formData.address.length >= 10
    );
  }, [formData]);

  const handleConfirmOrder = async () => {
    if (!isFormValid) {
      addNotification("Please fix errors in the form", "error");
      return;
    }

    setIsSubmitting(true);
      
    // Wait for fake validation/network delay, then switch screen directly
    setTimeout(() => {
      const orderId = `OG-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
      setLastOrderId(orderId);
      setCurrentScreen("orderSuccess");
      setIsSubmitting(false);
    }, 1000);
    return null;
  };

  if (cart.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pt-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT PANEL — Delivery Information */}
        <div className="w-full lg:w-[60%] space-y-8">
          <div className="space-y-4">
            <h2 className="font-bebas text-3xl tracking-widest border-b border-border pb-2">
              DELIVERY INFORMATION
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="font-space text-[10px] tracking-widest text-muted-foreground uppercase">FULL NAME</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={() => validateField("name", formData.name)}
                  placeholder="e.g. Bhavesh Verma"
                  className={`w-full bg-card border ${errors.name ? 'border-destructive' : 'border-border'} px-4 py-3 rounded-none font-space text-sm tracking-wide focus:outline-none focus:border-primary transition-colors`}
                />
                {errors.name && <p className="text-[10px] text-destructive font-space tracking-wider uppercase mt-1">{errors.name}</p>}
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <label className="font-space text-[10px] tracking-widest text-muted-foreground uppercase">MOBILE NUMBER</label>
                <div className="flex">
                  <span className="flex items-center gap-2 bg-muted px-3 border border-r-0 border-border text-[10px] font-space tracking-widest">
                    🇮🇳 +91
                  </span>
                  <input 
                    type="tel"
                    name="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={() => validateField("phone", formData.phone)}
                    placeholder="9876543210"
                    className={`w-full bg-card border ${errors.phone ? 'border-destructive' : 'border-border'} px-4 py-3 rounded-none font-space text-sm tracking-wide focus:outline-none focus:border-primary transition-colors`}
                  />
                </div>
                {errors.phone && <p className="text-[10px] text-destructive font-space tracking-wider uppercase mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="font-space text-[10px] tracking-widest text-muted-foreground uppercase">EMAIL ADDRESS</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => validateField("email", formData.email)}
                  placeholder="you@example.com"
                  className={`w-full bg-card border ${errors.email ? 'border-destructive' : 'border-border'} px-4 py-3 rounded-none font-space text-sm tracking-wide focus:outline-none focus:border-primary transition-colors`}
                />
                {errors.email && <p className="text-[10px] text-destructive font-space tracking-wider uppercase mt-1">{errors.email}</p>}
              </div>

              {/* Pincode */}
              <div className="space-y-2">
                <label className="font-space text-[10px] tracking-widest text-muted-foreground uppercase">PINCODE</label>
                <div className="relative">
                  <input 
                    type="text"
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    onBlur={() => validateField("pincode", formData.pincode)}
                    placeholder="110001"
                    className={`w-full bg-card border ${errors.pincode ? 'border-destructive' : 'border-border'} px-4 py-3 rounded-none font-space text-sm tracking-wide focus:outline-none focus:border-primary transition-colors`}
                  />
                  {isFetchingPincode && <Loader2 className="absolute right-3 top-3.5 w-4 h-4 animate-spin text-primary" />}
                </div>
                {errors.pincode && <p className="text-[10px] text-destructive font-space tracking-wider uppercase mt-1">{errors.pincode}</p>}
              </div>

              {/* City */}
              <div className="space-y-2">
                <label className="font-space text-[10px] tracking-widest text-muted-foreground uppercase">CITY</label>
                <input 
                  type="text"
                  name="city"
                  value={formData.city}
                  readOnly
                  placeholder="Auto-filled"
                  className="w-full bg-muted border border-border px-4 py-3 rounded-none font-space text-sm tracking-wide text-muted-foreground"
                />
              </div>

              {/* State */}
              <div className="space-y-2">
                <label className="font-space text-[10px] tracking-widest text-muted-foreground uppercase">STATE</label>
                <select 
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-card border border-border px-4 py-3 rounded-none font-space text-sm tracking-wide focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div className="md:col-span-2 space-y-2">
                <label className="font-space text-[10px] tracking-widest text-muted-foreground uppercase">ADDRESS LINE 1 (HOUSE/BUILDING/STREET)</label>
                <input 
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={() => validateField("address", formData.address)}
                  placeholder="House No, Building Name, Street"
                  className={`w-full bg-card border ${errors.address ? 'border-destructive' : 'border-border'} px-4 py-3 rounded-none font-space text-sm tracking-wide focus:outline-none focus:border-primary transition-colors`}
                />
                {errors.address && <p className="text-[10px] text-destructive font-space tracking-wider uppercase mt-1">{errors.address}</p>}
              </div>

              {/* Landmark */}
              <div className="md:col-span-2 space-y-2">
                <label className="font-space text-[10px] tracking-widest text-muted-foreground uppercase">LANDMARK (OPTIONAL)</label>
                <input 
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  placeholder="Near metro station, shop etc."
                  className="w-full bg-card border border-border px-4 py-3 rounded-none font-space text-sm tracking-wide focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>



          {/* Note */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="font-space text-[10px] tracking-widest text-muted-foreground uppercase">DELIVERY NOTE (OPTIONAL)</label>
              <span className={`font-space text-[8px] tracking-widest uppercase ${formData.note.length > 200 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {formData.note.length}/200
              </span>
            </div>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              rows={3}
              placeholder="Any special instructions for the rider..."
              className="w-full bg-card border border-border px-4 py-3 rounded-none font-space text-sm tracking-wide focus:outline-none focus:border-primary transition-colors resize-none"
              maxLength={200}
            />
          </div>

          {/* PAYMENT METHOD */}
          <div className="space-y-6">
            <h2 className="font-bebas text-3xl tracking-widest border-b border-border pb-2">
              PAYMENT METHOD
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PAYMENT_METHODS.map((method) => {
                const disabled = method.id === 'cod' && !isCodAvailable;
                const isSelected = paymentMethod === method.id;

                return (
                  <button
                    key={method.id}
                    onClick={() => !disabled && setPaymentMethod(method.id)}
                    className={`
                      flex flex-col items-center justify-center gap-3 p-6 border text-center transition-all duration-200
                      ${isSelected 
                        ? 'border-primary bg-primary/5 shadow-brutal' 
                        : 'border-border bg-card hover:border-border/60'}
                      ${disabled ? 'opacity-40 cursor-not-allowed grayscale' : 'cursor-pointer'}
                    `}
                  >
                    <div className={`${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                      {method.icon}
                    </div>
                    <div>
                      <p className={`font-bebas text-lg tracking-widest ${isSelected ? 'text-primary' : ''}`}>
                        {method.label}
                      </p>
                      <p className="text-[10px] font-space text-muted-foreground uppercase tracking-wider">
                        {method.sublabel}
                      </p>
                    </div>
                    {disabled && (
                      <div className="text-[8px] font-space text-destructive tracking-widest uppercase">
                        NOT AVAILABLE ABOVE ₹5000
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Order Summary */}
        <div className="w-full lg:w-[40%]">
          <div className="sticky top-24 space-y-8 bg-card border border-border p-6 shadow-2xl">
            <div className="flex justify-between items-center sm:block">
              <h2 className="font-bebas text-3xl tracking-widest lg:mb-6">
                ORDER SUMMARY
              </h2>
              {/* Mobile collapse button */}
              <button 
                onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                className="lg:hidden text-primary flex items-center gap-2 font-space text-[10px] tracking-widest uppercase"
              >
                {isSummaryExpanded ? <><ChevronUp size={16} /> Hide Details</> : <><ChevronDown size={16} /> Show {cart.length} Items</>}
              </button>
            </div>

            {/* Cart Items list */}
            <AnimatePresence>
              {(isSummaryExpanded || window.innerWidth >= 1024) && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border lg:!h-auto lg:!opacity-100"
                >
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 group">
                      <div className="relative w-20 aspect-[3/4] bg-muted border border-border">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <p className="font-bebas text-lg tracking-wider text-foreground leading-tight">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground font-space tracking-widest uppercase mt-1">
                            {item.size} · {item.color}
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-border">
                            <button 
                              onClick={() => updateCartQty(item.id, item.size, -1)}
                              className="p-1.5 hover:bg-muted transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs font-space font-bold">{item.qty}</span>
                            <button 
                              onClick={() => updateCartQty(item.id, item.size, 1)}
                              className="p-1.5 hover:bg-muted transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-space text-sm font-bold text-primary">₹{item.price * item.qty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="border-t border-border/50 pt-6 space-y-3">
              <div className="flex justify-between text-[11px] font-space text-muted-foreground tracking-widest uppercase">
                <span>SUBTOTAL</span>
                <span className="text-foreground">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[11px] font-space text-muted-foreground tracking-widest uppercase">
                <span>SHIPPING</span>
                <span className={shipping === 0 ? "text-success" : "text-foreground"}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              {codCharge > 0 && (
                <div className="flex justify-between text-[11px] font-space text-muted-foreground tracking-widest uppercase">
                  <span>COD CHARGE</span>
                  <span className="text-foreground">₹{codCharge}</span>
                </div>
              )}
              <div className="flex justify-between items-end pt-4 border-t border-border">
                <span className="font-bebas text-3xl tracking-widest uppercase text-foreground">TOTAL</span>
                <span className="font-bebas text-4xl tracking-widest text-primary">₹{total}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Button 
                onClick={handleConfirmOrder}
                disabled={isSubmitting || !isFormValid}
                className="w-full rounded-none bg-primary text-primary-foreground font-space font-bold h-16 tracking-[0.3em] shadow-brutal hover:bg-white transition-all text-sm group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="animate-spin" size={18} />
                    PLACING ORDER...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    CONFIRM ORDER
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
              
              {/* Trust Indicators */}
              <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Lock size={12} />
                  <span className="text-[9px] font-space tracking-widest uppercase">Secure</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <RotateCcw size={12} />
                  <span className="text-[9px] font-space tracking-widest uppercase">Returns</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <CheckCircle2 size={12} />
                  <span className="text-[9px] font-space tracking-widest uppercase">Authentic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile confirm bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-30 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[8px] font-space text-muted-foreground tracking-widest uppercase">Payable</span>
          <span className="font-bebas text-2xl tracking-widest text-primary">₹{total}</span>
        </div>
        <Button 
          disabled={isSubmitting || !isFormValid}
          onClick={handleConfirmOrder}
          className="flex-1 rounded-none bg-primary text-primary-foreground font-space font-bold h-12 tracking-[0.2em] shadow-brutal text-xs"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "CONFIRM ORDER"}
        </Button>
      </div>
    </motion.div>
  );
}
