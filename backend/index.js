const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 60000 },
  { id: 2, name: 'Shoes', category: 'Clothing', price: 3000 },
  { id: 3, name: 'Book', category: 'Education', price: 500 },
  { id: 4, name: 'Mobile', category: 'Electronics', price: 25000 },
];

const users = [
  { id: 1, email: 'user1@example.com', password: 'password1', firstTime: true },
  { id: 2, email: 'user2@example.com', password: 'password2', firstTime: false }
];

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/cart/discount', (req, res) => {
  const { cartItems, isFirstTimeUser, couponCode, selectedDiscount } = req.body;

  let total = 0;
  let discount = 0;
  const itemMap = {};
  const totalPerCategory = {};

  cartItems.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    if (!itemMap[item.name]) itemMap[item.name] = 0;
    itemMap[item.name] += item.quantity;

    if (!totalPerCategory[item.category]) totalPerCategory[item.category] = 0;
    totalPerCategory[item.category] += subtotal;
  });

  if (selectedDiscount === 'flat' && total > 500) discount = 50;
  if (selectedDiscount === 'percentage' && totalPerCategory['Electronics']) {
    discount = totalPerCategory['Electronics'] * 0.1;
  }
  if (selectedDiscount === 'bogo') {
    // Apply 'buy 3 get one free' to any product
    Object.keys(itemMap).forEach(itemName => {
      if (itemMap[itemName] >= 3) {
        const product = products.find(p => p.name === itemName);
        if (product) {
          const freeItems = Math.floor(itemMap[itemName] / 3);
          discount += freeItems * product.price;
        }
      }
    });
  }
  if (selectedDiscount === 'firsttime' && isFirstTimeUser) {
    discount = 200;
  }
  if (selectedDiscount === 'best') {
    const allDiscounts = [];

    if (total > 500) allDiscounts.push(50);
    if (totalPerCategory['Electronics']) allDiscounts.push(totalPerCategory['Electronics'] * 0.1);
    // Calculate 'buy 3 get one free' discount for best option
    let bogoDiscount = 0;
    Object.keys(itemMap).forEach(itemName => {
      if (itemMap[itemName] >= 3) {
        const product = products.find(p => p.name === itemName);
        if (product) {
          const freeItems = Math.floor(itemMap[itemName] / 3);
          bogoDiscount += freeItems * product.price;
        }
      }
    });
    if (bogoDiscount > 0) allDiscounts.push(bogoDiscount);
    if (isFirstTimeUser) allDiscounts.push(200);

    discount = Math.max(...allDiscounts, 0);
  }

  // Coupon bonus
  if (couponCode === 'WELCOME50') discount += 50;

  res.json({
    totalBeforeDiscount: total,
    discount,
    totalAfterDiscount: total - discount
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
