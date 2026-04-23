const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ ONLY ONE PRODUCTS ARRAY
let products = [
  {
    id: 1,
    name: "Apples",
    price: 120,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
  },
  {
    id: 2,
    name: "Milk",
    price: 60,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
  },
  {
    id: 3,
    name: "Bread",
    price: 40,
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
  }
];

let cart = [];

// PRODUCTS
app.get('/products', (req, res) => {
  res.json(products);
});

// CART
app.post('/cart', (req, res) => {
  const { productId } = req.body;

  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: "Not found" });

  cart.push(product);

  res.json({
    message: "Added",
    total: cart.reduce((sum, i) => sum + i.price, 0)
  });
});

app.get('/cart', (req, res) => {
  res.json({
    items: cart,
    total: cart.reduce((sum, i) => sum + i.price, 0)
  });
});

// SEARCH
app.get('/search', (req, res) => {
  const q = req.query.q.toLowerCase();
  const result = products.filter(p =>
    p.name.toLowerCase().includes(q)
  );
  res.json(result);
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
