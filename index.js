const {categories, category, products} = require('./routes/products');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

app.use(express.json());
app.use(cors());

app.use('/products/categories', categories);
app.use('/products/category', category);
app.use('/products', products);

// MongoDB connection setup
mongoose.connect('mongodb+srv://pradeeprajarm:Pradeep2310@cluster0.wqyvs7j.mongodb.net/se')
.then(()=> console.log("db connected"))
.catch((err)=>{
    console.log(err);
})

// Define a MongoDB schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Define a route to save user data
app.post('/api/users', async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, email, phone, address } = req.body;

    // Create a new user document and save it to the database
    const user = new User({ name, email, phone, address });
    await user.save();
    console.log(user)

    // Respond with a success message
    res.status(201).json({ message: 'User data saved successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving user data' });
  }
});

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}...`));
