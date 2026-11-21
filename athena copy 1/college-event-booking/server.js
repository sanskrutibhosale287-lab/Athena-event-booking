require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); 

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

console.log("My Key ID is:", process.env.RAZORPAY_KEY_ID);

// API for Admin Dashboard to fetch records
app.get('/api/bookings', (req, res) => {
    fs.readFile(path.join(__dirname, 'bookings.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Failed to read data" });
        res.json(JSON.parse(data || '[]'));
    });
});

// Route to create a Razorpay order
app.post('/create-order', async (req, res) => {
    try {
        const { passes } = req.body;
        const amount = passes * 500 * 100; // ₹500 per pass in paise
        
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'receipt_' + Math.random().toString(36).substring(7)
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Route to verify payment and save student data
app.post('/verify-payment', (req, res) => {
    const { 
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature,
        studentDetails
    } = req.body;
    
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
                            .update(sign.toString())
                            .digest('hex');

    if (razorpay_signature === expectedSign) {
        const filePath = path.join(__dirname, 'bookings.json');
        
        fs.readFile(filePath, 'utf8', (err, data) => {
            let bookings = [];
            if (!err && data) {
                try { bookings = JSON.parse(data); } catch(e) { bookings = []; }
            }
            
            const newRecord = {
                id: razorpay_payment_id,
                date: new Date().toLocaleString(),
                ...studentDetails
            };
            
            bookings.push(newRecord);
            
            fs.writeFile(filePath, JSON.stringify(bookings, null, 2), (err) => {
                if (err) console.error("Failed to save booking:", err);
            });
        });

        res.json({ success: true, message: "Payment verified successfully" });
    } else {
        res.status(400).json({ success: false, message: "Invalid signature" });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));