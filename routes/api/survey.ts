import express, { Express, Request, Response } from 'express';
import { ReportEntries } from '../../models/type';
import { poolQuery } from "../../database/queries";
import { calculateRisk } from '../../helpers/risk';

const router = express.Router();

// @route POST /api/survey/result
// @desc Create the risk based on the input
// @access public
router.post("/", async (req: Request, res: Response) => {
    try {
        const inputBody: ReportEntries = req.body;
        const ID = await poolQuery.createID(inputBody.identification)
        await poolQuery.createSymptomResult(inputBody.symptoms, ID as number);
        await poolQuery.createLifestyleResult(inputBody.lifestyles, ID as number);
        // TODO: need to calculate the risk result here 
        const surveyResult = calculateRisk(inputBody.lifestyles);
        res.status(200).json(surveyResult);
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json("Server Error");
    }
})


export default router;
