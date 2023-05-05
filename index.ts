import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import surveyRoute from "./routes/api/survey";
import reportRoute from "./routes/api/report";
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;


app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use("/api/survey", surveyRoute);
app.use("/api/report", reportRoute);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// app.listen({ port: port, host: "0.0.0.0" });

