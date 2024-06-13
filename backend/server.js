// We are using the ES6 notation
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandeler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// The frontend is working on the port : 300, so the backend is on the port 5000
const port = process.env.PORT || 5000;

connectDB(); //connect to MongoDB

// We are runnig our express application
const app = express();

// Body parser middleware
// a middleware function that parses incoming requests with JSON payloads and is based on the body-parser library.
app.use(express.json());
// an Express.js application is used to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
// cookie parser : helps us access the cookies in the req 
app.use(cookieParser());
// ###################### Routes ##################################

// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((p) => p._id == req.params.id);
//   res.json(product);
// });

// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandeler);

// ################################################################
app.listen(port, () => console.log(`Server running on port ${port}`));
