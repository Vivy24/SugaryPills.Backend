import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import surveyRoute from "./routes/api/survey";
import reportRoute from "./routes/api/report";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use("/api/survey", surveyRoute);
app.use("/api/report", reportRoute);


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
