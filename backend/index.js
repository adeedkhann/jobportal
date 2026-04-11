import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRouter from "./routes/application.route.js"
import { errorHandler } from "./middlewares/error.middleware.js";
dotenv.config({});


const app = express();


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


const corsOptions = {
    origin: ['https://talentloop-psi.vercel.app'], // Apna frontend URL check karo (Vite ka default yahi hai)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // OPTIONS zaroori hai
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions))

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user" , userRoute)
app.use("/api/v1/company" , companyRoute)
app.use("/api/v1/job" , jobRoute)
app.use("/api/v1/application",applicationRouter)
app.use(errorHandler)
app.listen(PORT , ()=>{
    connectDB();
    console.log(`server running at port ${PORT}`)
})