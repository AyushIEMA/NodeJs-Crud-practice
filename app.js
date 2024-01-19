const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nodejs-crud-app');

// Create a mongoose model
const Item = mongoose.model('Item', { name: String });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res) => {
  const items = await Item.find();
  res.render('index', { items });
});

app.post('/add', async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  await newItem.save();
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render('edit', { item });
});

app.post('/edit/:id', async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, { name: req.body.name });
  res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
