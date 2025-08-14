

import express from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()

//file imports
// import authRoutes from "./routes/authRoutes"
import authRoutes from "./routes/authRoutes.ts";
import notfoundHandler from "./middleware/notfound.ts";
import globalErrorHandler from "./middleware/globalError.ts";


const app = express();
const PORT = 5000;


//Middlewares
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.get("/", (_req, res) => {
    res.status(200).send("Homepage")
})


//Routes
//Authentication Routes
app.use("/api/v1/auth", authRoutes)



// Handle unmatched routes (404)
app.all("*", notfoundHandler);
app.use(globalErrorHandler);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
