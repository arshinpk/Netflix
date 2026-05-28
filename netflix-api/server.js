require("dotenv").config(); //MONGODB_URI, JWT_SECRET in .env
const express = require("express"); // HTTP API
const cors = require("cors"); // Allow requests from localhost:5173 and your GitHub Pages URL
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res)=>{
    res.send("server running");
}); 
app.listen(3000, () => {
    console.log("Server started on port 3000");
});