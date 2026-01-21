
import connectDB from "./src/db/index.js";
import dotenv from "dotenv";
import {app} from "./app.js";
dotenv.config({
    path: './.env'
})


connectDB()
.then(() => {
    app.listen(3000, () => {
        console.log(`Server is running at port : 3000`)
    });
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

