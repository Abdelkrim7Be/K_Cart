// We are using the ES6 notation
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import {notFound, errorHandeler} from "./middleware/errorMiddleware.js"
import connectDB from './config/db.js'
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"

// The frontend is working on the port : 300, so the backend is on the port 5000
const port = process.env.PORT || 5000;

connectDB(); //connect to MongoDB

// We are runnig our express application
const app = express();

// ###################### Routes ##################################


// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((p) => p._id == req.params.id);
//   res.json(product);
// });

// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandeler);

// ################################################################
app.listen(port, () => console.log(`Server running on port ${port}`));