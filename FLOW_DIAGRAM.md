# 🔄 ORDER SYSTEM FLOW DIAGRAM

## COMPLETE ORDER JOURNEY

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CUSTOMER JOURNEY                                 │
└─────────────────────────────────────────────────────────────────────────┘

1. BROWSE PRODUCTS (/menu)
   │
   ├─ View all available products
   ├─ See prices, images, descriptions
   └─ Check stock availability
   │
   ▼

2. ADD TO CART
   │
   ├─ Select product
   ├─ Choose preparation: "Uncut" OR "Cut & Clean"
   │  └─ Uncut: Base price only
   │  └─ Cut & Clean: Base price + ₹15 cutting + ₹10 cleaning per kg
   ├─ Choose quantity (kg)
   └─ Item added to cart
   │
   ▼

3. REVIEW CART (/cart)
   │
   ├─ View all cart items
   ├─ Modify quantities
   ├─ Remove items
   ├─ See subtotal
   └─ Click "Proceed to Checkout"
   │
   ▼

4. CHECKOUT PAGE (/checkout)
   │
   ├─ Fill Customer Details:
   │  ├─ Full Name (auto-filled if logged in)
   │  ├─ Phone Number (10 digits)
   │  └─ Delivery Address (House, Street, City, Pincode)
   │
   ├─ Review Order Summary:
   │  ├─ Item Total: ₹XXX
   │  ├─ Delivery Fee: ₹40
   │  ├─ Taxes & Charges: ₹25
   │  └─ FINAL AMOUNT: ₹XXX
   │
   └─ Click "PLACE ORDER"
   │
   ▼

5. ORDER PROCESSING (Backend)
   │
   ├─ Generate Unique Order ID
   │  └─ Format: ORD-{timestamp}-{random4digits}
   │  └─ Example: ORD-1765983827476-4821
   │
   ├─ Calculate Final Amount
   │  └─ Items + Delivery + Taxes
   │
   ├─ Create Order Object:
   │  {
   │    id: "ORD-1765983827476-4821",
   │    userId: "user-uuid",
   │    userEmail: "customer@email.com",
   │    customer: { name, phone, address, city, pincode },
   │    items: [...cart items with preparation],
   │    itemTotal: XXX,
   │    deliveryFee: 40,
   │    taxesAndCharges: 25,
   │    finalAmount: XXX,
   │    date: "2025-12-17T20:55:48.000Z",
   │    status: "Placed"
   │  }
   │
   ├─ Save to Supabase Database ✅
   │  └─ If user is authenticated
   │  └─ With RLS policies
   │
   ├─ Save to Local Storage ✅
   │  └─ As backup
   │  └─ For offline access
   │
   └─ Clear Cart
   │
   ▼

6. ORDER CONFIRMATION SCREEN
   │
   ├─ Display Success Message ✅
   │
   ├─ Show Order Details:
   │  ├─ Order ID (unique)
   │  ├─ Customer Name
   │  ├─ Phone Number
   │  ├─ Delivery Address
   │  ├─ Order Items (with preparation type)
   │  └─ Final Amount
   │
   ├─ Action Buttons:
   │  ├─ [Confirm on WhatsApp] ──┐
   │  ├─ [View My Orders]         │
   │  └─ [Continue Shopping]      │
   │                              ▼
   │
   ▼                    7. WHATSAPP INTEGRATION
                        │
8. MY ORDERS PAGE       ├─ Build WhatsApp Message:
   (/orders)            │  "Hi, I have placed an order on Cutora Fishes.
   │                    │   
   ├─ User Login        │   Order ID: ORD-1765983827476-4821
   │  Required          │   Name: John Doe
   │                    │   Phone: 9876543210
   ├─ Filter Orders     │   Address: House 123, Main St, Hyderabad - 500001
   │  by User ID/Email  │
   │                    │   Items:
   ├─ CURRENT ORDERS    │   - Prawns (Cut & Clean) – 2kg
   │  ├─ Placed         │   - Pomfret (Uncut) – 1kg
   │  ├─ Pending        │
   │  ├─ Processing     │   Total Amount: ₹1250
   │  └─ Shipped        │   Payment: Cash on Delivery
   │                    │
   └─ PAST ORDERS       │   Please confirm. Thank you."
      ├─ Delivered      │
      └─ Cancelled      ├─ URL Encode Message
                        ├─ Create wa.me link
                        └─ Open in New Tab ✅
                        │
                        ▼

                    9. BUSINESS RECEIVES ORDER
                        │
                        ├─ WhatsApp notification
                        ├─ Review order details
                        ├─ Process order
                        └─ Update status in admin panel
```

---

## DATA FLOW ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATA PERSISTENCE                                 │
└─────────────────────────────────────────────────────────────────────────┘

USER ACTION                 FRONTEND                    BACKEND
───────────                ─────────                   ─────────

Browse Products        →   ShopContext              →  Local State
                          (products array)             + localStorage

Add to Cart           →   ShopContext              →  localStorage
                          (cart array)                 'cutora-cart'

Place Order           →   ShopContext              →  Supabase DB
                          (placeOrder fn)          →  + localStorage
                          │                            'cutora-orders'
                          ├─ Save to Supabase ✅
                          └─ Save to Local Storage ✅

View Orders           →   MyOrders Component       →  Supabase DB
                          (filter by userId)       ←  + Local Storage
                          │                            (merged, dedupe)
                          └─ Load from both sources

Logout                →   ShopContext              →  Clear cart only
                          (logoutUser fn)              Keep orders ✅
                          └─ Supabase signOut

Login                 →   ShopContext              →  Supabase DB
                          (auth listener)          ←  Fetch user orders
                          └─ Load user orders ✅
```

