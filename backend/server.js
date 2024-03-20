// We are using the ES6 notation
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import products from './data/products.js'

// The frontend is working on the port : 300, so the backend is on the port 5000
const port = process.env.PORT || 5000;

connectDB(); //connect to MongoDB

// We are runnig our express application
const app = express();

// ###################### Routes ##################################
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id == req.params.id);
    res.json(product);
})

app.get('/api/products', (req,res) => {
    res.json(products);
})
// ################################################################
app.listen(port, () => console.log(`Server running on port ${port}`));