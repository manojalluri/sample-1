import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, User, Phone, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import FadeIn from '../components/FadeIn';

const Checkout = () => {
    const { cart, placeOrder, clearCart, getProductPrice, user } = useShop();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: '',
        address: '',
        city: 'Hyderabad',
        pincode: ''
    });
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderData, setOrderData] = useState(null);

    // Calculate total with dynamic pricing
    const itemTotal = cart.reduce((sum, item) => {
        const itemPrice = getProductPrice(item.price, item.cut);
        return sum + (itemPrice * item.quantity);
    }, 0);

    const deliveryFee = 40;
    const taxesAndCharges = 25;
    const finalAmount = itemTotal + deliveryFee + taxesAndCharges;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateOrderId = () => {
        const timestamp = Date.now();
        const random = Math.floor(1000 + Math.random() * 9000); // 4 digit random
        return `ORD-${timestamp}-${random}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generate unique order ID
        const orderId = generateOrderId();

        // Prepare order data
        const orderDetails = {
            id: orderId,
            customer: formData,
            items: cart,
            itemTotal,
            deliveryFee,
            taxesAndCharges,
            finalAmount,
            date: new Date().toISOString(),
            status: 'Pending', // Changed from 'Placed' to 'Pending' for admin workflow
            userId: user?.id || null,
            userEmail: user?.email || null
        };

        // Place order (now async with Supabase integration)
        await placeOrder(orderDetails);

        // Store order data for display
        setOrderData(orderDetails);
        setOrderPlaced(true);
    };

    const sendWhatsAppMessage = () => {
        if (!orderData) return;

        // Build items list for WhatsApp message
        const itemsList = orderData.items.map(item =>
            `- ${item.name} (${item.cut}) – ${item.quantity}kg`
        ).join('\n');

        // Create WhatsApp message
        const message = `Hi, I have placed an order on Cutora Fishes.

Order ID: ${orderData.id}
Name: ${orderData.customer.name}
Phone: ${orderData.customer.phone}
Address: ${orderData.customer.address}, ${orderData.customer.city} - ${orderData.customer.pincode}

Items:
${itemsList}

Total Amount: ₹${orderData.finalAmount}
Payment: Cash on Delivery

Please confirm. Thank you.`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // WhatsApp business number (replace with your actual number)
        const whatsappNumber = '919876543210'; // Replace with your WhatsApp business number

        // Create WhatsApp link
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp in new tab
        window.open(whatsappLink, '_blank');
    };

    if (orderPlaced && orderData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <FadeIn className="bg-white p-8 rounded-3xl shadow-lg max-w-lg w-full">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">Order Placed Successfully!</h2>
                        <p className="text-[#60646C] mb-6">
                            Thank you for ordering with Cutora Fishes.
                        </p>
                    </div>

                    {/* Order Details Card */}
                    <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl mb-6">
                        <h3 className="font-bold text-sm text-[#1C1C1C] mb-4 uppercase tracking-wide">Order Details</h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[#60646C]">Order ID:</span>
                                <span className="font-mono font-bold text-[#FC8019]">{orderData.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#60646C]">Customer:</span>
                                <span className="font-semibold text-[#1C1C1C]">{orderData.customer.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#60646C]">Phone:</span>
                                <span className="font-semibold text-[#1C1C1C]">{orderData.customer.phone}</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-[#60646C]">Delivery to:</span>
                                <span className="font-semibold text-[#1C1C1C] text-right max-w-[200px]">
                                    {orderData.customer.address}, {orderData.customer.city} - {orderData.customer.pincode}
                                </span>
                            </div>
                            <div className="pt-3 border-t border-orange-300 flex justify-between">
                                <span className="text-[#60646C] font-semibold">Total Amount:</span>
                                <span className="font-extrabold text-xl text-[#FC8019]">₹{orderData.finalAmount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-gray-50 p-4 rounded-xl mb-6 max-h-48 overflow-y-auto">
                        <h4 className="font-bold text-xs text-[#93959F] uppercase tracking-wider mb-3">Order Items</h4>
                        <div className="space-y-2">
                            {orderData.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span className="text-[#1C1C1C]">
                                        {item.name}
                                        <span className={`ml-2 text-xs ${item.cut === 'Uncut' ? 'text-blue-600' : 'text-green-600'}`}>
                                            ({item.cut})
                                        </span>
                                    </span>
                                    <span className="text-[#60646C]">{item.quantity}kg</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6">
                        <p className="text-sm text-blue-900">
                            <strong>Payment:</strong> Cash on Delivery or UPI upon delivery
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={sendWhatsAppMessage}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg"
                        >
                            <MessageCircle size={20} />
                            Confirm on WhatsApp
                        </button>

                        <button
                            onClick={() => navigate('/orders')}
                            className="w-full px-6 py-3 border-2 border-[#FC8019] text-[#FC8019] rounded-lg hover:bg-orange-50 transition-colors font-semibold"
                        >
                            View My Orders
                        </button>

                        <button
                            onClick={() => navigate('/menu')}
                            className="w-full px-6 py-3 text-[#60646C] hover:text-[#FC8019] transition-colors font-semibold"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </FadeIn>
            </div>
        );
    }

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="min-h-screen bg-[#F0F0F5] py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-8 text-center tracking-tight">Checkout</h1>

                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-card border border-gray-100">
                        <div className="space-y-8">

                            <div className="space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2 text-[#1C1C1C]">
                                    <User size={20} className="text-[#FC8019]" /> Personal Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        required
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className="w-full p-3.5 bg-white rounded-lg border border-gray-200 focus:border-[#FC8019] focus:ring-1 focus:ring-[#FC8019] outline-none transition-all placeholder-gray-400 font-medium"
                                    />
                                    <input
                                        required
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Mobile Number (10 digits)"
                                        pattern="[0-9]{10}"
                                        className="w-full p-3.5 bg-white rounded-lg border border-gray-200 focus:border-[#FC8019] focus:ring-1 focus:ring-[#FC8019] outline-none transition-all placeholder-gray-400 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2 text-[#1C1C1C]">
                                    <MapPin size={20} className="text-[#FC8019]" /> Delivery Address
                                </h3>
                                <textarea
                                    required
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="House No, Street, Landmark"
                                    rows="3"
                                    className="w-full p-3.5 bg-white rounded-lg border border-gray-200 focus:border-[#FC8019] focus:ring-1 focus:ring-[#FC8019] outline-none transition-all placeholder-gray-400 font-medium"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        required
                                        name="city"
                                        onChange={handleChange}
                                        value={formData.city}
                                        placeholder="City"
                                        className="w-full p-3.5 bg-white rounded-lg border border-gray-200 focus:border-[#FC8019] focus:ring-1 focus:ring-[#FC8019] outline-none transition-all placeholder-gray-400 font-medium"
                                    />
                                    <input
                                        required
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        placeholder="Pincode"
                                        pattern="[0-9]{6}"
                                        className="w-full p-3.5 bg-white rounded-lg border border-gray-200 focus:border-[#FC8019] focus:ring-1 focus:ring-[#FC8019] outline-none transition-all placeholder-gray-400 font-medium"
                                    />
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <h4 className="font-bold text-sm text-[#93959F] uppercase tracking-wider mb-3">Order Summary</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[#60646C]">Item Total</span>
                                        <span className="font-semibold text-[#1C1C1C]">₹{itemTotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#60646C]">Delivery Fee</span>
                                        <span className="font-semibold text-[#1C1C1C]">₹{deliveryFee}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#60646C]">Taxes & Charges</span>
                                        <span className="font-semibold text-[#1C1C1C]">₹{taxesAndCharges}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-dashed border-gray-200">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-bold text-lg text-[#1C1C1C]">Total Amount</span>
                                    <span className="font-extrabold text-2xl text-[#FC8019]">₹{finalAmount}</span>
                                </div>

                                <p className="text-sm text-[#60646C] mb-6 bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-start gap-3 font-medium">
                                    <span className="text-xl">⚠️</span>
                                    <span>Payment Mode: <strong>Cash on Delivery</strong> or <strong>UPI</strong> upon delivery. <br /> Please keep exact change if possible.</span>
                                </p>

                                <button type="submit" className="w-full btn-primary py-4 text-lg shadow-lg shadow-orange-500/20">
                                    PLACE ORDER
                                </button>
                            </div>

                        </div>
                    </form>
                </FadeIn>
            </div>
        </div>
    );
};

export default Checkout;
