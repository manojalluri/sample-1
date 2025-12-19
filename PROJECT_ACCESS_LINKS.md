# 🔗 PROJECT ACCESS LINKS - CUTORA FISHES

## 🌐 LOCAL DEVELOPMENT SERVER

Your application is currently running at:

### Primary URL:
**http://localhost:5173**

### Network URLs (Access from other devices on same network):
- **Local:** http://localhost:5173
- **Network:** http://192.168.x.x:5173 *(Replace with your local IP - check command: `ipconfig`)*

---

## 📱 CUSTOMER-FACING PAGES

### Main Pages:
- **Home Page:** http://localhost:5173/
- **Product Menu:** http://localhost:5173/menu
- **Shopping Cart:** http://localhost:5173/cart
- **Checkout:** http://localhost:5173/checkout
- **Contact Us:** http://localhost:5173/contact
- **User Login/Signup:** http://localhost:5173/login

### New Pages (Order System):
- **My Orders:** http://localhost:5173/orders ⭐ NEW
  - *Requires user login*
  - *Shows order history*

### Product Details:
- **Product Detail Page:** http://localhost:5173/product/{id}
  - Example: http://localhost:5173/product/1

---

## 👨‍💼 ADMIN PANEL

### Admin Access:
- **Admin Login:** http://localhost:5173/admin/login
  - **Username:** admin@cutora.com
  - **Password:** admin123

### Admin Dashboard Pages:
- **Dashboard:** http://localhost:5173/admin/dashboard
- **Products Management:** http://localhost:5173/admin/products
- **Orders Management:** http://localhost:5173/admin/orders ⭐
- **Customers:** http://localhost:5173/admin/customers
- **Inventory:** http://localhost:5173/admin/inventory
- **Discounts:** http://localhost:5173/admin/discounts
- **Analytics:** http://localhost:5173/admin/analytics
- **Settings:** http://localhost:5173/admin/settings

---

## 🗄️ SUPABASE DATABASE

### Supabase Dashboard:
**https://app.supabase.com**

### Your Project:
1. Login to Supabase
2. Select your project
3. Access various features:
   - **Table Editor:** View/edit database tables
   - **SQL Editor:** Run queries
   - **Authentication:** Manage users
   - **Storage:** File uploads
   - **API:** API documentation

### Quick Links (after login):
- **Orders Table:** `https://app.supabase.com/project/{your-project-id}/editor/{your-table-id}`
- **SQL Editor:** `https://app.supabase.com/project/{your-project-id}/sql`
- **Auth Users:** `https://app.supabase.com/project/{your-project-id}/auth/users`

---

## 📊 PROJECT STRUCTURE

### Root Directory:
```
C:\Users\manoj\Desktop\ecom 2.0\
```

### Key Files:
- **Main App:** `src/App.jsx`
- **Context:** `src/context/ShopContext.jsx`
- **Checkout:** `src/pages/Checkout.jsx`
- **My Orders:** `src/pages/MyOrders.jsx`
- **Database Schema:** `supabase_schema.sql`
- **Environment:** `.env`

### Documentation:
- **Summary:** `SUMMARY.md`
- **Quick Start:** `QUICK_START.md`
- **Full Docs:** `ORDER_SYSTEM_IMPLEMENTATION.md`
- **Flow Diagram:** `FLOW_DIAGRAM.md`
- **Checklist:** `CHECKLIST.md`
- **This File:** `PROJECT_ACCESS_LINKS.md`

---

## 🧪 TEST USER ACCOUNTS

### Create Test Users:
1. Go to: http://localhost:5173/login
2. Click "Create Account"
3. Fill in details and signup

### Test Account Suggestions:
```
Name: Test Customer
Email: test@customer.com
Password: Test123456
Phone: 9876543210
```

---

## 📲 WHATSAPP INTEGRATION

### WhatsApp Web:
**https://web.whatsapp.com**

### WhatsApp API Format:
```
https://wa.me/{phone_number}?text={url_encoded_message}
```

