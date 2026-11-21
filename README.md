# Athena – Online College Event & Pass Booking System

Athena is a full-stack web application designed to streamline college festival event discovery, pass reservations, and attendee management. Built with Node.js, Express, and vanilla JavaScript, it features online payment integration via Razorpay and an admin dashboard for tracking bookings.

## Features
- **Event Discovery & Details:** Browse college events (Hackathons, EDM Nights, Dance, Comedy, Fashion, and Cloud workshops) with dedicated event pages (`index.html`, `event.html`).
- **Online Pass Booking & Payments:** Seamless pass booking workflow integrated with Razorpay payment processing and instant booking confirmation (`success.html`).
- **Admin Management Dashboard:** Dedicated admin interface (`admin.html`) to view and manage attendee pass records.
- **Lightweight Backend API:** Built on Express (`server.js`) with JSON-based persistent storage (`bookings.json`).

## Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Payments:** Razorpay Payment Gateway
- **Data Storage:** JSON (`bookings.json`)

## Project Structure
```text
college-event-booking/
├── public/
│   ├── images/          # Event banners and promotional assets
│   ├── index.html       # Landing page & event listings
│   ├── event.html       # Event details & pass booking form
│   ├── success.html     # Booking confirmation & pass receipt
│   └── admin.html       # Admin dashboard for managing bookings
├── bookings.json        # Booking records storage
├── package.json         # Project dependencies and scripts
└── server.js            # Express server & Razorpay API endpoints

## How to Run Locally

1. **Clone the repository:**
   git clone [https://github.com/sanskrutibhosale287-lab/Athena-event-booking.git](https://github.com/sanskrutibhosale287-lab/Athena-event-booking.git)
   cd Athena-event-booking

2. **Install dependencies:**
   npm install

3. **Configure environment variables:**
   Create a `.env` file in the project root and add your Razorpay credentials:
   PORT=3000
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret

4. **Start the server:**
   node server.js
   Open `http://localhost:3000` in your browser.
