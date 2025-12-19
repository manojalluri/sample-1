# 🚀 QUICK SECURITY SETUP GUIDE

## ⚡ 3-MINUTE SETUP

### Step 1: Deploy Database Schema (1 min)
1. Open Supabase Dashboard: https://app.supabase.com
2. Click your project
3. Go to **SQL Editor** (left sidebar)
4. Click "New Query"
5. Open `supabase_schema.sql` from your project folder
6. Copy ALL the content
7. Paste into Supabase SQL Editor
8. Click **RUN** (bottom right)
9. Wait for "Success" message ✅

### Step 2: Create Owner Account (1 min)
1. Open your app: http://localhost:5173
2. Click **"Sign In"** or go to: http://localhost:5173/login
3. Click **"Create Account"**
4. Fill in:
   - **Name:** Your full name
   - **Email:** Your email (remember this!)
   - **Password:** Strong password (remember this!)
5. Click **"Create Account"**
6. You're now registered as a customer

### Step 3: Promote to Owner (1 min)
1. Back to Supabase Dashboard
2. Go to **SQL Editor**
3. Run this command (replace with YOUR email):

```sql
UPDATE profiles 
SET role = 'owner' 
WHERE email = 'your-actual-email@example.com';
```

4. Verify it worked:

```sql
SELECT id, email, name, role FROM profiles WHERE role = 'owner';
```

You should see your account with `role = 'owner'` ✅

---

## 🧪 TEST YOUR SETUP

### Test 1: Owner Login ✅
1. Go to: http://localhost:5173/admin/login
2. Enter your owner email and password
3. Click "SIGN IN"
4. Should redirect to admin dashboard ✅

### Test 2: Customer Can't Access ❌
1. Create another account (different email)
2. Try to access: http://localhost:5173/admin/dashboard
3. Should see "Unauthorized Access" message ✅

---

## ✅ VERIFICATION

| Check | Expected Result |
|-------|----------------|
| Owner can login to admin | ✅ Success |
| Owner sees admin dashboard | ✅ Success |
| Customer tries admin access | ❌ Blocked (Unauthorized) |
| Customer can browse products | ✅ Success |
| Customer can place orders | ✅ Success |
| Owner sees all orders | ✅ Success |

---

## 🔑 SAVE YOUR CREDENTIALS

```
OWNER ACCOUNT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email:    _______________________
Password: _______________________
Role:     owner
Access:   Full admin dashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ KEEP THIS SECURE!
```

---

## 🚨 TROUBLESHOOTING

### "Invalid email or password"
➜ Double-check email and password
➜ Try password reset in Supabase

### "Unauthorized Access" as owner
➜ Verify role in database:
```sql
SELECT * FROM profiles WHERE email = 'your-email';
```
➜ Should show `role = 'owner'`

### Database error
➜ Make sure you ran the full schema
➜ Check for any red errors in SQL Editor

---

## 📞 QUICK LINKS

- **Admin Login:** http://localhost:5173/admin/login
- **Customer Signup:** http://localhost:5173/login
- **Supabase Dashboard:** https://app.supabase.com
- **Full Security Guide:** `SECURITY_SETUP.md`

---

**Setup Time:** ~3 minutes
**Security Level:** Production-Ready
**Status:** ✅ Complete

**You're all set! Your admin panel is now secured! 🎉**