### Your Current Number (TO BE UPDATED):
**919876543210** ← Change this in `src/pages/Checkout.jsx` Line 97

---

## 🚀 QUICK ACCESS COMMANDS

### Start Development Server:
```bash
cd "C:\Users\manoj\Desktop\ecom 2.0"
npm run dev
```

### Build for Production:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

### Install Dependencies:
```bash
npm install
```

---

## 🌍 ACCESS FROM MOBILE/OTHER DEVICES

### Steps:
1. Find your computer's local IP:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (usually 192.168.x.x)

2. Make sure your device is on the same WiFi network

3. Access from mobile/tablet:
   ```
   http://192.168.x.x:5173
   ```
   *(Replace x.x with your actual IP)*

### Example:
If your IP is `192.168.1.100`:
- Mobile URL: `http://192.168.1.100:5173`

---

## 🔐 ENVIRONMENT VARIABLES

### File: `.env`
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**⚠️ Important:** Never commit `.env` to Git!

---

## 📱 MOBILE TESTING WORKFLOW

### Test on Mobile:
1. **Start server:** `npm run dev`
2. **Get your IP:** Run `ipconfig` in terminal
3. **Open on mobile:** `http://YOUR_IP:5173`
4. **Test features:**
   - Browse products
   - Add to cart
   - Checkout
   - WhatsApp redirect
   - Order history

---

## 🎯 COMMON URLS QUICK REFERENCE

| Feature | URL | Auth Required |
|---------|-----|---------------|
| Home | http://localhost:5173/ | No |
| Products | http://localhost:5173/menu | No |
| Cart | http://localhost:5173/cart | No |
| Checkout | http://localhost:5173/checkout | Optional* |
| My Orders | http://localhost:5173/orders | Yes ✅ |
| Login | http://localhost:5173/login | No |
| Admin Dashboard | http://localhost:5173/admin/dashboard | Yes (Admin) |
| Admin Orders | http://localhost:5173/admin/orders | Yes (Admin) |

*Optional = Works better when logged in, but can checkout as guest

---

## 🔧 TROUBLESHOOTING

### Server Not Running?
```bash
cd "C:\Users\manoj\Desktop\ecom 2.0"
npm run dev
```

### Port Already in Use?
The server will auto-select next available port (5174, 5175, etc.)
Check terminal output for actual port.

### Can't Access from Mobile?
1. Check firewall settings
2. Ensure both devices on same network
3. Try using IP address instead of localhost

### Build Errors?
```bash
npm install
npm run dev
```

---

## 📞 DEVELOPER TOOLS

### Browser DevTools:
- **Chrome:** Press `F12` or `Ctrl+Shift+I`
- **Console Tab:** View logs and errors
- **Network Tab:** Monitor API calls
- **Application Tab:** Check localStorage

### React DevTools:
Install browser extension for better React debugging

---

## 🎉 YOUR SERVER IS RUNNING!

**Primary Access:** http://localhost:5173

**Status:** ✅ Active (Running for 2h 43m)

**Process ID:** Check terminal for details

---

## 📝 QUICK TESTING CHECKLIST

### Test These URLs:
- [ ] http://localhost:5173 (Home page loads)
- [ ] http://localhost:5173/menu (Products visible)
- [ ] http://localhost:5173/cart (Cart page works)
- [ ] http://localhost:5173/login (Can login/signup)
- [ ] http://localhost:5173/orders (Shows "My Orders" after login)
- [ ] http://localhost:5173/admin/login (Admin login works)
- [ ] http://localhost:5173/admin/dashboard (Admin panel loads)

---

## 🌟 NEXT STEPS

1. **Open:** http://localhost:5173
2. **Test:** Place a test order
3. **Configure:** WhatsApp number
4. **Deploy:** When ready for production

---

**Last Updated:** December 17, 2025, 21:04 IST
**Server Status:** ✅ Running
**Port:** 5173
**Project:** Cutora Fishes - E-commerce Platform

**Happy Testing! 🚀**
