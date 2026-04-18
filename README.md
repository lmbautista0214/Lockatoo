# 🚀 Lockatoo – Smart Locker Booking System

Lockatoo is a full-stack web application that allows users to find, book, and manage smart lockers across multiple locations. It also provides an admin dashboard for managing lockers, locations, pricing, and bookings.

---

## 🧩 Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- React Router
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Resend (Email)
- PayPal (Payments)

---

## ✨ Features

### 👤 User

- Register & Login
- Find nearby locker locations (Map-based)
- Book lockers by size and time
- View and manage bookings
- Payment integration (PayPal)
- Password reset via email

### 🛠️ Admin

- Manage locations
- Add & manage lockers (XS–XXL)
- Set pricing per location & size
- View bookings and stats dashboard
- Monitor locker availability

---

## 📁 Project Structure

```
backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── configs/

frontend/
├── src/
├── api/
├── components/
├── pages/
├── admin/
├── user/
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
RESEND_API_KEY=your_resend_key
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_secret
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000
VITE_PAYPAL_CLIENT_ID=your_client_id
```

---

## ▶️ Run Locally

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

- Backend → Render
- Frontend → Render

---

## 📌 Notes

- Do NOT expose secrets in frontend
- Use environment variables in production
- Backend must be deployed before frontend

---

## 👨‍💻 Author

Built by Lloyd Michael Bautista 🚀
