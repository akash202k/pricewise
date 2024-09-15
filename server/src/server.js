import express from "express";
import dotenv from "dotenv";
import amazonScraper from "./routes/index.js"

dotenv.config();
// console.log(process.env);

const PORT = 3000;
const app = express();
app.use(express.json());

app.use('/amazon', amazonScraper);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})