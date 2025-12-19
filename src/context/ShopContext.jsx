import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/mockData';
import { supabase } from '../lib/supabase';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    // --- STATE ---
    const [products, setProducts] = useState(initialProducts);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    // Default Config
    const defaultConfig = {
        logo: null,
        brandName: "CUTORA FRESH",
        heroImage: "/hero.png",
        heroTitle: "Fresh Meats. Clean Cut. Delivered Daily.",
        heroSubtitle: "Hygienically sourced and processed premium meats & seafood.",
    };

    const [siteConfig, setSiteConfig] = useState(defaultConfig);

    // Store Settings (Cutting & Cleaning Charges from Admin)
    const defaultStoreSettings = {
        cleaningCharge: 10,      // ₹10 per kg
        cleaningEnabled: true,
        cuttingCharge: 15,       // ₹15 per kg
        cuttingEnabled: true
    };

    const [storeSettings, setStoreSettings] = useState(defaultStoreSettings);

    // --- PERSISTENCE ---
    // Load initial state
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cutora-cart');
            if (savedCart) setCart(JSON.parse(savedCart) || []);

            const savedProducts = localStorage.getItem('cutora-products');
            if (savedProducts) setProducts(JSON.parse(savedProducts) || initialProducts);

            const savedConfig = localStorage.getItem('cutora-config');
            if (savedConfig) {
                const parsed = JSON.parse(savedConfig);
                if (parsed && typeof parsed === 'object') {
                    setSiteConfig({ ...defaultConfig, ...parsed });
                }
            }

            const savedOrders = localStorage.getItem('cutora-orders');
            if (savedOrders) setOrders(JSON.parse(savedOrders) || []);

            const savedAdmin = localStorage.getItem('cutora-admin');
            if (savedAdmin) setIsAdmin(JSON.parse(savedAdmin) === true);

        } catch (error) {
            console.error("Error loading local data:", error);
        }
    }, []);

    // Save changes
    useEffect(() => {
        try {
            localStorage.setItem('cutora-cart', JSON.stringify(cart));
        } catch (e) { }
    }, [cart]);

    useEffect(() => {
        try {
            localStorage.setItem('cutora-products', JSON.stringify(products));
        } catch (e) { console.error("Quota exceeded for products", e); }
    }, [products]);

    useEffect(() => {
        try {
            localStorage.setItem('cutora-config', JSON.stringify(siteConfig));
        } catch (e) { console.error("Quota exceeded for config", e); }
    }, [siteConfig]);

    useEffect(() => {
        try {
            localStorage.setItem('cutora-orders', JSON.stringify(orders));
        } catch (e) { }
    }, [orders]);

    useEffect(() => {
        localStorage.setItem('cutora-admin', JSON.stringify(isAdmin));
    }, [isAdmin]);


    // --- ACTIONS ---

    const addToCart = (product, quantity, cut) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id && item.cut === cut);
            if (existing) {
                return prev.map(item =>
                    (item.id === product.id && item.cut === cut)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity, cut }];
        });
    };

    const updateQuantity = (productId, cut, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId, cut);
            return;
        }
        setCart(prev => prev.map(item =>
            (item.id === productId && item.cut === cut) ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeFromCart = (productId, cut) => {
        setCart(prev => prev.filter(item => !(item.id === productId && item.cut === cut)));
    };

    const clearCart = () => setCart([]);

    const placeOrder = async (orderData) => {
        // orderData contains complete order details from checkout
        // including: id, customer, items, itemTotal, deliveryFee, taxesAndCharges, finalAmount, date, status, userId, userEmail

        try {
            // Save to Supabase if user is authenticated
            if (user) {
                const { data, error } = await supabase
                    .from('orders')
                    .insert([{
                        id: orderData.id,
                        user_id: orderData.userId,
                        user_email: orderData.userEmail,
                        date: orderData.date,
                        status: orderData.status,
                        items: orderData.items,
                        customer: orderData.customer,
                        item_total: orderData.itemTotal,
                        delivery_fee: orderData.deliveryFee,
                        taxes_and_charges: orderData.taxesAndCharges,
                        final_amount: orderData.finalAmount
                    }]);

                if (error) {
                    console.error('Error saving order to Supabase:', error);
                    // Continue anyway - we'll still save locally
                }
            }
        } catch (err) {
            console.error('Error in placeOrder:', err);
        }

        // Always save to local storage as backup
        setOrders(prev => [orderData, ...prev]);
        clearCart();
        return orderData.id;
    };

    const addProduct = (product) => {
        setProducts(prev => [{ ...product, id: Date.now() }, ...prev]);
    };

    const updateProduct = (id, updatedProduct) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const updateSiteConfig = (newConfig) => {
        setSiteConfig(prev => ({ ...prev, ...newConfig }));
    };

    const loginAdmin = () => setIsAdmin(true);
    const logoutAdmin = () => setIsAdmin(false);

    // --- SUPABASE USER AUTH WITH ROLE MANAGEMENT ---
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    // Load user orders from Supabase
    const loadUserOrders = async (userId, userEmail) => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .or(`user_id.eq.${userId},user_email.eq.${userEmail}`)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error loading orders from Supabase:', error);
                return;
            }

            if (data && data.length > 0) {
                // Convert Supabase format to app format
                const supabaseOrders = data.map(order => ({
                    id: order.id,
                    userId: order.user_id,
                    userEmail: order.user_email,
                    date: order.date,
                    status: order.status,
                    items: order.items,
                    customer: order.customer,
                    itemTotal: order.item_total,
                    deliveryFee: order.delivery_fee,
                    taxesAndCharges: order.taxes_and_charges,
                    finalAmount: order.final_amount
                }));

                // Merge with local orders (remove duplicates based on order ID)
                setOrders(prev => {
                    const localOrderIds = new Set(prev.map(o => o.id));
                    const newOrders = supabaseOrders.filter(o => !localOrderIds.has(o.id));
                    return [...prev, ...newOrders].sort((a, b) =>
                        new Date(b.date) - new Date(a.date)
                    );
                });
            }
        } catch (err) {
            console.error('Error in loadUserOrders:', err);
        }
    };

    // Check if user has owner role
    const checkUserRole = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error checking user role:', error);
                setIsOwner(false);
                setIsAdmin(false);
                return 'customer';
            }

            const userRole = data?.role || 'customer';
            const ownerStatus = userRole === 'owner';

            setIsOwner(ownerStatus);
            setIsAdmin(ownerStatus); // Only owners are admins

            return userRole;
        } catch (err) {
            console.error('Error in checkUserRole:', err);
            setIsOwner(false);
            setIsAdmin(false);
            return 'customer';
        }
    };

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata?.name || session.user.email.split('@')[0]
                });
                // Check role and load orders
                checkUserRole(session.user.id).then(role => {
                    if (role) {
                        loadUserOrders(session.user.id, session.user.email);
                    }
                });
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata?.name || session.user.email.split('@')[0]
                });
                // Check role and load orders
                checkUserRole(session.user.id).then(role => {
                    if (role) {
                        loadUserOrders(session.user.id, session.user.email);
                    }
                });
            } else {
                setUser(null);
                setIsOwner(false);
                setIsAdmin(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const loginUser = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            return { success: false, message: error.message };
        }
        return { success: true };
    };

    const registerUser = async (name, email, password) => {
        // 1. Sign Up in Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name: name }
            }
        });

        if (error) {
            return { success: false, message: error.message };
        }

        // 2. Profile creation is now handled by a Database Trigger on auth.users
        // This ensures the profile is created even if email verification is pending.

        // Check if email confirmation is required (session might be null even if no error)
        if (data.user && !data.session) {
            return { success: true, message: "Account created! Please check your email to confirm." };
        }

        return { success: true };
    };

    const logoutUser = async () => {
        await supabase.auth.signOut();
        // Clear session-based checkout data (cart)
        clearCart();
        // Do NOT clear order history - it's persisted across sessions
    };

    // Helper function to get product price based on preparation type
    const getProductPrice = (basePrice, preparationType) => {
        if (preparationType === 'Uncut') {
            return basePrice;
        }
        // Cut & Clean includes cutting and cleaning charges
        let totalCharge = basePrice;
        if (storeSettings.cuttingEnabled) {
            totalCharge += storeSettings.cuttingCharge;
        }
        if (storeSettings.cleaningEnabled) {
            totalCharge += storeSettings.cleaningCharge;
        }
        return totalCharge;
    };

    // Update order status (Admin feature)
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            // Update in Supabase if user is authenticated
            if (user) {
                const { error } = await supabase
                    .from('orders')
                    .update({ status: newStatus, updated_at: new Date().toISOString() })
                    .eq('id', orderId);

                if (error) {
                    console.error('Error updating order status in Supabase:', error);
                    // Continue anyway - we'll still update locally
                }
            }
        } catch (err) {
            console.error('Error in updateOrderStatus:', err);
        }

        // Always update local storage
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    return (
        <ShopContext.Provider value={{
            products,
            cart,
            orders,
            isAdmin,
            isOwner,
            siteConfig,
            storeSettings,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            placeOrder,
            addProduct,
            updateProduct,
            deleteProduct,
            updateSiteConfig,
            loginAdmin,
            logoutAdmin,
            user,
            loginUser,
            registerUser,
            logoutUser,
            getProductPrice,
            updateOrderStatus
        }}>
            {children}
        </ShopContext.Provider>
    );
};