---

## DATABASE STRUCTURE

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      SUPABASE TABLES                                     │
└─────────────────────────────────────────────────────────────────────────┘

PROFILES
├─ id (uuid, PK, FK → auth.users)
├─ email (text)
├─ name (text)
├─ role (text, default: 'customer')
└─ created_at (timestamp)

PRODUCTS
├─ id (bigint, PK, auto-increment)
├─ name (text)
├─ category (text)
├─ price (numeric)
├─ image (text)
├─ description (text)
├─ cuts (text array)
├─ stock (boolean)
├─ rating (numeric)
└─ created_at (timestamp)

ORDERS ⭐ NEW/ENHANCED
├─ id (text, PK) ─────────────────────── "ORD-1765983827476-4821"
├─ user_id (uuid, FK → auth.users) ───── Linked to user
├─ user_email (text) ─────────────────── Backup identifier
├─ date (timestamp) ──────────────────── Order placement time
├─ status (text) ─────────────────────── "Placed" / "Processing" / etc.
├─ items (jsonb) ─────────────────────── [{product, qty, cut, price}]
├─ customer (jsonb) ──────────────────── {name, phone, address, city, pin}
├─ item_total (numeric) ──────────────── Subtotal
├─ delivery_fee (numeric) ────────────── ₹40
├─ taxes_and_charges (numeric) ───────── ₹25
├─ final_amount (numeric) ────────────── Total payable
├─ created_at (timestamp)
└─ updated_at (timestamp)
```

---

## SECURITY & PERMISSIONS

```
┌─────────────────────────────────────────────────────────────────────────┐
│                  ROW LEVEL SECURITY (RLS)                                │
└─────────────────────────────────────────────────────────────────────────┘

PROFILES
├─ SELECT: Everyone can view ✅
├─ INSERT: User can create own profile ✅
└─ UPDATE: User can update own profile ✅

PRODUCTS
└─ SELECT: Everyone can view ✅

ORDERS
├─ INSERT: Only authenticated users ✅
├─ SELECT (User): Can view own orders only ✅
│  └─ WHERE user_id = auth.uid() OR user_email = auth.email()
└─ SELECT (Admin): Can view all orders ✅
   └─ WHERE role = 'admin'
```

---

## STATE MANAGEMENT

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    SHOPCONTEXT (React Context)                           │
└─────────────────────────────────────────────────────────────────────────┘

STATE:
├─ products []          ← Product catalog
├─ cart []             ← Shopping cart items
├─ orders []           ← User's order history
├─ user {}             ← Current authenticated user
├─ isAdmin (bool)      ← Admin status
├─ siteConfig {}       ← Branding config
└─ storeSettings {}    ← Cutting/cleaning charges

FUNCTIONS:
├─ addToCart()         ← Add item with preparation type
├─ updateQuantity()    ← Modify cart item qty
├─ removeFromCart()    ← Delete cart item
├─ clearCart()         ← Empty cart (on order/logout)
├─ placeOrder() ⭐     ← Save to Supabase + localStorage
├─ loadUserOrders() ⭐ ← Fetch from Supabase on login
├─ loginUser()         ← Supabase auth login
├─ registerUser()      ← Supabase auth signup
├─ logoutUser() ⭐     ← Clear cart, keep orders
└─ getProductPrice()   ← Calculate with charges
```

---

## ROUTING STRUCTURE

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        APPLICATION ROUTES                                │
└─────────────────────────────────────────────────────────────────────────┘

PUBLIC ROUTES:
├─ /                  → Home
├─ /menu              → Product catalog
├─ /product/:id       → Product details
├─ /cart              → Shopping cart
├─ /checkout          → Checkout form
├─ /orders ⭐          → My Orders (NEW)
├─ /contact           → Contact page
└─ /login             → User login/signup

ADMIN ROUTES:
├─ /admin/login       → Admin login
├─ /admin/dashboard   → Admin dashboard
├─ /admin/products    → Product management
├─ /admin/orders      → All orders view
├─ /admin/customers   → Customer list
├─ /admin/inventory   → Stock management
├─ /admin/discounts   → Discount management
├─ /admin/analytics   → Analytics dashboard
└─ /admin/settings    → Store settings
```

---

## NAVIGATION STRUCTURE

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           NAVBAR                                         │
└─────────────────────────────────────────────────────────────────────────┘

DESKTOP:
┌────────────────────────────────────────────────────────────────────────┐
│ [LOGO] CUTORA FRESH    HOME  FRESH CUTS  MY ORDERS*  CONTACT  [Cart] [User] │
└────────────────────────────────────────────────────────────────────────┘
                                      ▲
                                      └─ * Only visible when logged in

MOBILE:
┌────────────────────────────────────────────────────────────────────────┐
│ [LOGO] CUTORA FRESH                                    [Cart] [☰ Menu] │
└────────────────────────────────────────────────────────────────────────┘
└─ Menu Opens:
   ├─ Welcome, {User Name}
   ├─ HOME
   ├─ FRESH CUTS
   ├─ MY ORDERS*        ← * Only if logged in
   ├─ CONTACT US
   ├─────────────
   ├─ LOGOUT / SIGN IN
   └─ Partner Login
```

---

**This diagram shows the complete flow from browsing to order confirmation!**
**All components work together seamlessly. 🎉**
