import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import FadeIn from '../components/FadeIn';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, addToCart, storeSettings, getProductPrice } = useShop();
    const product = products.find(p => p.id === parseInt(id));

    const [selectedCut, setSelectedCut] = useState(product ? product.cuts[0] : '');
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <div className="min-h-screen grid place-items-center">Product not found</div>;
    }

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedCut);
        // Maybe show toast here
    };

    // Calculate price based on selected preparation type
    const currentPrice = getProductPrice(product.price, selectedCut);

    // Calculate breakdown for Cut & Clean
    const getPriceBreakdown = (preparationType) => {
        const basePrice = product.price;
        if (preparationType === 'Uncut') {
            return {
                total: basePrice,
                breakdown: null
            };
        }
        // Cut & Clean
        let breakdown = [];
        let total = basePrice;

        breakdown.push({ label: 'Base Price', amount: basePrice });

        if (storeSettings.cuttingEnabled && storeSettings.cuttingCharge > 0) {
            breakdown.push({ label: 'Cutting Charge', amount: storeSettings.cuttingCharge });
            total += storeSettings.cuttingCharge;
        }

        if (storeSettings.cleaningEnabled && storeSettings.cleaningCharge > 0) {
            breakdown.push({ label: 'Cleaning Charge', amount: storeSettings.cleaningCharge });
            total += storeSettings.cleaningCharge;
        }

        return { total, breakdown };
    };

    const priceInfo = getPriceBreakdown(selectedCut);

    return (
        <div className="min-h-screen bg-[#F0F0F5] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-[#93959F] hover:text-[#FC8019] mb-6 transition-colors font-bold uppercase text-xs tracking-wider"
                >
                    <ArrowLeft size={16} className="mr-2" /> Back to Menu
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Side */}
                    <FadeIn className="bg-white rounded-3xl p-8 flex items-center justify-center border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-radial-gradient from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full max-h-[500px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 relative z-10"
                        />
                    </FadeIn>

                    {/* Info Side */}
                    <FadeIn delay={0.2} className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-[#2ECC71]/10 text-[#2ECC71] text-xs font-extrabold uppercase rounded-md tracking-wider border border-[#2ECC71]/20">
                                    {product.category}
                                </span>
                                <span className="flex items-center text-yellow-500 text-sm font-bold">
                                    <Star size={16} className="fill-current mr-1" /> {product.rating} (120+ reviews)
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C1C1C] mb-4 tracking-tight">{product.name}</h1>
                            <p className="text-[#60646C] leading-relaxed text-lg">{product.description}</p>
                        </div>

                        {/* PREPARATION TYPE SELECTION */}
                        <div className="space-y-4">
                            <label className="text-xs font-extrabold text-[#93959F] uppercase tracking-widest">PREPARATION TYPE</label>
                            <div className="grid grid-cols-2 gap-4">
                                {product.cuts.map(cut => {
                                    const cutPrice = getProductPrice(product.price, cut);
                                    const isSelected = selectedCut === cut;

                                    return (
                                        <button
                                            key={cut}
                                            onClick={() => setSelectedCut(cut)}
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${isSelected
                                                    ? 'border-[#FC8019] bg-[#FC8019]/5 shadow-md ring-2 ring-[#FC8019]/20'
                                                    : 'border-gray-200 bg-white hover:border-gray-400'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-sm font-bold ${isSelected ? 'text-[#FC8019]' : 'text-[#1C1C1C]'}`}>
                                                    {cut}
                                                </span>
                                                {isSelected && (
                                                    <div className="w-5 h-5 rounded-full bg-[#FC8019] flex items-center justify-center">
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className={`text-2xl font-extrabold ${isSelected ? 'text-[#FC8019]' : 'text-[#1C1C1C]'}`}>
                                                ₹{cutPrice}
                                                <span className="text-xs text-[#93959F] font-medium ml-1">/kg</span>
                                            </div>
                                            {cut === 'Cut & Clean' && priceInfo.breakdown && (
                                                <div className="mt-2 pt-2 border-t border-gray-200">
                                                    {priceInfo.breakdown.map((item, idx) => (
                                                        <div key={idx} className="flex justify-between text-xs text-[#60646C] mt-1">
                                                            <span>{item.label}</span>
                                                            <span>₹{item.amount}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Price Display */}
                        <div className="flex items-center gap-4 py-6 border-y border-dashed border-gray-200">
                            <span className="text-4xl font-extrabold text-[#1C1C1C]">₹{currentPrice}</span>
                            <span className="text-[#93959F] text-base font-medium">/ per kg</span>
                            {selectedCut === 'Cut & Clean' && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                    Includes cutting & cleaning
                                </span>
                            )}
                        </div>

                        {/* Add to Cart Actions */}
                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex items-center border border-[#FC8019] rounded-lg overflow-hidden bg-white shadow-sm h-12">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-4 h-full hover:bg-orange-50 text-[#60646C] font-bold text-lg"
                                >
                                    -
                                </button>
                                <span className="px-4 font-extrabold text-[#FC8019] min-w-[3rem] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="px-4 h-full hover:bg-orange-50 text-[#FC8019] font-bold text-lg"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.stock}
                                className="flex-1 btn-primary h-12 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30"
                            >
                                {product.stock ? (
                                    <>
                                        <ShoppingBag size={20} /> ADD ITEM
                                    </>
                                ) : 'OUT OF STOCK'}
                            </button>
                        </div>

                        {/* Cart Total Preview */}
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl p-4 border border-orange-200">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-[#1C1C1C]">Subtotal ({quantity} kg)</span>
                                <span className="text-2xl font-extrabold text-[#FC8019]">₹{currentPrice * quantity}</span>
                            </div>
                            <div className="text-xs text-[#60646C] mt-1">
                                {selectedCut === 'Uncut' ? 'Base price' : 'With cutting & cleaning charges'}
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="grid grid-cols-2 gap-4 pt-6">
                            <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
                                <Truck className="text-[#1C1C1C] shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-sm text-[#1C1C1C]">Fast Delivery</h4>
                                    <p className="text-xs text-[#93959F] mt-1">Delivery in 90 mins</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
                                <ShieldCheck className="text-[#2ECC71] shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-sm text-[#1C1C1C]">Antibiotic Free</h4>
                                    <p className="text-xs text-[#93959F] mt-1">100% safe & natural</p>
                                </div>
                            </div>
                        </div>

                    </FadeIn>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
