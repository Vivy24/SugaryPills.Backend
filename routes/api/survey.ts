import express, { Express, Request, Response } from 'express';
import { LifeStyleResult, ReportEntries, SymptomResult } from '../../models/type';
import { poolQuery } from "../../database/queries";
import { calculateRisk } from '../../helpers/risk';

const router = express.Router();

// @route POST /api/survey/result
// @desc Create the risk based on the input
// @access public
router.post("/", async (req: Request, res: Response) => {
    try {
        const ID = await poolQuery.createID(req.body.identification)

        // format symptom 
        const formattedSymtom: SymptomResult = {
            urination: req.body.symptoms.urination ? true : false,
            thirst: req.body.symptoms.thirst ? true : false,
            hunger: req.body.symptoms.hunger ? true : false,
            fatigue: req.body.symptoms.fatigue ? true : false,
            blurredVision: req.body.symptoms.blurredVision ? true : false,
            weakHealing: req.body.symptoms.weakHealing ? true : false,
            tingling: req.body.symptoms.tingling ? true : false,
            dryIthcySkin: req.body.symptoms.dryIthcySkin ? true : false,
            weightChange: req.body.symptoms.weightChange ? true : false,
            moodChange: req.body.symptoms.moodChange ? true : false
        }


        await poolQuery.createSymptomResult(formattedSymtom, ID as number);

        //format lifestyle 
        let question1Str = "";
        if (req.body.lifestyle.question1.bread) {
            question1Str += 'bread,'
        }
        if (req.body.lifestyle.question1.sugar) {
            question1Str += 'sugar,'
        }
        if (req.body.lifestyle.question1.salt) {
            question1Str += 'salt,'
        }
        if (req.body.lifestyle.question1.flour) {
            question1Str += 'flour,'
        }




        let question2Str = "";
        switch (req.body.lifestyle.question2) {
            case 'once':
                question2Str = 'once a week';
                break;
            case 'sometimes':
                question2Str = '2-5 times a week';
                break;
            case 'everyday':
                question2Str = 'once a month';
                break;
        }

        let question3Str = "";
        switch (req.body.lifestyle.question3) {
            case 'month':
                question3Str = 'once a month';
                break;
            case 'quarter':
                question3Str = 'once a quarter';
                break;
            case 'year':
                question3Str = 'once a year';
                break;
        }


        let question4Str = "";
        if (req.body.lifestyle.question4.airPollution) {
            question4Str += 'air pollution,'
        }
        if (req.body.lifestyle.question4.waterPollution) {
            question4Str += 'lack of clean drinking water,'
        }
        if (req.body.lifestyle.question4.toxins) {
            question4Str += 'exposure to toxins,'
        }


        let question5Str = "";
        if (req.body.lifestyle.question5.trauma) {
            question5Str += 'historical trauma,'
        }
        if (req.body.lifestyle.question5.finances) {
            question5Str += 'financial issue,'
        }
        if (req.body.lifestyle.question5.other) {
            question5Str += 'other reasons,'
        }

        if (question5Str == "") {
            question5Str = "happy,"
        }


        const formattedLifestyle: LifeStyleResult = {
            question1: question1Str.slice(0, question1Str.length - 1),
            question2: question2Str,
            question3: question3Str,
            question4: question4Str.slice(0, question4Str.length - 1),
            question5: question5Str.slice(0, question5Str.length - 1)
        }

        await poolQuery.createLifestyleResult(formattedLifestyle, ID as number);
        const surveyResult = calculateRisk(formattedLifestyle);
        res.status(200).json(surveyResult);
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json("Server Error");
    }
})


export default router;
