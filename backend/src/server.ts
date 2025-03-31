import express from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()

//file imports
import authRoutes from "./Routes/authRoutes"
import globalErrHandler from "./middleware/globalErrHandler"
import notfoundHandler from "./middleware/notfoundHandler";


import boardRoutes from "./Routes/boardRoutes";
import listRoute from "./Routes/ListRoutes"
import cardRoute from "./Routes/cardRoute"


const app = express();
const PORT = process.env.PORT || 5000;


//Middlewares
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 





//Routes
//Authentication Routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/boards", boardRoutes);
app.use("/api/v1/lists", listRoute)
app.use("/api/v1/cards", cardRoute)

// Handle unmatched routes (404)
app.all("*", notfoundHandler);
app.use(globalErrHandler);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
